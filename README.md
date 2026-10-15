# Dri Modas Poderosas — loja demonstrativa

Loja virtual em React + Vite, JavaScript e CSS responsivo. O catálogo está isolado em `src/data/products.js` e a camada de dados em `src/services/catalog.js`, facilitando a futura conexão com Shopify.

## Requisitos
- Node.js 20 ou superior (recomendado)
- npm

## Executar localmente
```bash
npm install
npm run dev
```
Abra o endereço local exibido pelo Vite no terminal.

## Gerar versão de produção
```bash
npm run build
npm run preview
```
Os arquivos de produção serão gerados em `dist/`.

## Arquivos principais
- `src/App.jsx`: navegação e estado global da loja.
- `src/components/`: cabeçalho, rodapé, cards e carrinho.
- `src/pages/`: Home, catálogo, produto, favoritos e páginas institucionais.
- `src/data/products.js`: oito produtos de demonstração.
- `src/services/catalog.js`: camada de acesso aos produtos, preparada para ser substituída por uma implementação Shopify.
- `src/styles.css`: identidade visual e responsividade.
- `public/images/`: pasta reservada para imagens locais da marca.

## Logo oficial
O arquivo original está incluído em `public/images/logo-dri-modas-poderosas.png`. O projeto usa essa imagem nos componentes de marca configurados, preservando o arquivo original e suas proporções.

## Dados demonstrativos que devem ser substituídos
- Os oito produtos, nomes, descrições, preços, cores, tamanhos, slugs e imagens são fictícios/demonstrativos.
- As imagens atuais são referências remotas do Unsplash e precisam ser trocadas por fotos autorizadas e definitivas da loja antes da publicação.
- O conteúdo institucional e os textos de políticas são provisórios e devem ser revisados juridicamente/comercialmente.
- O guia de medidas é genérico e deve ser substituído pela tabela real da marca.
- Não há estoque real, cálculo de frete, avaliações, descontos, pedidos ou pagamento integrado.
- Os preços demonstrativos não representam oferta comercial.

## O que funciona nesta versão
- Home com hero editorial, categorias, destaques, novidades e chamada de WhatsApp.
- Catálogo com filtro por categoria, busca por nome/categoria/cor e ordenação.
- Página de produto com galeria, seleção de tamanho/cor, quantidade e validação de variante.
- Carrinho persistido em `localStorage`, edição de quantidade, remoção e subtotal.
- Favoritos persistidos no navegador.
- Botões de atendimento via WhatsApp e mensagem com resumo do carrinho.
- Páginas institucionais provisórias e layout responsivo.

## O que depende de integração
- Checkout e pagamento reais.
- Sincronização de produtos, variantes, estoque, preços, imagens e pedidos com Shopify.
- Cálculo de frete, cupons, impostos, analytics e consentimento de cookies.
- Política de privacidade, trocas, devoluções e termos definitivos.
- O botão “Finalizar pelo WhatsApp” apenas abre uma conversa com o resumo do carrinho; não conclui pagamento.

## Integração Shopify futura
Mantenha a interface consumindo `getProducts()` e `getProductBySlug()` em `src/services/catalog.js`. A futura integração pode trocar a implementação interna por Storefront API ou por um backend seguro. Não coloque tokens privados no front-end.

## Refinamento visual — Prompt 02
- Hero atualizado com o título “Vista a sua força. Revele o seu poder.”, texto solicitado e dois CTAs funcionais para o catálogo.
- Seção editorial atualizada para “O poder de se sentir incrível.” e texto institucional provisório, sem alegações não confirmadas.
- Rodapé reorganizado em Explorar, Atendimento e Informações; os perfis sociais ficam vazios até serem configurados com URLs oficiais.
- Ajustes de tipografia, espaçamento, transições leves, estados de foco, cartões de categoria/produto e responsividade em telas estreitas.
- Movimento reduzido respeitado via `prefers-reduced-motion`.
- URLs das imagens continuam centralizadas em `src/data/products.js`; as fotografias são ilustrativas e não representam necessariamente os produtos reais.

## Validação desta revisão
O ambiente possui Node.js, mas `npm install` excedeu o tempo disponível. Por isso, não foi possível executar `npm run build` nesta sessão. Execute localmente `npm install` e `npm run build` para validar a compilação antes de publicar.


