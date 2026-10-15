import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, ArrowLeft, Ruler, MessageCircle, CheckCircle2 } from 'lucide-react';
import { money, whatsappLink } from '../utils/format.js';
import ProductCard from '../components/ProductCard.jsx';
import ProductGallery from '../components/ProductGallery.jsx';

export default function Product({product,products,favorites=[],navigate,addToCart,favorite,toggleFavorite,openProduct,backTo='/colecao'}) {
 const routerNavigate=useNavigate();
 const [size,setSize]=useState(''),[color,setColor]=useState(product.colors?.[0]?.name||''),[qty,setQty]=useState(1),[notice,setNotice]=useState(''),[noticeType,setNoticeType]=useState(''),[buyAreaVisible,setBuyAreaVisible]=useState(true);
 const buyAreaRef=useRef(null);
 const selectedColor=product.colors?.find(c=>c.name===color);
 const galleryImages=selectedColor?.images?.length?selectedColor.images:product.images;
 const sizeRequired=product.sizeRequired!==false&&(product.sizes?.length||0)>0;
 const related=useMemo(()=>{if(product.relatedIds?.length)return product.relatedIds.map(id=>products.find(p=>p.id===id)).filter(Boolean).filter(p=>p.id!==product.id).slice(0,4);return products.filter(p=>p.id!==product.id&&p.category===product.category).slice(0,4);},[product,products]);
 useEffect(()=>{setSize('');setColor(product.colors?.[0]?.name||'');setQty(1);setNotice('');setNoticeType('');},[product.id]);
 useEffect(()=>{const target=buyAreaRef.current;if(!target||typeof IntersectionObserver==='undefined')return;const observer=new IntersectionObserver(([entry])=>setBuyAreaVisible(entry.isIntersecting),{threshold:0.05});observer.observe(target);return()=>observer.disconnect();},[product.id]);
 const add=(buyNow=false)=>{
  if(sizeRequired&&!size){setNotice('Selecione um tamanho para continuar.');setNoticeType('error');return;}
  if(!Number.isInteger(qty)||qty<1||qty>10){setNotice('Escolha uma quantidade entre 1 e 10.');setNoticeType('error');return;}
  try{addToCart({id:product.id,size:size||'Único',color,quantity:qty});setNotice(`${product.name} foi adicionado à sacola.`);setNoticeType('success');if(buyNow)navigate('carrinho');}catch{setNotice('Não foi possível adicionar agora. Tente novamente.');setNoticeType('error');}
 };
 const back=()=>{if(backTo.startsWith('/'))routerNavigate(backTo);else navigate('catalogo');};
 return <main className="page-section product-page">
  <nav className="product-breadcrumb" aria-label="Caminho de navegação"><button onClick={()=>navigate('home')}>Início</button><span>/</span><button onClick={()=>navigate('catalogo',product.category)}>{product.category}</button><span>/</span><span aria-current="page">{product.name}</span></nav>
  <button className="back-link" onClick={back}><ArrowLeft size={16}/> Voltar à coleção</button>
  <div className="product-detail">
   <ProductGallery product={product} images={galleryImages} colorName={color}/>
   <section className="product-detail-info" aria-labelledby="product-title">
    <p className="eyebrow">{product.category}</p><h1 id="product-title">{product.name}</h1>
    <div className="detail-price-row"><div className="detail-price">{money(product.price)}</div>{Number.isFinite(product.compareAtPrice)&&product.compareAtPrice>product.price&&<><del className="old-price">{money(product.compareAtPrice)}</del><span className="discount-note">{Math.round((1-product.price/product.compareAtPrice)*100)}% OFF</span></>}</div>
    <p className="demo-note">Preço demonstrativo · confirme valores e disponibilidade com a loja</p>
    <p className="detail-description">{product.description}</p>
    {product.details?.length>0&&<ul className="product-detail-list">{product.details.map((detail,i)=><li key={i}>{detail}</li>)}</ul>}
    {product.colors?.length>0&&<fieldset className="option-field"><legend>Cor: <strong>{color||'Selecione'}</strong></legend><div className="color-options">{product.colors.map(c=><button type="button" key={c.name} className={`color-swatch ${color===c.name?'selected':''}`} style={{'--swatch':c.hex||'#ddd'}} aria-label={`Selecionar cor ${c.name}`} aria-pressed={color===c.name} title={c.name} onClick={()=>{setColor(c.name);setNotice('');}}><span/></button>)}</div></fieldset>}
    {product.sizes?.length>0&&<fieldset className="option-field"><legend>Tamanho: <strong>{size||'Selecione'}</strong>{sizeRequired&&<span className="required-mark"> *</span>}</legend><div className="size-options">{product.sizes.map(s=><button type="button" key={s} className={size===s?'selected':''} aria-pressed={size===s} onClick={()=>{setSize(s);setNotice('');}}>{s}</button>)}</div></fieldset>}
    <button className="size-guide" onClick={()=>navigate('medidas')}><Ruler size={16}/> Consultar tabela de medidas</button>
    <div className="quantity-row"><label htmlFor="product-quantity">Quantidade</label><div className="quantity-control"><button type="button" aria-label="Diminuir quantidade" disabled={qty<=1} onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={14}/></button><output id="product-quantity" aria-live="polite">{qty}</output><button type="button" aria-label="Aumentar quantidade" disabled={qty>=10} onClick={()=>setQty(Math.min(10,qty+1))}><Plus size={14}/></button></div><span className="quantity-limit">Máximo de 10 unidades por seleção</span></div>
    {notice&&<p className={`form-notice ${noticeType}`} role="status">{noticeType==='success'&&<CheckCircle2 size={16}/>} {notice}</p>}
    <div className="product-buy-actions" ref={buyAreaRef}><button className="btn btn-dark full-btn" onClick={()=>add(false)}><ShoppingBag size={17}/> Adicionar à sacola</button><button className="btn btn-outline full-btn" onClick={()=>add(true)}>Comprar agora</button></div>
    <button type="button" className={`detail-favorite ${favorite?'is-favorite':''}`} aria-pressed={favorite} onClick={()=>toggleFavorite(product.id)}><Heart size={17} fill={favorite?'currentColor':'none'}/>{favorite?'Remover dos favoritos':'Adicionar aos favoritos'}</button>
    <div className="product-support"><MessageCircle size={17}/><div><strong>Precisa de ajuda?</strong><a href={whatsappLink(`Olá! Gostaria de tirar uma dúvida sobre o produto ${product.name}.`)} target="_blank" rel="noreferrer">Fale com a equipe pelo WhatsApp</a><small>Atendimento: +55 21 98347-0644</small></div></div>
   </section>
  </div>
  {!buyAreaVisible&&<div className="mobile-buy-bar"><div><span>{product.name}</span><strong>{money(product.price)}</strong></div><button className="btn btn-dark" onClick={()=>add(false)}><ShoppingBag size={17}/> Adicionar</button></div>}
  <section className="product-description-section"><p className="eyebrow">DETALHES DA PEÇA</p><h2>Sobre o produto</h2><p>{product.description}</p>{product.details?.length>0&&<ul>{product.details.map((detail,i)=><li key={i}>{detail}</li>)}</ul>}<p className="product-data-note">As informações desta página são demonstrativas enquanto o catálogo oficial não for confirmado.</p></section>
  {related.length>0&&<section className="related-section"><div className="section-heading"><div><p className="eyebrow">VOCÊ TAMBÉM PODE GOSTAR</p><h2>Mais da coleção {product.category.toLowerCase()}</h2></div></div><div className="product-grid">{related.map(p=><ProductCard key={p.id} product={p} favorite={favorites.includes(p.id)} toggleFavorite={toggleFavorite} openProduct={openProduct}/>)}</div></section>}
 </main>;
}
