import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export default function ProductGallery({ product, images, colorName }) {
 const availableImages=(Array.isArray(images)&&images.length?images:product.images||[]).filter(Boolean);
 const [active,setActive]=useState(0),[zoomOpen,setZoomOpen]=useState(false),[failed,setFailed]=useState({});
 useEffect(()=>{setActive(0);setFailed({});},[product.id,colorName,availableImages.join('|')]);
 const current=availableImages[active]||availableImages[0];
 const move=(direction)=>setActive(index=>(index+direction+availableImages.length)%availableImages.length);
 useEffect(()=>{if(!zoomOpen)return;const onKey=(event)=>{if(event.key==='Escape')setZoomOpen(false);if(event.key==='ArrowRight'&&availableImages.length>1)move(1);if(event.key==='ArrowLeft'&&availableImages.length>1)move(-1);};window.addEventListener('keydown',onKey);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow='';};},[zoomOpen,availableImages.length]);
 return <div className="product-gallery">
  <div className="product-main-image">
   {current&&!failed[active]?<img src={current} alt={`${product.name}${colorName?` na cor ${colorName}`:''} — imagem ilustrativa ${active+1}`} onError={()=>setFailed(prev=>({...prev,[active]:true}))}/>:<div className="gallery-image-fallback" role="img" aria-label={`Imagem indisponível de ${product.name}`}><span>Imagem indisponível</span></div>}
   {product.tag&&<span className="product-tag">{product.tag}</span>}
   {availableImages.length>1&&<><button className="gallery-arrow gallery-prev" aria-label="Imagem anterior" onClick={()=>move(-1)}><ChevronLeft/></button><button className="gallery-arrow gallery-next" aria-label="Próxima imagem" onClick={()=>move(1)}><ChevronRight/></button></>}
   <button className="gallery-zoom" onClick={()=>setZoomOpen(true)} aria-label="Ampliar imagem do produto"><ZoomIn size={17}/><span>Ampliar</span></button>
  </div>
  {availableImages.length>1&&<div className="gallery-thumbs" aria-label="Miniaturas do produto">{availableImages.map((img,i)=><button key={`${img}-${i}`} type="button" className={i===active?'selected':''} onClick={()=>setActive(i)} aria-label={`Ver imagem ${i+1} de ${product.name}`} aria-pressed={i===active}><img src={img} alt="" loading="lazy" onError={e=>{e.currentTarget.style.visibility='hidden';}}/></button>)}</div>}
  {zoomOpen&&<div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`Visualização ampliada: ${product.name}`} onMouseDown={e=>{if(e.target===e.currentTarget)setZoomOpen(false);}}><button className="gallery-modal-close" onClick={()=>setZoomOpen(false)} aria-label="Fechar visualização ampliada"><X/></button>{current&&!failed[active]?<img src={current} alt={`${product.name} — visualização ampliada`}/>:<div className="gallery-image-fallback">Imagem indisponível</div>}{availableImages.length>1&&<><button className="gallery-arrow gallery-modal-prev" onClick={()=>move(-1)} aria-label="Imagem anterior"><ChevronLeft/></button><button className="gallery-arrow gallery-modal-next" onClick={()=>move(1)} aria-label="Próxima imagem"><ChevronRight/></button></>}</div>}
 </div>;
}