## Página individual do produto — Prompt 03

- Rotas com React Router, incluindo `/produto/:slug` e acesso direto por URL.
- `ProductGallery` reutilizável com miniaturas, imagem ampliada em modal, navegação por setas e tratamento de imagem indisponível.
- Seleção de cor/tamanho, quantidade, validação antes de adicionar, sacola persistente, favoritos e produtos relacionados da mesma categoria.
- Barra de compra fixa no mobile quando os botões originais deixam a área visível.
- Rota `/tabela-de-medidas` com conteúdo provisório claramente identificado.
- Título e meta description atualizados para a página do produto.

**Importante:** o catálogo e os preços ainda são demonstrativos. As imagens existentes são ilustrativas; confirme os dados e substitua por fotos oficiais antes de publicar. A integração de checkout/Shopify não foi criada nesta etapa.

**Validação desta entrega:** a sintaxe JSX/JavaScript foi verificada com o parser do TypeScript e os dados do catálogo são validados separadamente. O build do Vite não pôde ser executado porque `npm install` excedeu o tempo limite neste ambiente. Não foi feita validação visual em navegador.


## Carrinho e fluxo de finalização — Prompt 04

- Rota principal do carrinho: `/carrinho` (o endereço antigo `/sacola` continua reconhecido).
- Rota `/finalizar-compra` com formulário de contato/endereço, validação de campos, máscara básica de telefone e CEP e resumo da sacola.
- Quantidades e itens podem ser editados no carrinho; remover um item apresenta confirmação integrada. Subtotais são calculados em centavos para reduzir erros de arredondamento.
- Adições com o mesmo produto, cor e tamanho são agrupadas; variantes diferentes permanecem separadas. O contador do cabeçalho reflete a soma das quantidades.
- Carrinho e favoritos usam `localStorage` com leitura protegida e normalização de dados inválidos. Os dados pessoais preenchidos na tela de finalização não são armazenados nem enviados pelo formulário.
- O resumo oferece uma mensagem contextual para atendimento via WhatsApp `+55 21 98347-0644`. Essa mensagem contém apenas itens, variantes e quantidades; ela não confirma pedido nem pagamento.
- O campo de cupom é informativo: não há validação ou aplicação de cupons. O frete é mostrado como “Calculado na próxima etapa”; o total é apenas estimado e não inclui frete.
- O formulário não cria pedidos, não processa pagamentos e não simula confirmação. É necessário integrar Shopify ou outro checkout seguro antes de vender online.

### Como testar o fluxo

1. Execute `npm install` e `npm run dev`.
2. Abra um produto em `/produto/:slug`, selecione tamanho quando aplicável e adicione à sacola.
3. Adicione novamente a mesma variante para verificar o agrupamento; selecione outra cor/tamanho para verificar uma linha separada.
4. Abra `/carrinho`, aumente/diminua quantidades, confirme remoção de um item e confira os subtotais.
5. Recarregue a página e confirme que a sacola continua presente e que o contador do cabeçalho acompanha a quantidade total.
6. Avance para `/finalizar-compra`, teste campos vazios, e-mail, telefone e CEP inválidos e a mensagem de validação.
7. Confira o resumo e teste o link de WhatsApp. Não haverá pedido real nem cobrança.
8. Execute `npm run build` para verificar a compilação de produção.

**Limitação de validação:** o build e os testes em navegador dependem da instalação das dependências, que pode não estar disponível neste ambiente. Os preços e produtos continuam demonstrativos; não publique a loja sem substituir os dados e integrar estoque, frete, pedidos e pagamento.

## Busca, filtros, ordenação e favoritos — Prompt 05

