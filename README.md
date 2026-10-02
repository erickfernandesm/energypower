# Energy Power Suplementos

Site da Energy Power Suplementos (Juiz de Fora - MG): vitrine, catálogo com filtros, carrinho e pedido pelo WhatsApp.

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 e Lucide.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # serve o build
npm run lint
```

No deploy, defina `NEXT_PUBLIC_SITE_URL` com o domínio final (veja `.env.example`). Ele alimenta canonical, sitemap e Open Graph.

## Onde editar cada coisa

| O que | Arquivo |
| --- | --- |
| Endereço, telefone, WhatsApp, Instagram, horário, mapa | `lib/site.ts` |
| Produtos e preços | `data/products.ts` |
| Categorias e objetivos | `data/categories.ts` |
| Marcas | `data/brands.ts` |
| Textos do hero, diferenciais e "Sobre" | `data/content.ts` |
| Cores e tipografia | `app/globals.css` (`@theme`) |
| Mensagens do WhatsApp | `lib/whatsapp.ts` |

## Pendências antes de publicar

Procure por `TODO(loja)` no código. Em resumo:

1. **Catálogo real.** Os produtos e preços em `data/products.ts` são demonstrativos. Depois de trocar, mude `catalogIsDemo` para `false` em `lib/site.ts`: o aviso do topo some e os preços passam a ser publicados no schema.org.
2. **Fotos dos produtos.** Coloque em `public/images/produtos` e preencha `images` em cada produto. Sem foto, o site usa a ilustração da categoria.
3. **Horário de funcionamento.** Preencha `hours` em `lib/site.ts`. Enquanto estiver vazio, o site convida a consultar pelo WhatsApp.
4. **Logo em alta resolução.** A atual (`public/images/logo.jpg`) tem 150x150 px. Um SVG ou PNG de 512 px ou mais deixa a seção "Sobre" e o ícone mais nítidos.
5. **Texto "Sobre" e diferenciais.** Revisar em `data/content.ts`.
6. **Páginas institucionais.** Privacidade, termos e trocas são modelos e precisam de revisão.

## Estrutura

```
app/                 rotas, SEO (sitemap, robots, Open Graph)
components/
  layout/            Header, Footer, WhatsAppFloat, Logo
  sections/          seções da home
  products/          ProductCard, ProductGrid, Catalog, ProductFilters...
  cart/              ShopProvider (estado), CartDrawer, CartView
  search/            SearchDialog
  ui/                Button, Dialog, Reveal, QuantityStepper...
data/                produtos, categorias, marcas, textos
lib/                 configuração da loja, repositório de produtos, checkout, SEO
types/               tipos compartilhados
```

## Evolução para e-commerce completo

- **Produtos:** os componentes só usam as funções de `lib/products.ts`. Para ligar um banco ou API, troque a implementação ali.
- **Checkout:** `lib/checkout.ts` define a interface `CheckoutProvider`. Hoje o provedor ativo é o WhatsApp. Um provedor de Mercado Pago, Stripe ou Pix entra no mesmo formato, sem mexer no carrinho.
- **Carrinho:** o estado vive em `components/cart/ShopProvider.tsx` (localStorage). Com login, é o único ponto que passa a sincronizar com o servidor. Frete e cupons entram no cálculo de `total`.
