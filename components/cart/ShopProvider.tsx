"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { getProductById } from "@/lib/products";
import type { CartItem, CartLine } from "@/types";

/**
 * Estado da loja no navegador: carrinho, favoritos e painéis abertos.
 * Persistência em localStorage. Quando houver login e backend, esta é a
 * única peça que precisa passar a sincronizar com o servidor.
 */

const CART_KEY = "energy-power:cart:v1";
const FAVORITES_KEY = "energy-power:favorites:v1";
const MAX_QUANTITY = 99;

interface Toast {
  id: number;
  message: string;
}

interface ShopContextValue {
  /** `false` até o localStorage ser lido (evita piscar contadores). */
  ready: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  total: number;
  addItem: (productId: string, quantity?: number, options?: { silent?: boolean }) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  toast: Toast | null;
  dismissToast: () => void;
}

const ShopContext = createContext<ShopContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Navegação privada ou armazenamento cheio: segue sem persistir.
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = read<CartItem[]>(CART_KEY, []);
    // Descarta itens que saíram do catálogo.
    setItems(Array.isArray(stored) ? stored.filter((i) => getProductById(i.productId) && i.quantity > 0) : []);
    const storedFavorites = read<string[]>(FAVORITES_KEY, []);
    setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(CART_KEY, items);
  }, [items, ready]);

  useEffect(() => {
    if (ready) write(FAVORITES_KEY, favorites);
  }, [favorites, ready]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const addItem = useCallback<ShopContextValue["addItem"]>(
    (productId, quantity = 1, options) => {
      const product = getProductById(productId);
      if (!product) return;
      setItems((current) => {
        const existing = current.find((i) => i.productId === productId);
        if (existing) {
          return current.map((i) =>
            i.productId === productId ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) } : i,
          );
        }
        return [...current, { productId, quantity: Math.min(MAX_QUANTITY, quantity) }];
      });
      if (!options?.silent) showToast(`${product.name} adicionado ao carrinho`);
    },
    [showToast],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.productId !== productId)
        : current.map((i) => (i.productId === productId ? { ...i, quantity: Math.min(MAX_QUANTITY, quantity) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  }, []);

  const value = useMemo<ShopContextValue>(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = getProductById(item.productId);
      return product ? [{ product, quantity: item.quantity, lineTotal: product.price * item.quantity }] : [];
    });
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    return {
      ready,
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal,
      // Frete e cupons entram aqui quando houver checkout online.
      total: subtotal,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      toast,
      dismissToast,
    };
  }, [ready, items, favorites, cartOpen, searchOpen, toast, addItem, removeItem, setQuantity, clearCart, toggleFavorite, dismissToast]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop precisa estar dentro de <ShopProvider>");
  return context;
}
