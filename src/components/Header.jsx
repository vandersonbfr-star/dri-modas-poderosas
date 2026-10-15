import { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { searchProducts } from '../utils/search.js';

export default function Header({ page, navigate, cartCount, favoritesCount, onSearch, products = [], openProduct }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState('');
  const go = (target, category = '') => { navigate(target, category); setMobileOpen(false); setSearchOpen(false); };
  const submit = (e) => { e.preventDefault(); onSearch(term); go('catalogo'); };
  const suggestions = term.trim() ? searchProducts(products, term).slice(0, 5) : [];
  const chooseProduct = (product) => { setSearchOpen(false); setMobileOpen(false); setTerm(''); openProduct?.(product.slug); };
  return <header className="site-header">
    <div className="header-inner">
      <button className="icon-btn mobile-menu" aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>
      <button className="brand" onClick={() => go('home')} aria-label="Dri Modas Poderosas — início">
        <img className="brand-logo" src="/images/logo-dri-modas-poderosas.png" alt="" aria-hidden="true" />
      </button>
      <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Menu principal">
        <button onClick={() => go('catalogo')}>Novidades</button><button onClick={() => go('catalogo','Leggings')}>Leggings</button><button onClick={() => go('catalogo','Tops')}>Tops</button><button onClick={() => go('catalogo','Conjuntos')}>Conjuntos</button><button onClick={() => go('sobre')}>A marca</button>
      </nav>
      <div className="header-actions">
        <button className="icon-btn" aria-label="Buscar produtos" onClick={() => setSearchOpen(!searchOpen)}><Search/></button>
        <button className="icon-btn action-with-count" aria-label={`Favoritos, ${favoritesCount} itens`} onClick={() => go('favoritos')}><Heart/><span>{favoritesCount}</span></button>
        <button className="icon-btn action-with-count" aria-label={`Carrinho, ${cartCount} itens`} onClick={() => go('carrinho')}><ShoppingBag/><span>{cartCount}</span></button>
      </div>
    </div>
    {searchOpen && <div className="header-search-wrap"><form className="search-bar" onSubmit={submit}><label className="sr-only" htmlFor="header-search">Buscar produtos</label><input id="header-search" autoFocus placeholder="O que você procura?" value={term} onChange={e=>setTerm(e.target.value)} /><button className="btn btn-dark" type="submit">Ver resultados</button><button className="icon-btn search-clear" type="button" aria-label="Limpar pesquisa" onClick={()=>setTerm('')}><X size={17}/></button></form>{term.trim()&&<div className="header-search-results" role="listbox" aria-label="Sugestões de produtos">{suggestions.length?suggestions.map(p=><button type="button" role="option" key={p.id} onClick={()=>chooseProduct(p)}><img src={p.images?.[0]} alt=""/><span><strong>{p.name}</strong><small>{p.category}</small></span><ArrowUpRight size={16}/></button>):<p>Nenhum produto encontrado. <button type="button" onClick={submit}>Ver todos os resultados</button></p>}</div>}</div>}
  </header>;
}