- A busca é compartilhada entre o cabeçalho e o catálogo, procura nome, categoria, descrição, cores, tamanhos e características textuais cadastradas, sem diferenciar maiúsculas/minúsculas ou acentos.
- O cabeçalho apresenta até cinco sugestões correspondentes enquanto a pessoa digita; selecionar uma sugestão abre a página daquele produto. A ação “Ver resultados” leva ao catálogo com a pesquisa aplicada.
- O catálogo combina busca com categoria, tamanho, cor e faixa de preço. As opções de categorias, tamanhos e cores são derivadas dos produtos cadastrados; não há filtro de estoque porque o catálogo demonstrativo não tem dados reais de estoque.
- A ordenação inclui ordem padrão, menor preço, maior preço e nome crescente/decrescente. “Mais recentes” só aparece quando todos os produtos têm uma data `createdAt` válida.
- Os filtros adicionais ficam em um painel expansível, utilizável em telas pequenas, com botão para limpar busca e filtros e contador de resultados.
- A página `/favoritos` reutiliza `ProductCard`, permitindo abrir um produto ou remover o favorito. Favoritos continuam no `localStorage`, sincronizados com o cabeçalho e com as páginas de produto e catálogo. IDs antigos que não existam no catálogo são descartados depois que os dados carregam.
- A lógica reutilizável de busca, filtragem e ordenação está em `src/utils/search.js`.

### Como testar o Prompt 05

1. No catálogo, pesquise por `legging`, `LILÁS` ou parte de uma descrição; a busca ignora acentos e maiúsculas/minúsculas.
2. Digite um termo inexistente e confira o estado vazio de pesquisa. Use “Limpar busca e filtros”.
3. Abra “Filtros”, combine categoria, tamanho, cor e limites de preço; confira a contagem e o estado vazio específico de filtros.
4. Ordene por menor preço, maior preço e nome A–Z/Z–A. Os produtos originais não são alterados.
5. Favorite um produto no cartão e na página individual; confira o contador e abra `/favoritos`. Remova o favorito e atualize o navegador para confirmar a persistência.
6. Adicione um produto à sacola e favorite/remova outro para confirmar que essas ações não alteram o carrinho.
7. No celular, teste o painel de filtros, a busca do cabeçalho e os controles em larguras de 320 a 768 px.

### Validação desta revisão

A tentativa de `npm install --no-audit --no-fund` excedeu o limite de tempo deste ambiente; portanto, não foi possível executar `npm run build` nem testes de navegador nesta sessão. O projeto não inclui `node_modules` no ZIP. Execute `npm install` e `npm run build` localmente antes da publicação. Os dados de produtos e preços seguem demonstrativos.

## Páginas institucionais — Prompt 06

Rotas institucionais principais:
- `/sobre` — apresentação editorial atemporal da proposta da marca, sem história, números ou certificações não confirmados.
- `/contato` — atendimento pelo WhatsApp comercial `+55 21 98347-0644`. Não há formulário que finja enviar mensagens; e-mail, endereço e horário não foram informados.
- `/faq` — perguntas frequentes organizadas em categorias com acordeões nativos acessíveis. A rota antiga `/perguntas-frequentes` continua aceita.
- `/tabela-de-medidas` — estrutura responsiva de busto, cintura e quadril, sem medidas inventadas; os valores estão marcados como pendentes.
- `/trocas-e-devolucoes` — estrutura provisória aguardando política oficial revisada e aprovada.
- `/privacidade` — descrição das práticas visíveis nesta versão, incluindo `localStorage`, link externo do WhatsApp e imagens externas; precisa ser revisada após integrar serviços.
- `/termos-de-uso` — estrutura de termos com campos pendentes; a rota antiga `/termos` continua aceita.

### Informações que a responsável precisa preencher antes de publicar

1. Tabela oficial de medidas em centímetros por tamanho e, se necessário, por modelagem/produto.
2. Política oficial de trocas e devoluções: prazos, condições, custos, procedimento e acompanhamento, revisados conforme a operação e as regras aplicáveis.
3. Política de privacidade final: identificação legal da empresa/controlador, canal para solicitações, serviços externos efetivamente usados, cookies/analytics/pixels e prazos de retenção, se aplicáveis.
4. Termos finais: identificação da loja, condições comerciais, estoque, pagamento, entrega, responsabilidades, direitos de uso de materiais e data de vigência.
5. E-mail, endereço, horários de atendimento e perfis sociais oficiais, somente se existirem e forem confirmados.
6. Dados reais, descrições, preços e fotografias oficiais dos produtos demonstrativos.

### Como testar

