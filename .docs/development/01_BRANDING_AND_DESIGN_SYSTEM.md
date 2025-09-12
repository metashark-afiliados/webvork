# Blueprint de Branding v2.0: Identidade Visual e Verbal para Curcumin Simplex

## 1. Filosofia da Marca

**Essência:** "Ciência Natural, Bem-Estar Visível."

Nossa marca se posiciona na interseção entre a sabedoria da natureza e a validação da ciência moderna. Não vendemos soluções mágicas; oferecemos um suporte inteligente e natural para um estilo de vida consciente. A comunicação deve ser **educativa, transparente e aspiracional**.

**Arquétipo da Marca:** O Sábio/Explorador.

**Tono de Voz:** Científico, mas acessível; Confiante, mas humilde; Empático.

---

## 2. Sistema de Design: A Paleta de Cores

A paleta de cores será implementada seguindo a arquitetura "CSS-first" do projeto base. Os valores HSL serão definidos como variáveis CSS em `:root` dentro de `src/app/globals.css`, e os nomes semânticos serão mapeados na diretiva `@theme`.

| Rol Estratégico | Nome Semântico (`@theme`) | Variável CSS (`:root`) | Valor HSL (SSoT) | Descrição de Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Acento Primário** | `--color-primary` | `--primary` | `43 96% 54%` | **Amarelo Cúrcuma:** Usado para headlines, CTAs secundários e acentos que evocam energia. |
| **Fundo Principal** | `--color-background` | `--background` | `224 71% 4%` | **Azul Noite Profundo:** Projeta seriedade, confiança e um toque premium/científico. |
| **Texto Principal** | `--color-foreground` | `--foreground` | `210 40% 98%` | **Branco Suave:** Máxima legibilidade sobre o fundo escuro. |
| **Acento de Conversão**| `--color-accent` | `--accent` | `352 96% 54%` | **Laranja Avermelhado Vibrante:** Cor de mais alto contraste, **reservada para os CTAs principais** ("Comprar Agora"). |
| **Fundo Secundário** | `--color-secondary` | `--secondary` | `215 28% 17%` | **Azul Ardósia:** Para fundos de seções e cards, criando profundidade visual. |
| **Texto Secundário**| `--color-muted-foreground`| `--muted-foreground` | `215 20% 65%` | Para textos de menor importância, disclaimers e subtítulos. |

---

## 3. Tipografia

A implementação seguirá o padrão do projeto base, configurando as fontes em `src/app/layout.tsx` e referenciando-as em `src/app/globals.css`.

*   **Fonte para Títulos (Headings):** **Poppins** (via Google Fonts).
    *   **Justificativa:** Uma sans-serif geométrica moderna, que transmite uma sensação de tecnologia e inovação, mas com cantos arredondados que a tornam amigável. É perfeita para nossa identidade "científica, mas acessível".
    *   **Peso:** `700` (Bold) para `H1`, `H2`; `600` (SemiBold) para `H3`.

*   **Fonte para Corpo de Texto (Body):** **Inter** (via Google Fonts).
    *   **Justificativa:** Mantemos a `Inter` do projeto base. Sua legibilidade em telas é insuperável, ideal para os blocos de texto educativos da nossa Pre-Lander.
    *   **Peso:** `400` (Regular).

---

## 4. Estratégia de Elementos Visuais

*   **Imagens:**
    *   **Estilo:** Cinematográfico e de alto contraste. Imagens luminosas e vibrantes sobre fundos escuros para criar um efeito dramático e premium.
    *   **Herói:** Imagem do produto com ingredientes em close-up, usando a técnica de "shallow depth of field" (foco raso) para um visual sofisticado.
    *   **Estilo de Vida:** Fotos autênticas do nosso público-alvo (italianos 40-60+), com iluminação natural e expressões genuínas de bem-estar.
    *   **Assets:** Seguirão o `ASSET_MANAGEMENT_MANIFESTO.md` do projeto, com otimização (WebP) e estrutura de pastas espelhada.

*   **Iconografia:**
    *   **Biblioteca:** `lucide-react`.
    *   **Estilo:** Ícones de linha, limpos, com uma espessura de traço consistente (`stroke-width="1.5"`) para um visual delicado e técnico.

---

## 5. Implementação no Projeto `curcumin-simplex`

1.  **Arquivo `.env`:**
    *   `THEME_PRESET` será configurado para um novo preset que criaremos (ex: `THEME_PRESET="curcuma"`).
    *   As variáveis `CUSTOM_COLOR_*` serão usadas para injetar os valores HSL definidos acima.

2.  **Arquivo `src/lib/config/theme.config.ts` (A SER CRIADO/ADAPTADO):**
    *   Este arquivo conterá a lógica para ler as variáveis de ambiente do tema e gerar as variáveis CSS.
    *   Definiremos o preset `"curcuma"` com os valores HSL da nossa paleta.

3.  **Arquivo `src/app/globals.css`:**
    *   A seção `@theme` será mantida como está, pois ela já lê as variáveis CSS que serão geradas dinamicamente.
    *   As fontes `Poppins` e `Inter` serão referenciadas.

4.  **Arquivo `src/app/layout.tsx`:**
    *   A função `generateCssVariables` (do `theme.config.ts`) será chamada para injetar as cores e fontes no `<head>`. A importação de `Inter` já existe, adicionaremos `Poppins`.

Este documento de branding agora está perfeitamente alinhado com a arquitetura do projeto base `curcumin-simplex`. Ele nos dá um guia claro para a próxima fase: a refatoração e o desenvolvimento dos componentes de UI para que reflitam esta identidade visual e verbal de elite.