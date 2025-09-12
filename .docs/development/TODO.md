# TODO List & Plano de Ação Tático v1.0

## 1. Objetivo Principal

Replicar a lógica de conversão da página do produtor (`it4.curcumacomplex.com`) dentro da nossa arquitetura React/Next.js (`curcumin-simplex`), garantindo que os leads sejam atribuídos corretamente, de forma transparente para o sistema do produtor.

---

## 2. Fases de Execução

### **Fase 1: Preparação da Infraestrutura (Já Concluída)**

-   **[✓] 1.1.** Auditoria do código-fonte do produtor.
-   **[✓] 1.2.** Auditoria do projeto base `curcumin-simplex`.
-   **[✓] 1.3.** Definição do Blueprint de Branding e da arquitetura conceitual.

### **Fase 2: Engenharia do Mecanismo de Conversão**

*   **Tarefa 2.1: Aquisição e Integração dos Scripts do Produtor.**
    *   **Descrição:** Baixar os arquivos `jquery-3.5.1.min.js` e `webvork.js` do site do produtor e salvá-los em nossa pasta `public/vendor/`.
    *   **Implementação:** Utilizar o componente `<Script>` do Next.js em `src/app/layout.tsx` para injetar estes scripts de forma global e não bloqueante. `jQuery` deve ser carregado primeiro (`strategy="beforeInteractive"`), seguido por `webvork.js` (`strategy="lazyOnload"`).

*   **Tarefa 2.2: Refatoração do Componente `OrderForm.tsx`.**
    *   **Descrição:** Transformar o `OrderForm` de um componente que usa Server Actions para um que realiza uma submissão POST direta e tradicional.
    *   **Implementação:**
        1.  Remover completamente a dependência de `useFormState` e da nossa `Server Action`.
        2.  O `<form>` renderizado terá sua `action` apontando diretamente para o endpoint do produtor (`https://it4.curcumacomplex.com/order.php`) e `method="POST"`.
        3.  Manteremos `react-hook-form` e `zod` apenas para a **validação do lado do cliente**, como uma camada de melhoria da experiência do usuário, antes da submissão.
        4.  O `onSubmit` do `react-hook-form` simplesmente permitirá que o evento de submissão do formulário prossiga nativamente se a validação passar.

*   **Tarefa 2.3: Construção do Subcomponente `HiddenFormFields.tsx`.**
    *   **Descrição (Atomização):** Para manter o `OrderForm.tsx` limpo e focado nos campos visíveis, vamos atomizar a renderização dos campos ocultos em um componente separado.
    *   **Implementação:**
        1.  Criar `src/components/forms/HiddenFormFields.tsx`.
        2.  Este componente de apresentação puro irá renderizar **todos** os campos `<input type="hidden">` replicados do formulário do produtor.
        3.  Ele será chamado dentro do `<form>` no `OrderForm.tsx`.
    *   **Justificativa:** Esta atomização isola a complexidade da "carga de tracking" e adere ao PRU.

### **Fase 3: Design e Conteúdo da Página de Apresentação**

*   **Tarefa 3.1: Nivelamento e Adaptação dos Componentes de Seção.**
    *   **Descrição:** Refatorar cada componente de seção (`Hero.tsx`, `BenefitsSection.tsx`, etc.) para cumprir a **Diretiva 003: Manifiesto de Qualidade de Componentes**.
    *   **Implementação:**
        1.  Para cada componente, removeremos todo o conteúdo hardcoded.
        2.  O conteúdo será passado através de `props`, cujos tipos serão validados pelos nossos schemas Zod em `src/lib/schemas/`.
        3.  Os estilos serão alinhados com nosso `Blueprint de Branding`.

*   **Tarefa 3.2: Montagem da Página Principal (`page.tsx`).**
    *   **Descrição:** O `page.tsx` funcionará como o "Ensamblador Lego", lendo a configuração do `.env` e renderizando as seções ativas na ordem correta.
    *   **Implementação:** A lógica de renderização condicional já existente no projeto base será mantida e expandida para incluir todos os nossos novos componentes de seção.