1. Execute `npm install` e `npm run dev`.
2. Abra diretamente cada uma das sete rotas acima e confirme o título, o conteúdo e o retorno à coleção.
3. No rodapé, teste todos os links institucionais; teste também os aliases `/perguntas-frequentes` e `/termos`.
4. Abra cada acordeão do FAQ por teclado e clique; teste o botão do WhatsApp e confirme que ele abre o canal comercial.
5. Na tabela de medidas, confira que a tabela pode rolar horizontalmente em telas estreitas e que não há medidas numéricas fictícias.
6. Revise os avisos das páginas de políticas: nenhuma delas deve parecer documento final aprovado.
7. Repita os testes em larguras de 320, 375, 768, 1024 e 1440 px.
8. Execute `npm run build` em um ambiente com dependências instaladas.

### Validação desta revisão

Os links de rotas e a estrutura dos componentes foram revisados no código. Não foi possível executar build nem testes em navegador neste ambiente sem instalar as dependências. Nenhum teste visual ou build é declarado como aprovado. As páginas de políticas e a tabela de medidas continuam provisórias até receberem dados oficiais e aprovação.


## Auditoria técnica e aplicação do logo oficial — Prompt 07

- Logo original recebido aplicado sem redesenho em `public/images/logo-dri-modas-poderosas.png`. O arquivo é PNG RGBA de 1254 × 1254 pixels; o fundo transparente original foi preservado.
- Cabeçalho, rodapé e página Sobre usam o arquivo público com `object-fit: contain`; a imagem do rodapé e da página Sobre tem texto alternativo acessível. No cabeçalho, o texto da marca está coberto pelo nome acessível do botão para evitar repetição visual.
- Não foi criado favicon a partir da imagem completa porque o logotipo circular detalhado pode ficar ilegível em tamanho pequeno.
- A camada de catálogo continua centralizada em `src/services/catalog.js` (`getProducts`, `getProductBySlug`, `getProductById`), permitindo substituir a fonte de dados no futuro sem refazer as páginas. Shopify não foi conectada.
- Os dados e preços continuam demonstrativos. Não há tokens/credenciais encontrados na inspeção estática do código-fonte; não foi feita auditoria de dependências de terceiros ou do ambiente de implantação.

### Validação do Prompt 07

- Inspeção estática dos arquivos do projeto e referências do logo: concluída.
- Sintaxe JSX/JavaScript: validar novamente após a edição com o parser disponível, se presente no ambiente.
- `npm install` e `npm run build`: executar no ambiente local. Não declarar build aprovado se a instalação não concluir.
- Testes de interação em navegador e conferência visual real em 320, 375, 768, 1024 e 1440 px ainda precisam ser feitos com as dependências instaladas e navegador disponível. As regras responsivas foram mantidas e ajustadas para o logo, mas isso não substitui teste visual real.

### Executar localmente

1. Instale Node.js LTS.
2. Descompacte o ZIP e entre na pasta do projeto.
3. Execute `npm install`.
4. Execute `npm run dev` e abra o endereço local indicado pelo Vite.
5. Execute `npm run build` para validar a compilação de produção.


## Publicação gratuita na Vercel

1. Extraia o ZIP e crie um repositório novo no GitHub.
2. Envie o conteúdo da pasta `dri-modas-poderosas` para a raiz do repositório (incluindo `package.json`, `index.html`, `src/`, `public/` e `vercel.json`). Não envie `node_modules/` nem a pasta `dist/`.
3. Entre em https://vercel.com/ e escolha **Add New → Project**.
4. Importe o repositório GitHub e autorize o acesso solicitado.
5. Confirme as configurações: Framework Preset **Vite**, Build Command `npm run build`, Output Directory `dist`, Install Command `npm install`.
6. Clique em **Deploy** e aguarde o resultado do build. Se concluir com sucesso, a Vercel mostrará um endereço público `*.vercel.app`.
7. Teste a página inicial e rotas como `/colecao`, `/sobre`, `/faq`, `/carrinho` e `/favoritos`, inclusive após atualizar a página. O arquivo `vercel.json` inclui o fallback de rotas para a aplicação de página única.

A publicação não conecta Shopify nem ativa pagamentos, estoque, frete ou pedidos reais. Antes de divulgar como loja operacional, substitua produtos, preços e imagens demonstrativos e finalize as políticas provisórias. O deploy só deve ser considerado concluído depois de a Vercel confirmar o build e fornecer o endereço.
