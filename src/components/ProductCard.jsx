import { Heart, ArrowUpRight } from 'lucide-react';
import { money } from '../utils/format.js';
export default function ProductCard({ product, favorite, toggleFavorite, openProduct }) {
  return <article className="product-card">
    <div className="product-image-wrap">
      <button className="product-image-button" onClick={() => openProduct(product.slug)} aria-label={`Ver ${product.name}`}><img src={product.images[0]} alt={`${product.name} — imagem demonstrativa`} loading="lazy"/></button>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`favorite-btn ${favorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}><Heart fill={favorite ? 'currentColor' : 'none'}/></button>
      <button className="quick-view" onClick={() => openProduct(product.slug)}>Ver produto <ArrowUpRight size={15}/></button>
    </div>
    <div className="product-info"><span className="product-category">{product.category}</span><button className="product-title" onClick={() => openProduct(product.slug)}>{product.name}</button><strong>{money(product.price)}</strong><span className="demo-note">Preço demonstrativo</span></div>
  </article>;
}