# Blueprint & Roadmap v3.0: O Manifesto do Hub de Conteúdo de Elite

## 1. Visão Geral e Missão do Projeto

**O Que Estamos Construindo:**
Não estamos construindo uma simples `Pre-Lander`. Estamos arquitetando um **Hub de Conteúdo de Autoridade** para o mercado italiano. Este é um micro-site focado no produto "Curcumin Spirulina Piperine Saffron", projetado para operar em duas frentes estratégicas:

1.  **A "Página de Apresentação" (Home):** Uma máquina de conversão de elite, otimizada para tráfego pago (Google Ads), cujo único objetivo é capturar leads de alta qualidade através de uma experiência educativa e confiável.
2.  **O "Motor de Conteúdo" (Blog):** Um motor de SEO de longo prazo, projetado para atrair tráfego orgânico, construir autoridade de marca e nutrir potenciais clientes que ainda estão em fase de pesquisa.

**Nossa Missão:**
Transformar o ceticismo do consumidor em confiança através de conteúdo baseado em evidências, e converter essa confiança em leads de alta qualidade para nosso parceiro, garantindo ao mesmo tempo 100% de conformidade com as políticas de publicidade do Google.

---

## 2. Decisões Arquitetônicas Fundamentais

Esta seção documenta as decisões estratégicas e técnicas mais importantes tomadas ao longo da nossa análise.

### **2.1. A Estratégia de "Ponte Educativa" (Em vez de Cloaking)**

*   **Decisão:** Rejeitamos explicitamente qualquer forma de "cloaking" ou dissimulação. Em vez disso, adotamos uma estratégia de **Página Ponte Educativa**.
*   **Justificativa:** O "cloaking" é uma violação grave que leva ao banimento. Nossa abordagem constrói um ativo sustentável. Criamos uma página de apresentação (`Pre-Lander`) com conteúdo de alto valor (baseado em estudos científicos) que aquece e qualifica o lead. O Google vê uma página útil, o usuário se sente informado e a taxa de conversão de leads para vendas aumenta, o que beneficia a nós e ao produtor.

### **2.2. A Clonagem da Lógica de Conversão (Não da Aparência)**

*   **Decisão:** Vamos replicar a **mecânica** do formulário do produtor, não necessariamente sua aparência. O componente `OrderForm.tsx` será visualmente integrado ao nosso design, mas funcionalmente será um clone perfeito do sistema deles.
*   **Justificativa:** Para garantir que cada lead seja atribuído a nós, precisamos enviar os dados para o endpoint deles (`order.php`) com a estrutura exata que eles esperam. Isso inclui todos os campos ocultos (`landing_id`, `offer_id`, `utm_source`, etc.). A melhor maneira de garantir 100% de compatibilidade é usar a própria engenharia deles.

### **2.3. A Questão da "Não Detecção" e o Foco em Qualidade**

*   **Decisão:** Nossa estratégia não se baseia em "não ser detectado", mas em sermos um **afiliado de tão alta qualidade** que o produtor não tenha incentivos para nos investigar.
*   **Justificativa:** As redes de afiliados de COD (Cash on Delivery) vivem da **taxa de confirmação** dos pedidos. Ao educar o cliente, nossa Pre-Lander gera leads mais qualificados, que tendem a ter uma taxa de confirmação maior. Para o produtor, seremos uma fonte de receita premium.

### **2.4. A Arquitetura de Componentes Atômicos**

*   **Decisão:** O projeto seguirá uma filosofia de **Atomização Radical**.
*   **Justificativa:** Cada componente terá uma única responsabilidade (Princípio da Responsabilidade Única - PRU).
    *   **Átomos/Moléculas (`/ui`):** Componentes de apresentação puros.
    *   **Organismos (`/ui`):** Seções complexas que unem moléculas.
    *   **Layouts (`/layout`):** Estrutura da página.
    *   **Páginas (`/app`):** Orquestradores que montam tudo.
    Isso resulta em um código mais limpo, reutilizável, testável e fácil de manter.

### **2.5. Internacionalização (i18n) com Arquitetura IMAS**

*   **Decisão:** Manteremos e expandiremos a arquitetura de i18n **IMAS (I18n Mirrored Atomic Structure)** já presente no projeto.
*   **Justificativa:** A estrutura de arquivos de tradução em `/messages` que espelha a estrutura de `/components` é a melhor prática da indústria para escalabilidade e co-localização da lógica, facilitando o trabalho dos desenvolvedores e tradutores.

### **2.6. Escolha Tecnológica: React (Next.js) para SSG**

*   **Decisão:** Utilizaremos o projeto base em Next.js, com o objetivo de gerar um site estático (Static Site Generation - SSG).
*   **Justificativa:**
    *   **Performance:** SSG produz arquivos HTML/CSS/JS puros, resultando em tempos de carregamento extremamente rápidos, o que é crucial para a conversão e para o SEO.
    *   **Hospedagem:** O output estático é compatível com qualquer provedor de hospedagem de baixo custo, como o Hostinger, sem a necessidade de um servidor Node.js.
    *   **Segurança:** A superfície de ataque de um site estático é drasticamente menor.

---

## 3. O Fluxo do Usuário e da Tecnologia

1.  **Atração:** Um usuário clica em nosso anúncio no Google Ads (otimizado com palavras-chave de cauda longa e baixo custo).
2.  **Aterrissagem:** Ele chega à nossa **Página de Apresentação** (`nossodominio.com/it-IT`), que é um Server Component do Next.js, renderizada estaticamente para máxima velocidade.
3.  **Captura de Atribuição:** O script **`webvork.js`**, injetado globalmente, lê os parâmetros UTM da URL (ex: `?utm_source=nosso_id`) e os armazena.
4.  **Educação e Confiança:** O usuário consome nosso conteúdo baseado em evidências, visualiza os depoimentos realistas e os benefícios claros.
5.  **Ação:** O usuário clica em um CTA, que rola suavemente até o componente `OrderForm.tsx`.
6.  **Preenchimento:** O `webvork.js` (ou nossa lógica de fallback) preenche os campos ocultos do formulário. O usuário preenche nome e telefone.
7.  **Submissão:** Ao clicar em "Enviar", a lógica do nosso `OrderForm.tsx` executa uma submissão de formulário POST tradicional diretamente para o endpoint `https://it4.curcumacomplex.com/order.php`, enviando todos os dados, incluindo nosso ID de afiliado.
8.  **Resultado:** O usuário é redirecionado para a página de agradecimento do produtor, e o lead é corretamente atribuído a nós no sistema deles.

Este manifesto estabelece a base conceitual do nosso projeto. Os próximos documentos detalharão a implementação de cada um desses pontos.