import { products } from '../data/products.js';

// Ponto único de acesso aos dados. Substitua esta implementação por Shopify Storefront API
// ou por um backend próprio quando a integração for iniciada.
export async function getProducts() { return products; }
export async function getProductBySlug(slug) { return products.find((p) => p.slug === slug) ?? null; }
export async function getProductById(id) { return products.find((p) => p.id === id) ?? null; }
