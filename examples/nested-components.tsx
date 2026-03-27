/**
 * Nested Components Example
 *
 * Demonstrates composing components together with shared data.
 * Run with: deno run --allow-read examples/nested-components.tsx
 *
 * @module
 */

import { Fragment, jsx } from "@ggpwnkthx/jsx";

const write = (s: string) =>
  Deno.stdout.writeSync(new Uint8Array([...s].map((c) => c.charCodeAt(0))));

const print = (label: string, data: unknown) => {
  write(`${label}\n${Deno.inspect(data, { colors: false, depth: Infinity })}\n`);
};

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

function PriceTag({ price }: { price: number }) {
  return jsx("span", { className: "price", children: [`$${price.toFixed(2)}`] }, null);
}

function CategoryBadge({ category }: { category: string }) {
  return jsx("span", {
    className: `badge-${category.toLowerCase()}`,
    children: [category],
  }, null);
}

function ProductCard({ product }: { product: Product }) {
  return jsx(
    "article",
    {
      className: "product-card",
      "data-id": product.id,
      children: [
        jsx("h3", { key: "name", children: [product.name] }, null),
        jsx(Fragment, {
          key: "meta",
          children: [
            jsx(CategoryBadge, { category: product.category }, null),
            jsx(PriceTag, { price: product.price }, null),
          ],
        }, null),
      ],
    },
    null,
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const categories = [...new Set(products.map((p) => p.category))];

  return jsx(
    "main",
    {
      children: [
        jsx("h1", { key: "title", children: ["Products"] }, null),
        jsx(Fragment, {
          key: "by-category",
          children: categories.map((cat) => {
            const catProducts = products.filter((p) => p.category === cat);
            return jsx(
              "section",
              {
                key: cat,
                className: "category-section",
                children: [
                  jsx("h2", { key: "cat-title", children: [cat] }, null),
                  jsx(
                    "div",
                    {
                      key: "grid",
                      className: "product-grid",
                      children: catProducts.map((p) =>
                        jsx(ProductCard, { product: p, key: p.id }, null)
                      ),
                    },
                    null,
                  ),
                ],
              },
              null,
            );
          }),
        }, null),
      ],
    },
    null,
  );
}

const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99, category: "Electronics" },
  { id: "2", name: "Mouse", price: 49.99, category: "Electronics" },
  { id: "3", name: "Desk", price: 299.99, category: "Furniture" },
  { id: "4", name: "Chair", price: 199.99, category: "Furniture" },
  { id: "5", name: "Headphones", price: 149.99, category: "Electronics" },
];

const vnode = jsx(ProductGrid, { products }, null);
print("Nested Components VNode:", vnode);
