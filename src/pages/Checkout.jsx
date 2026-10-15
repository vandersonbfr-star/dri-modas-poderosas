import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, LockKeyhole, MessageCircle, ShoppingBag } from 'lucide-react';
import { money, whatsappLink } from '../utils/format.js';

const digits = value => value.replace(/\D/g, '');
const formatPhone = value => {
  const d = digits(value).slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0,2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0,2)}) ${d.slice(2,6)}-${d.slice(6)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};
const formatCep = value => { const d=digits(value).slice(0,8); return d.length>5?`${d.slice(0,5)}-${d.slice(5)}`:d; };
const cents = value => Math.round((Number(value) + Number.EPSILON) * 100);

export default function Checkout({ cart, products, navigate }) {
  const [form,setForm]=useState({name:'',email:'',phone:'',cep:'',street:'',number:'',complement:'',neighborhood:'',city:'',state:''});
  const [errors,setErrors]=useState({});
  const [status,setStatus]=useState('');
  const items=useMemo(()=>cart.map(item=>({...item,product:products.find(p=>p.id===item.id)})).filter(i=>i.product),[cart,products]);
  const subtotalCents=items.reduce((sum,item)=>sum+cents(item.product.price)*item.quantity,0);
  const subtotal=subtotalCents/100;
  const orderMessage=`Olá! Gostaria de solicitar atendimento sobre os itens da minha sacola na Dri Modas Poderosas:\n\n${items.map(i=>`• ${i.product.name} — Tam. ${i.size} — Cor: ${i.color||'não selecionada'} — Quantidade: ${i.quantity}`).join('\n')}\n\nSubtotal demonstrativo: ${money(subtotal)}\n\nEntendo que esta mensagem solicita atendimento e não confirma pedido, estoque ou pagamento.`;
  const update=(field,value)=>{setForm(prev=>({...prev,[field]:value}));setErrors(prev=>({...prev,[field]:''}));setStatus('');};
  const validate=()=>{
    const e={};
    if(form.name.trim().length<3)e.name='Informe seu nome completo.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))e.email='Informe um e-mail válido.';
    if(![10,11].includes(digits(form.phone).length))e.phone='Informe um telefone com DDD.';
    if(digits(form.cep).length!==8)e.cep='Informe um CEP com 8 números.';
    if(form.street.trim().length<3)e.street='Informe a rua ou avenida.';
    if(!form.number.trim())e.number='Informe o número ou “s/n”.';
    if(form.neighborhood.trim().length<2)e.neighborhood='Informe o bairro.';
    if(form.city.trim().length<2)e.city='Informe a cidade.';
    if(!/^[A-Za-zÀ-ÿ]{2}$/.test(form.state.trim()))e.state='Informe a sigla do estado (UF).';
    setErrors(e);return Object.keys(e).length===0;
  };
  const submit=e=>{e.preventDefault();if(!items.length){setStatus('Sua sacola está vazia. Volte à coleção para escolher produtos.');return;}if(!validate()){setStatus('Revise os campos destacados antes de continuar.');return;}setStatus('Os dados foram validados apenas nesta tela. O checkout online ainda não está conectado; nenhum pedido foi criado e nenhum dado foi enviado ou armazenado. Use o atendimento por WhatsApp se desejar continuar.');};
  if(!items.length)return <main className="page-section checkout-page"><div className="empty-state"><ShoppingBag size={38}/><h1>Sua sacola está vazia</h1><p>Adicione produtos antes de iniciar a finalização.</p><button className="btn btn-dark" onClick={()=>navigate('catalogo')}>Voltar à coleção</button></div></main>;
  const field=(name,label,props={})=><div className="checkout-field" key={name}><label htmlFor={`checkout-${name}`}>{label}{['complement'].includes(name)?' (opcional)':' *'}</label><input id={`checkout-${name}`} name={name} type={props.type||'text'} value={form[name]} onChange={e=>update(name,props.format?props.format(e.target.value):e.target.value)} autoComplete={props.autoComplete} inputMode={props.inputMode} maxLength={props.maxLength} aria-invalid={!!errors[name]} aria-describedby={errors[name]?`error-${name}`:undefined} required={name!=='complement'}/>{errors[name]&&<small id={`error-${name}`} className="field-error" role="alert">{errors[name]}</small>}</div>;
  return <main className="page-section checkout-page">
    <button className="back-link" type="button" onClick={()=>navigate('carrinho')}><ArrowLeft size={16}/> Voltar ao carrinho</button>
    <div className="page-heading"><p className="eyebrow">SEUS DADOS E SUA SELEÇÃO</p><h1>Finalizar compra</h1><p>Preencha os dados para preparar o atendimento. Esta etapa ainda não envia nem conclui um pedido.</p></div>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={submit} noValidate>
      <section className="checkout-card"><h2>Dados de contato</h2><p className="checkout-section-note">Os dados ficam apenas nesta tela e não são salvos no navegador.</p><div className="checkout-fields">{field('name','Nome completo',{autoComplete:'name'})}{field('email','E-mail',{autoComplete:'email',inputMode:'email',type:'email'})}{field('phone','Telefone com DDD',{autoComplete:'tel',inputMode:'tel',type:'tel',format:formatPhone,maxLength:16})}</div></section>
      <section className="checkout-card"><h2>Endereço de entrega</h2><div className="checkout-fields">{field('cep','CEP',{autoComplete:'postal-code',inputMode:'numeric',format:formatCep,maxLength:9})}{field('street','Rua ou avenida',{autoComplete:'address-line1'})}{field('number','Número',{autoComplete:'off'})}{field('complement','Complemento',{autoComplete:'address-line2'})}{field('neighborhood','Bairro',{autoComplete:'address-level3'})}{field('city','Cidade',{autoComplete:'address-level2'})}{field('state','Estado (UF)',{autoComplete:'address-level1',maxLength:2})}</div></section>
      {status&&<p className={`checkout-status ${status.startsWith('Os dados')?'info':'error'}`} role="status">{status}</p>}
      <button className="btn btn-dark full-btn" type="submit"><LockKeyhole size={17}/> Validar dados para continuar</button>
      <p className="checkout-disclaimer">Nenhum pagamento será processado. Não existe confirmação de pedido nesta versão.</p>
    </form>
    <aside className="order-summary checkout-summary"><h2>Resumo da sacola</h2><div className="checkout-order-items">{items.map(item=><div className="checkout-order-item" key={`${item.id}-${item.size}-${item.color}`}><img src={item.product.images?.[0]} alt=""/><div><strong>{item.product.name}</strong><span>Cor: {item.color||'Não selecionada'} · Tam.: {item.size} · Qtd.: {item.quantity}</span></div><b>{money(cents(item.product.price)*item.quantity/100)}</b></div>)}</div><div className="summary-line"><span>Subtotal demonstrativo</span><strong>{money(subtotal)}</strong></div><div className="summary-line"><span>Frete</span><strong>Calculado na próxima etapa</strong></div><div className="summary-line total-line"><span>Total estimado</span><strong>{money(subtotal)}</strong></div><p className="summary-disclaimer">Cupons ainda não estão integrados. O total não inclui frete, impostos ou eventuais condições comerciais.</p><a className="btn btn-outline full-btn" href={whatsappLink(orderMessage)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Solicitar atendimento pelo WhatsApp</a><p className="summary-disclaimer">O WhatsApp é uma alternativa de atendimento; não confirma pedido, estoque ou pagamento.</p></aside></div>
  </main>;
}