### **Fase 4: Validação e Testes**

*   **Tarefa 4.1: Teste de Submissão End-to-End.**
    *   **Descrição:** Realizar um teste manual completo do funil de conversão.
    *   **Implementação:**
        1.  Navegar para a nossa página de desenvolvimento com um parâmetro UTM de teste (ex: `?utm_source=teste_lia`).
        2.  Verificar (usando as DevTools) que o script `webvork.js` preenche o campo `utm_source` oculto com `teste_lia`.
        3.  Preencher e submeter o formulário.
        4.  Verificar na aba "Rede" que uma requisição `POST` foi enviada para `it4.curcumacomplex.com/order.php` com **todos os dados corretos no payload**.

*   **Tarefa 4.2: Verificação de Scripts de Terceiros.**
    *   **Descrição:** Garantir que os scripts de análise do produtor (Google Analytics, Yandex Metrika) também funcionem em nossa página.
    *   **Implementação:** Injetar os scripts de tracking deles em nosso `layout.tsx` e verificar (usando extensões como o Google Tag Assistant) se os eventos são disparados corretamente.

    ---
    ### **Fase 0: Estabelecimento de Protocolos de Elite (Workflow)**

*   **Tarefa 0.1: Protocolo de Documentação Espejo.**
    *   **Descrição:** Para cada aparato de código criado ou refatorado em `src/`, um "documento espelho" conceitual correspondente **deve** ser criado em `./.docs-espejo/`.
    *   **Conteúdo do Espejo:** Cada documento espelho deve conter:
        1.  O **Rol Estratégico** do aparato.
        2.  A **Arquitetura e o Fluxo de Execução** da sua lógica.
        3.  O **Contrato de API** (suas `props`).
        4.  Uma **Zona de Melhorias Futuras** para registrar proativamente oportunidades de otimização.

*   **Tarefa 0.2: Estratégia de Gestão de Configuração Centralizada.**
    *   **Descrição:** Todas as "variáveis mágicas" (IDs, chaves de API, URLs de endpoint) devem ser extraídas do código e gerenciadas centralmente.
    *   **Implementação:**
        1.  Utilizaremos um arquivo `.env` para armazenar todas as chaves sensíveis e de configuração.
        2.  Criaremos um novo aparato em `src/config/producer.config.ts` que será a Única Fonte de Verdade (SSoT) para todas as configurações relacionadas ao produtor. Este arquivo lerá as variáveis do `.env`, as validará (usando Zod) e as exportará de forma segura para o resto da aplicação.

---```

**2. Estratégia de Gestão de IDs e Configuração**

Conforme a Tarefa 0.2, esta é a estratégia que seguiremos, que representa o padrão ouro em programação para gestão de configurações.

*   **Passo 1: O Arquivo `.env.example`**
    *   Criaremos um arquivo `.env.example` na raiz do projeto. Este arquivo listará todas as variáveis de ambiente necessárias, mas com valores de exemplo, e será versionado no Git.
        ```env
        # .env.example
        
        # Configuración del Productor (Webvork)
        NEXT_PUBLIC_PRODUCER_ACTION_URL="https://it4.curcumacomplex.com/order.php"
        NEXT_PUBLIC_LANDING_ID="12157"
        NEXT_PUBLIC_OFFER_ID="357"
        
        # Configuración de Tracking de Terceros
        NEXT_PUBLIC_YANDEX_METRIKA_ID="98121540"
        NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="G-BLBB3RLLYE"
        ```

*   **Passo 2: O Orquestrador de Configuração (`producer.config.ts`)**
    *   Este novo aparato será o único ponto de contato da nossa aplicação com as configurações do produtor.

    **`./src/config/producer.config.ts
    