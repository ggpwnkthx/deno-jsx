/**
 * Nested Components Example
 *
 * Demonstrates composing components together with shared data.
 * Run with: deno run --allow-read examples/nested-components.tsx
 *
 * @module
 */

import { jsx } from "@ggpwnkthx/jsx";
import { print } from "./shared.ts";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

function PriceTag({ price }: { price: number }) {
  return <span className="price">${price.toFixed(2)}</span>;
}

function CategoryBadge({ category }: { category: string }) {
  return <span className={`badge-${category.toLowerCase()}`}>{category}</span>;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card" data-id={product.id}>
      <h3>{product.name}</h3>
      <CategoryBadge category={product.category} />
      <PriceTag price={product.price} />
    </article>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main>
      <h1>Products</h1>
      {categories.map((cat) => {
        const catProducts = products.filter((p) => p.category === cat);
        return (
          <section key={cat} className="category-section">
            <h2>{cat}</h2>
            <div className="product-grid">
              {catProducts.map((p) => jsx(ProductCard, { product: p }, p.id))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99, category: "Electronics" },
  { id: "2", name: "Mouse", price: 49.99, category: "Electronics" },
  { id: "3", name: "Desk", price: 299.99, category: "Furniture" },
  { id: "4", name: "Chair", price: 199.99, category: "Furniture" },
  { id: "5", name: "Headphones", price: 149.99, category: "Electronics" },
];

const vnode = <ProductGrid products={products} />;
print("Nested Components VNode:", vnode);
