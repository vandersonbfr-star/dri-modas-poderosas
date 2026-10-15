import { ArrowLeft, MessageCircle, Ruler, ShieldCheck, ShoppingBag, Truck, RotateCcw, Mail, ChevronDown, CircleHelp } from 'lucide-react';
import { whatsappLink } from '../utils/format.js';

const wa = (message) => whatsappLink(message);
const faqs = [
  { category: 'Produtos e tamanhos', icon: Ruler, items: [
    ['Como escolho o tamanho ideal?', 'Consulte a tabela de medidas assim que os valores oficiais estiverem disponíveis. Até lá, fale com o atendimento antes de concluir a compra. A modelagem pode variar de um produto para outro.'],
    ['As cores das fotos são exatamente iguais às peças?', 'As imagens desta versão são ilustrativas e podem não corresponder aos produtos reais. Antes da publicação, a loja deve inserir fotos oficiais e confirmar as cores disponíveis.'],
    ['Como sei quais cores e tamanhos estão disponíveis?', 'As opções exibidas são as cadastradas no catálogo demonstrativo. A disponibilidade real precisa ser confirmada pela loja.']
  ]},
  { category: 'Como comprar', icon: ShoppingBag, items: [
    ['Como faço para comprar?', 'Nesta versão, você pode explorar os produtos e montar uma sacola demonstrativa. O checkout ainda não está conectado a uma plataforma de pedidos e pagamentos. Entre em contato pelo WhatsApp para tirar dúvidas.'],
    ['Meu pedido é confirmado ao clicar em finalizar?', 'Não. A página de finalização ainda não registra pedidos nem processa pagamentos. A confirmação deve ocorrer somente por um canal oficial da loja após a integração do processo de compra.']
  ]},
  { category: 'Pagamento, entrega e frete', icon: Truck, items: [
    ['Quais formas de pagamento são aceitas?', 'As formas de pagamento oficiais ainda precisam ser confirmadas. Consulte o atendimento antes de realizar qualquer pagamento.'],
    ['Qual é o prazo e o valor do frete?', 'Prazos, modalidades e valores de entrega ainda não estão configurados nesta versão. O frete real deve ser informado antes da confirmação da compra.'],
    ['Como acompanho meu pedido?', 'O acompanhamento de pedidos ainda não está integrado ao site. Se já realizou uma compra por um canal oficial, entre em contato com a loja para receber orientação.']
  ]},
  { category: 'Trocas, devoluções e atendimento', icon: RotateCcw, items: [
    ['Como solicito uma troca ou devolução?', 'A política oficial ainda está em revisão. Entre em contato pelo WhatsApp para orientação sobre sua situação. A página de trocas deve ser consultada novamente quando as condições oficiais forem publicadas.'],
    ['Como falo com a equipe?', 'Use o botão de WhatsApp nesta página ou acesse a página Contato. Endereço físico, horário de atendimento e e-mail não foram informados nesta versão.']
  ]}
];

