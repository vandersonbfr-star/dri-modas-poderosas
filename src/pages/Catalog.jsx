import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import { filterProducts, searchProducts, sortProducts } from '../utils/search.js';

export default function Catalog({ products, navigate, favorites, toggleFavorite, openProduct, onSearch = () => {}, initialCategory = '', initialSearch = '' }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialSearch);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { setCategory(initialCategory); }, [initialCategory]);
  useEffect(() => { setQuery(initialSearch); }, [initialSearch]);

  const categories = useMemo(() => [...new Set(products.map(p => p.category).filter(Boolean))], [products]);
  const sizes = useMemo(() => [...new Set(products.flatMap(p => p.sizes || []))], [products]);
  const colors = useMemo(() => [...new Set(products.flatMap(p => (p.colors || []).map(c => c.name).filter(Boolean)))].sort((a,b)=>a.localeCompare(b,'pt-BR')), [products]);
  const prices = products.map(p => p.price).filter(p => Number.isFinite(p));
  const absoluteMin = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const absoluteMax = prices.length ? Math.ceil(Math.max(...prices)) : 0;
  const activeFilters = Boolean(category || size || color || minPrice !== '' || maxPrice !== '');
  const filtered = useMemo(() => {
    const searched = searchProducts(products, query);
    const faceted = filterProducts(searched, { category, size, color, minPrice, maxPrice });
    return sortProducts(faceted, sort);
  }, [products, query, category, size, color, minPrice, maxPrice, sort]);

  const clearFilters = () => {
    setCategory(''); setSize(''); setColor(''); setMinPrice(''); setMaxPrice(''); setQuery(''); setSort('featured');
    onSearch(''); navigate('catalogo');
  };
  const setCategoryFilter = value => {
    setCategory(value);
    navigate('catalogo', value);
  };

  return <main className="page-section catalog-page">
    <div className="page-heading"><p className="eyebrow">A COLEÇÃO</p><h1>Encontre seu movimento</h1><p>Moda fitness feminina para acompanhar o seu ritmo.</p></div>
    <div className="catalog-toolbar">
      <div className="filter-pills" aria-label="Filtrar por categoria"><SlidersHorizontal size={16}/><button className={!category?'active':''} onClick={()=>setCategoryFilter('')}>Todas</button>{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategoryFilter(c)}>{c}</button>)}</div>
      <div className="catalog-controls">
        <label className="catalog-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar nome, categoria, cor…" aria-label="Buscar por nome, categoria, descrição, cor ou tamanho"/>{query&&<button type="button" className="clear-search" aria-label="Limpar pesquisa" onClick={()=>setQuery('')}><X size={15}/></button>}</label>
        <button className={`filter-toggle ${activeFilters?'has-filters':''}`} type="button" aria-expanded={filtersOpen} onClick={()=>setFiltersOpen(v=>!v)}><SlidersHorizontal size={16}/> Filtros</button>
        <label className="sort-select"><span className="sr-only">Ordenar produtos</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Ordem padrão</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name-asc">Nome A–Z</option><option value="name-desc">Nome Z–A</option>{products.every(p=>p.createdAt&&Number.isFinite(Date.parse(p.createdAt)))&&<option value="newest">Mais recentes</option>}</select></label>
      </div>
    </div>
    {filtersOpen&&<div className="catalog-filter-panel" aria-label="Filtros do catálogo">
      <div className="filter-panel-heading"><h2>Refinar coleção</h2><button type="button" className="icon-btn filter-close" aria-label="Fechar filtros" onClick={()=>setFiltersOpen(false)}><X size={18}/></button></div>
      <div className="filter-fields">
        <label>Categoria<select value={category} onChange={e=>setCategoryFilter(e.target.value)}><option value="">Todas as categorias</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
        <label>Tamanho<select value={size} onChange={e=>setSize(e.target.value)}><option value="">Todos os tamanhos</option>{sizes.map(s=><option key={s} value={s}>{s}</option>)}</select></label>
        <label>Cor<select value={color} onChange={e=>setColor(e.target.value)}><option value="">Todas as cores</option>{colors.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
        <fieldset className="price-filter"><legend>Faixa de preço</legend><div><label>De (R$)<input inputMode="decimal" type="number" min={absoluteMin} max={absoluteMax} step="0.01" placeholder={String(absoluteMin)} value={minPrice} onChange={e=>setMinPrice(e.target.value)}/></label><label>Até (R$)<input inputMode="decimal" type="number" min={absoluteMin} max={absoluteMax} step="0.01" placeholder={String(absoluteMax)} value={maxPrice} onChange={e=>setMaxPrice(e.target.value)}/></label></div>{minPrice!==''&&maxPrice!==''&&Number(minPrice)>Number(maxPrice)&&<small className="filter-error" role="alert">O valor mínimo não pode ser maior que o máximo.</small>}</fieldset>
      </div>
      <div className="filter-panel-actions"><button className="btn btn-outline" type="button" onClick={clearFilters}><RotateCcw size={15}/> Limpar filtros e busca</button><button className="btn btn-dark" type="button" onClick={()=>setFiltersOpen(false)}>Ver {filtered.length} {filtered.length===1?'produto':'produtos'}</button></div>
    </div>}
    <div className="results-meta"><p className="results-count" aria-live="polite">{filtered.length} {filtered.length===1?'produto encontrado':'produtos encontrados'} <span>· catálogo demonstrativo</span></p>{(query||activeFilters)&&<button type="button" className="clear-all-link" onClick={clearFilters}>Limpar busca e filtros</button>}</div>
    {filtered.length ? <div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p} favorite={favorites.includes(p.id)} toggleFavorite={toggleFavorite} openProduct={openProduct}/>)}</div> : <div className="empty-state"><Search size={34}/><h2>{query?'Não encontramos esse produto':'Nenhum produto corresponde aos filtros'}</h2><p>{query?'Experimente outra palavra ou confira a escrita.':'Ajuste a categoria, tamanho, cor ou faixa de preço para ver mais opções.'}</p><button className="btn btn-dark" onClick={clearFilters}>Limpar busca e filtros</button></div>}
  </main>;
}
