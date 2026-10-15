import { MessageCircle, Instagram } from 'lucide-react';
import { whatsappLink } from '../utils/format.js';

// Configure os perfis reais da marca quando os endereços oficiais estiverem disponíveis.
const socialLinks = { instagram: '', facebook: '' };
export default function Footer({ navigate }) {
  const link = (label, page) => <button key={label} onClick={() => navigate(page)}>{label}</button>;
  return <footer className="footer"><div className="footer-main">
    <div className="footer-brand"><img className="footer-brand-logo" src="/images/logo-dri-modas-poderosas.png" alt="Dri Modas Poderosas — Moda Feminina"/><p>Vista sua força. Revele seu poder.</p><a className="social-link" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Atendimento via WhatsApp</a></div>
    <div><h3>Explorar</h3>{link('Todos os produtos','catalogo')}{link('Favoritos','favoritos')}{link('Sobre a marca','sobre')}</div>
    <div><h3>Atendimento</h3>{link('Contato','contato')}{link('Perguntas frequentes','faq')}{link('Tabela de medidas','medidas')}<a href={whatsappLink()} target="_blank" rel="noreferrer">WhatsApp comercial</a></div>
    <div><h3>Informações</h3>{link('Trocas e devoluções','trocas')}{link('Privacidade','privacidade')}{link('Termos de uso','termos')}<div className="footer-socials">{socialLinks.instagram ? <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram oficial"><Instagram size={17}/></a> : null}{socialLinks.facebook ? <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook oficial"><MessageCircle size={17}/></a> : null}{!socialLinks.instagram && !socialLinks.facebook ? <span className="social-placeholder">Redes sociais oficiais: endereço a configurar</span> : null}</div></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dri Modas Poderosas.</span><span>Prévia de desenvolvimento — informações demonstrativas.</span></div></footer>;
}