const policySections = {
  trocas: [
    ['Status do documento', 'Esta é uma estrutura provisória. Não constitui a política oficial de trocas e devoluções e deve ser revisada e aprovada pela responsável pela loja antes de ser publicada.'],
    ['Como solicitar atendimento', 'Entre em contato pelo WhatsApp comercial e explique que deseja orientação sobre uma troca ou devolução. O atendimento informará os próximos passos após a aprovação das condições oficiais.'],
    ['Informações para localizar a compra', 'A equipe poderá solicitar os dados estritamente necessários para localizar a compra, conforme o canal e o procedimento oficial. Evite enviar dados pessoais desnecessários na primeira mensagem.'],
    ['Condições e prazos', 'Prazos, elegibilidade, condições do produto, custos de envio e eventuais exceções precisam ser definidos pela loja e revisados conforme as regras aplicáveis. Nenhum prazo ou custo está confirmado nesta página.'],
    ['Etapas e acompanhamento', 'Após receber orientação do atendimento, siga as instruções oficiais e guarde as mensagens de protocolo, quando houver. O processo e o prazo de resposta ainda precisam ser formalizados.']
  ],
  privacidade: [
    ['Status e responsável pelo tratamento', 'Documento provisório. Antes da publicação, preencher a identificação legal da empresa responsável e os canais oficiais para solicitações de privacidade. Não há CNPJ, razão social ou endereço confirmado no projeto atual.'],
    ['Dados tratados nesta versão demonstrativa', 'O site mantém carrinho e favoritos no armazenamento local do navegador (localStorage). A tela de finalização contém campos de formulário, mas não envia nem armazena os dados pessoais digitados. Não há cadastro de conta implementado nesta versão.'],
    ['Finalidades', 'O armazenamento local permite manter a seleção de produtos e favoritos durante a navegação. Outras finalidades, como gestão de pedidos, pagamentos, entrega, suporte, prevenção a fraude ou marketing, deverão ser descritas somente quando os serviços correspondentes forem efetivamente implantados.'],
    ['Compartilhamento e serviços externos', 'O botão de WhatsApp abre um serviço externo e, quando utilizado, a pessoa passa a interagir com o WhatsApp. As imagens ilustrativas são carregadas de URLs externas do Unsplash. O checkout e os serviços de pagamento ainda não estão integrados. Revise essas integrações antes da publicação.'],
    ['Armazenamento, segurança e cookies', 'Carrinho e favoritos ficam no armazenamento local do navegador e podem ser removidos ao limpar os dados do site. Esta versão não possui inventário confirmado de cookies, analytics ou pixels de publicidade. Não se declara aqui uma certificação ou medida técnica de segurança específica.'],
    ['Direitos e solicitações', 'Adicione um canal oficial para solicitações de acesso, correção, exclusão e demais direitos aplicáveis. Até que o canal responsável seja formalizado, a página Contato disponibiliza o WhatsApp comercial para orientação inicial.'],
    ['Revisão antes de publicar', 'A versão final deve refletir o funcionamento real do site e ser revisada por pessoa qualificada, incluindo os serviços de terceiros e os procedimentos efetivamente utilizados.']
  ],
  termos: [
    ['Identificação da loja', 'PREENCHER: razão social ou nome empresarial aplicável, CNPJ quando existente, endereço e canal oficial de atendimento. Esses dados não foram fornecidos no projeto.'],
    ['Navegação e uso do site', 'O site é uma versão demonstrativa destinada à apresentação de catálogo e recursos de navegação. Não utilize informações demonstrativas como confirmação de disponibilidade, pedido ou pagamento.'],
    ['Produtos, imagens e preços', 'Os nomes, preços, descrições e imagens atuais são demonstrativos. Antes da publicação comercial, a loja deve revisar cada cadastro e substituir o conteúdo ilustrativo por informações e imagens corretas.'],
    ['Disponibilidade e estoque', 'Não existe integração com estoque real nesta versão. A disponibilidade precisa ser confirmada pela operação da loja antes de qualquer confirmação comercial.'],
    ['Processo de compra e pagamentos', 'O carrinho e a tela de finalização são interfaces preparatórias. Não há criação de pedido, cobrança ou confirmação de pagamento. A publicação comercial depende da integração com um checkout seguro e da definição dos procedimentos aplicáveis.'],
    ['Responsabilidades e atendimento', 'Os canais de suporte, procedimentos de reclamação e condições comerciais precisam ser definidos e confirmados pela responsável pela loja. O WhatsApp disponível serve para contato, mas não confirma automaticamente pedidos.'],
    ['Propriedade intelectual', 'PREENCHER/REVISAR: confirmar os direitos de uso do nome, logotipo, fotografias, textos e demais materiais exibidos no site antes da publicação. As imagens atuais são ilustrativas e externas.'],
    ['Atualizações e vigência', 'PREENCHER: data de vigência, responsável pela aprovação e procedimento para comunicar alterações. Este documento provisório não deve ser tratado como termo final aprovado.']
  ]
};

