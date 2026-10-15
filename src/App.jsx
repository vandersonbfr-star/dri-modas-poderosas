import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import ProductCard from './components/ProductCard.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Product from './pages/Product.jsx';
import CartView from './components/CartView.jsx';
import Checkout from './pages/Checkout.jsx';
import InfoPage from './pages/InfoPage.jsx';
import { getProducts } from './services/catalog.js';
import { whatsappLink } from './utils/format.js';

const readStorage=(key,fallback)=>{try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback;}catch{return fallback;}};
const normalizeCart=(value)=>Array.isArray(value)?value.filter(i=>i&&typeof i.id==='string'&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=10&&typeof i.size==='string'&&typeof i.color==='string').map(i=>({id:i.id,size:i.size,color:i.color,quantity:i.quantity})):[];
const normalizeFavorites=(value)=>Array.isArray(value)?[...new Set(value.filter(x=>typeof x==='string'))]:[];
const paths={home:'/',catalogo:'/colecao',carrinho:'/carrinho',finalizar:'/finalizar-compra',favoritos:'/favoritos',sobre:'/sobre',contato:'/contato',faq:'/faq',medidas:'/tabela-de-medidas',trocas:'/trocas-e-devolucoes',privacidade:'/privacidade',termos:'/termos-de-uso'};
function RoutedApp(){
 const [products,setProducts]=useState([]),[productsLoaded,setProductsLoaded]=useState(false),[cart,setCart]=useState(()=>normalizeCart(readStorage('dmp-cart',[]))),[favorites,setFavorites]=useState(()=>normalizeFavorites(readStorage('dmp-favorites',[]))),[catalogSearch,setCatalogSearch]=useState('');
 const routerNavigate=useNavigate(),location=useLocation();
 useEffect(()=>{getProducts().then(setProducts).finally(()=>setProductsLoaded(true));},[]);
 useEffect(()=>{try{localStorage.setItem('dmp-cart',JSON.stringify(cart));}catch{}},[cart]);
 useEffect(()=>{if(productsLoaded){const validIds=new Set(products.map(p=>p.id));setCart(prev=>prev.filter(item=>validIds.has(item.id)));}},[productsLoaded,products]);
 useEffect(()=>{try{localStorage.setItem('dmp-favorites',JSON.stringify(favorites));}catch{}},[favorites]);
 useEffect(()=>{if(productsLoaded){const validIds=new Set(products.map(p=>p.id));setFavorites(prev=>prev.filter(id=>validIds.has(id)));}},[productsLoaded,products]);
 useEffect(()=>{window.scrollTo({top:0,behavior:'smooth'});},[location.pathname]);
 const navigate=(page,category='')=>{const path=paths[page]||'/';routerNavigate(category?`${path}?categoria=${encodeURIComponent(category)}`:path);};
 const openProduct=(slug)=>routerNavigate(`/produto/${slug}`,{state:{from:location.pathname+location.search}});
 const slug=location.pathname.startsWith('/produto/')?decodeURIComponent(location.pathname.slice('/produto/'.length).split('/')[0]):'';
 const product=useMemo(()=>products.find(p=>p.slug===slug),[products,slug]);
 const cartCount=cart.reduce((sum,i)=>sum+i.quantity,0);
 const toggleFavorite=(id)=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
 const addToCart=(item)=>{if(!item||typeof item.id!=='string'||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>10||!item.size||typeof item.color!=='string')throw new Error('Seleção de produto inválida.');setCart(prev=>{const existing=prev.find(i=>i.id===item.id&&i.size===item.size&&i.color===item.color);return existing?prev.map(i=>i===existing?{...i,quantity:Math.min(10,i.quantity+item.quantity)}:i):[...prev,{id:item.id,size:item.size,color:item.color,quantity:item.quantity}];});};
 const updateQuantity=(id,size,color,quantity)=>setCart(prev=>quantity<1?prev.filter(i=>!(i.id===id&&i.size===size&&i.color===color)):prev.map(i=>i.id===id&&i.size===size&&i.color===color?{...i,quantity:Math.max(1,Math.min(10,Math.floor(quantity)))}:i));
 const removeItem=(id,size,color)=>setCart(prev=>prev.filter(i=>!(i.id===id&&i.size===size&&i.color===color)));
 const handleSearch=(term)=>setCatalogSearch(term);
 const page=location.pathname==='/'?'home':location.pathname.startsWith('/produto/')?'produto':location.pathname==='/colecao'?'catalogo':(location.pathname==='/sacola'||location.pathname==='/carrinho')?'carrinho':location.pathname==='/finalizar-compra'?'finalizar':location.pathname==='/favoritos'?'favoritos':location.pathname==='/sobre'?'sobre':location.pathname==='/contato'?'contato':(location.pathname==='/faq'||location.pathname==='/perguntas-frequentes')?'faq':location.pathname==='/tabela-de-medidas'?'medidas':location.pathname==='/trocas-e-devolucoes'?'trocas':location.pathname==='/privacidade'?'privacidade':(location.pathname==='/termos-de-uso'||location.pathname==='/termos')?'termos':'notfound';
 useEffect(()=>{const institutionalTitles={sobre:'Sobre a marca',contato:'Contato',faq:'Perguntas frequentes',medidas:'Tabela de medidas',trocas:'Trocas e devoluções',privacidade:'Política de privacidade',termos:'Termos de uso'};const title=page==='produto'&&product?`${product.name} | Dri Modas Poderosas`:institutionalTitles[page]?`${institutionalTitles[page]} | Dri Modas Poderosas`:page==='carrinho'?'Carrinho | Dri Modas Poderosas':page==='finalizar'?'Finalizar compra | Dri Modas Poderosas':page==='catalogo'?'Coleção fitness feminina | Dri Modas Poderosas':'Dri Modas Poderosas | Moda fitness feminina';document.title=title;let meta=document.querySelector('meta[name="description"]');if(!meta){meta=document.createElement('meta');meta.name='description';document.head.appendChild(meta);}const descriptions={sobre:'Conheça a proposta de moda fitness feminina da Dri Modas Poderosas.',contato:'Entre em contato com a Dri Modas Poderosas pelo WhatsApp comercial.',faq:'Respostas a dúvidas sobre produtos, tamanhos, compras, entregas e atendimento.',medidas:'Guia provisório de medidas. Confirme os valores oficiais antes de escolher o tamanho.',trocas:'Informações provisórias sobre trocas e devoluções, pendentes de aprovação oficial.',privacidade:'Informações provisórias sobre dados e privacidade desta versão demonstrativa.',termos:'Estrutura provisória dos termos de uso da Dri Modas Poderosas.'};meta.content=page==='produto'&&product?product.description:descriptions[page]||(page==='carrinho'?'Revise os itens, quantidades e subtotal da sua sacola.':page==='finalizar'?'Preencha seus dados para preparar o atendimento. O checkout ainda não está conectado.':'Descubra a coleção demonstrativa de moda fitness feminina da Dri Modas Poderosas.');},[page,product]);
 let view;
 if(page==='home') view=<Home products={products} navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} openProduct={openProduct}/>;
 else if(page==='catalogo') view=<Catalog products={products} navigate={navigate} favorites={favorites} toggleFavorite={toggleFavorite} openProduct={openProduct} onSearch={handleSearch} initialCategory={new URLSearchParams(location.search).get('categoria')||''} initialSearch={catalogSearch}/>;
 else if(page==='produto') view=!productsLoaded?<main className="page-section not-found" aria-live="polite"><p>Carregando produto…</p></main>:product?<Product key={product.id} product={product} products={products} favorites={favorites} navigate={navigate} addToCart={addToCart} favorite={favorites.includes(product.id)} toggleFavorite={toggleFavorite} openProduct={openProduct} backTo={location.state?.from||'/colecao'}/>:<main className="page-section not-found"><p className="eyebrow">CATÁLOGO</p><h1>Produto não encontrado</h1><p>Este produto não está disponível no catálogo atual.</p><button className="btn btn-dark" onClick={()=>navigate('catalogo')}>Voltar à coleção</button></main>;
 else if(page==='carrinho') view=<CartView cart={cart} products={products} updateQuantity={updateQuantity} removeItem={removeItem} navigate={navigate}/>;
 else if(page==='finalizar') view=<Checkout cart={cart} products={products} navigate={navigate}/>;
 else if(page==='favoritos'){const saved=products.filter(p=>favorites.includes(p.id));view=<main className="page-section favorites-page"><div className="page-heading"><p className="eyebrow">SUA CURADORIA</p><h1>Favoritos</h1><p>As peças que você guardou para depois.</p></div>{!productsLoaded?<p className="loading-state" aria-live="polite">Carregando seus favoritos…</p>:saved.length?<><p className="results-count" aria-live="polite">{saved.length} {saved.length===1?'produto salvo':'produtos salvos'}</p><div className="product-grid">{saved.map(p=><ProductCard key={p.id} product={p} favorite={true} toggleFavorite={toggleFavorite} openProduct={openProduct}/>)}</div></>:<div className="empty-state"><span className="empty-heart">♡</span><h2>Seus favoritos aparecem aqui</h2><p>Guarde as peças que chamarem sua atenção.</p><button className="btn btn-dark" onClick={()=>navigate('catalogo')}>Voltar ao catálogo</button></div>}</main>; }
 else if(page==='notfound') view=<main className="page-section not-found"><h1>Página não encontrada</h1><button className="btn btn-dark" onClick={()=>navigate('home')}>Voltar ao início</button></main>;
 else view=<InfoPage page={page} navigate={navigate}/>;
 return <><div className="announcement">MODA FITNESS PARA MULHERES EM MOVIMENTO <span>—</span> DRI MODAS PODEROSAS</div><Header page={page} navigate={navigate} cartCount={cartCount} favoritesCount={favorites.filter(id=>products.some(p=>p.id===id)).length} onSearch={handleSearch} products={products} openProduct={openProduct}/>{view}<Footer navigate={navigate}/><a className="whatsapp-float" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Fale com a Dri Modas Poderosas pelo WhatsApp"><MessageCircle size={24}/><span>Fale conosco</span></a></>;
}
export default function App(){return <BrowserRouter><Routes><Route path="*" element={<RoutedApp/>}/></Routes></BrowserRouter>;}