function PageIntro({ eyebrow, title, children }) {
  return <header className="institutional-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children && <p className="institutional-lead">{children}</p>}</header>;
}
function WhatsAppButton({ message = 'Olá! Gostaria de tirar uma dúvida sobre a Dri Modas Poderosas.' }) {
  return <a className="btn btn-dark" href={wa(message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Falar pelo WhatsApp</a>;
}
function FAQPage() {
  return <div className="institutional-body faq-groups">{faqs.map(group => { const Icon = group.icon; return <section className="faq-group" key={group.category}><h2><Icon size={19}/>{group.category}</h2><div className="faq-list">{group.items.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<ChevronDown size={18}/></summary><p>{answer}</p></details>)}</div></section>; })}<div className="institutional-cta"><p>Ainda ficou com dúvida?</p><WhatsAppButton message="Olá! Tenho uma dúvida sobre a Dri Modas Poderosas."/></div></div>;
}
function SizeGuide() {
  return <div className="institutional-body"><div className="provisional-banner"><Ruler size={20}/><div><strong>Tabela oficial ainda não fornecida</strong><p>Os campos abaixo são uma estrutura para preenchimento. Não use como referência de tamanho até que as medidas reais sejam confirmadas pela loja.</p></div></div><div className="measure-table-wrap"><table className="measure-table"><caption>Medidas corporais em centímetros — preencher com valores confirmados</caption><thead><tr><th scope="col">Tamanho</th><th scope="col">Busto (cm)</th><th scope="col">Cintura (cm)</th><th scope="col">Quadril (cm)</th></tr></thead><tbody>{['PP','P','M','G','GG','XG'].map(size => <tr key={size}><th scope="row">{size}</th><td><span className="pending-value">A preencher</span></td><td><span className="pending-value">A preencher</span></td><td><span className="pending-value">A preencher</span></td></tr>)}</tbody></table></div><section className="measure-instructions"><h2>Como tirar suas medidas</h2><ol><li><strong>Busto:</strong> passe a fita métrica ao redor da parte mais ampla do busto, mantendo-a nivelada e sem apertar.</li><li><strong>Cintura:</strong> meça a região natural da cintura, sem comprimir o corpo.</li><li><strong>Quadril:</strong> passe a fita pela parte mais ampla do quadril e do bumbum, mantendo-a nivelada.</li></ol><p>Compare suas medidas com a tabela oficial do produto. As instruções de modelagem e os tamanhos podem variar entre peças; consulte a descrição individual quando houver orientação específica.</p><WhatsAppButton message="Olá! Gostaria de ajuda para escolher o tamanho de um produto."/></section></div>;
}
function PolicyPage({ page }) {
  const data = page === 'trocas' ? { eyebrow: 'DOCUMENTO EM REVISÃO', title: 'Trocas e devoluções', intro: 'Informações organizadas para facilitar o atendimento. As condições oficiais ainda precisam ser preenchidas e aprovadas.' } : page === 'privacidade' ? { eyebrow: 'DOCUMENTO EM REVISÃO', title: 'Política de privacidade', intro: 'Esta página descreve apenas o funcionamento conhecido desta versão demonstrativa e aponta os dados que ainda precisam ser definidos.' } : { eyebrow: 'DOCUMENTO EM REVISÃO', title: 'Termos de uso', intro: 'Estrutura de referência para revisão. Os termos não estão aprovados nem devem ser considerados vigentes.' };
  return <div className="institutional-body policy-body"><div className="provisional-banner"><ShieldCheck size={20}/><div><strong>Conteúdo provisório — não publicar como documento definitivo</strong><p>A responsável pela loja deve preencher os campos pendentes e revisar o texto antes de colocá-lo em vigor.</p></div></div><p className="institutional-lead">{data.intro}</p>{policySections[page].map(([title, body]) => <section className="policy-section" key={title}><h2>{title}</h2><p>{body}</p></section>)}<div className="institutional-cta"><p>Precisa de orientação?</p><WhatsAppButton message={`Olá! Preciso de orientação sobre ${data.title.toLowerCase()}.`}/></div></div>;
}
function ContactPage() {
  return <div className="institutional-body"><div className="contact-card"><span className="contact-icon"><MessageCircle size={25}/></span><div><h2>Atendimento pelo WhatsApp</h2><p>Fale conosco para dúvidas sobre produtos, tamanhos, disponibilidade ou orientação sobre a sacola demonstrativa.</p><WhatsAppButton message="Olá! Vim pelo site da Dri Modas Poderosas e gostaria de tirar uma dúvida."/></div></div><div className="contact-note"><h2>Antes de entrar em contato</h2><p>Para facilitar a conversa, você pode informar o nome do produto sobre o qual tem dúvida. Evite compartilhar dados pessoais desnecessários.</p><p>O contato pelo WhatsApp não representa confirmação automática de pedido ou pagamento. E-mail, endereço físico e horários de atendimento não foram confirmados e, por isso, não são publicados aqui.</p></div></div>;
}
function AboutPage() {
  return <div className="institutional-body about-editorial"><div className="about-statement"><img className="about-brand-logo" src="/images/logo-dri-modas-poderosas.png" alt="Dri Modas Poderosas — Moda Feminina"/><p>Moda fitness para mulheres em movimento.</p></div><section><h2>Vista sua força. Revele seu poder.</h2><p>A Dri Modas Poderosas é uma proposta de moda fitness feminina que valoriza a expressão individual, a confiança e a liberdade de se movimentar do seu jeito.</p><p>Mais do que compor um look, vestir-se pode ser uma forma de reconhecer a própria personalidade. Nossa intenção é reunir estilo e praticidade em uma experiência de compra acolhedora, com informações claras para ajudar cada mulher a escolher com mais segurança.</p><p>Esta apresentação é atemporal e não atribui à marca uma história, números ou certificações que ainda não foram confirmados.</p></section><div className="institutional-cta"><p>Descubra a coleção.</p><a className="btn btn-dark" href="/colecao">Explorar produtos</a></div></div>;
}

export default function InfoPage({ page, navigate }) {
  const titles = { sobre:'Sobre a Dri Modas Poderosas', contato:'Contato', faq:'Perguntas frequentes', medidas:'Tabela de medidas', trocas:'Trocas e devoluções', privacidade:'Política de privacidade', termos:'Termos de uso' };
  return <main className={`page-section info-page institutional-page institutional-${page}`}><button className="back-link" onClick={() => navigate('catalogo')}><ArrowLeft size={16}/> Voltar à coleção</button><article className="info-content institutional-content">{page === 'sobre' ? <><PageIntro eyebrow="NOSSA ESSÊNCIA" title={titles[page]}>Uma proposta de moda fitness feminina que celebra força, confiança, estilo e liberdade para ser quem se é.</PageIntro><AboutPage/></> : page === 'contato' ? <><PageIntro eyebrow="ESTAMOS AQUI" title={titles[page]}>Canais de atendimento e orientação para sua experiência na loja.</PageIntro><ContactPage/></> : page === 'faq' ? <><PageIntro eyebrow="PODEMOS AJUDAR?" title={titles[page]}>Respostas diretas às dúvidas mais comuns. Informações comerciais pendentes são identificadas com transparência.</PageIntro><FAQPage/></> : page === 'medidas' ? <><PageIntro eyebrow="ESCOLHA COM MAIS SEGURANÇA" title={titles[page]}>Consulte as orientações abaixo e confirme as medidas oficiais antes de escolher o tamanho.</PageIntro><SizeGuide/></> : <><PageIntro eyebrow={page === 'trocas' ? 'DOCUMENTO EM REVISÃO' : 'INFORMAÇÕES DA LOJA'} title={titles[page]}/><PolicyPage page={page}/></>}</article></main>;
}
