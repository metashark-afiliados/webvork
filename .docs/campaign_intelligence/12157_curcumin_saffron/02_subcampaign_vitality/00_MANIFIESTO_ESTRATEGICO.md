// .docs/campaign_intelligence/12157_curcumin_saffron/02_subcampaign_vitality/00_MANIFIESTO_ESTRATEGICO.md
/**
 * @file 00_MANIFIESTO_ESTRATEGICO.md
 * @description Manifiesto Estratégico y Creativo para la sub-campaña "Vitality".
 *              Es la SSoT conceptual que define el branding, la psicología,
 *              la estructura y el estilo de esta variante de la campaña 12157.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */

# Manifiesto Estratégico: Sub-Campaña "Vitality"

## 1. Concepto Central y Psicología del Consumidor

*   **Nombre Clave:** Vitality (Vitalità)
*   **Ángulo de Marketing:** "Recupera la energía para vivir la vida que amas."
*   **Psicología del Avatar ("Sofia Verdi"):** Esta campaña no le habla a sus miedos sobre la salud, sino a sus **deseos y aspiraciones**. Apelamos a la nostalgia de sentirse enérgica y a la aspiración de mantener un estilo de vida activo y pleno. El mensaje es de **optimismo y empoderamiento**. Vendemos la sensación de "volver a ser tú misma".

## 2. Branding Visual y Dirección de Arte

*   **Concepto Visual:** Natural, Vibrante, Humano.
*   **Paleta de Colores (SSoT para `vitality-theme.json`):**
    *   `primary`: **Naranja Cúrcuma (`43 96% 54%`)**. Evoca energía, calidez y el ingrediente principal.
    *   `secondary`: **Verde Hoja (`140 45% 95%`)**. Un fondo muy claro y natural para secciones de texto, evoca frescura y naturaleza.
    *   `accent`: **Verde Esmeralda (`160 80% 40%`)**. Para CTAs y elementos destacados, crea un contraste natural y atractivo con el naranja.
    *   `background`: **Blanco Roto (`30 50% 98%`)**. Un fondo principal cálido y acogedor, menos clínico que el blanco puro.
    *   `foreground`: **Gris Oscuro Cálido (`30 10% 20%`)**. Para el texto principal, más suave y legible sobre el fondo cálido.
*   **Tipografía:**
    *   **Titulares (`font-serif`): Poppins**. Moderna, redondeada y enérgica. Transmite optimismo.
    *   **Cuerpo de Texto (`font-sans`): Inter**. Garantiza máxima legibilidad y claridad.
*   **Estilo de Imagen:**
    *   **Héroe:** Imágenes luminosas y de alto contraste. Primeros planos del producto junto a los ingredientes frescos (cúrcuma, jengibre) sobre un fondo natural.
    *   **Estilo de Vida:** Fotografías de personas en el rango de edad 45-65 (nuestro avatar) disfrutando de actividades: un paseo en bicicleta por la campiña italiana, jardinería, una comida familiar al aire libre. Las expresiones deben ser de **alegría y bienestar genuinos**. Iluminación natural y colores cálidos.
    *   **Testimonios:** Usar retratos de aspecto auténtico, sonrientes y cercanos.

## 3. Estructura de la Landing Page y Mapa de Calor Psicológico

Este es el layout que definirá nuestro `vitality-theme.json`. El "mapa de calor" indica dónde esperamos la máxima atención del usuario.

| Orden | Componente (`name`)        | Propósito Psicológico                                     | 🔥 Mapa de Calor (Atención Esperada) |
| :---- | :------------------------- | :-------------------------------------------------------- | :------------------------------------- |
| 1     | `Hero`                     | **Gancho Emocional.** Captar la atención con el deseo de vitalidad. | 🔥🔥🔥🔥🔥 (Máxima)                  |
| 2     | `SocialProofLogos`         | **Anclaje de Confianza Inicial.** "Ok, parece legítimo".     | 🔥🔥 (Escaneo rápido)                 |
| 3     | `BenefitsSection`          | **Conexión Lógica.** Traducir la emoción en beneficios tangibles. | 🔥🔥🔥🔥 (Lectura detallada)          |
| 4     | `ThumbnailCarousel`        | **Visualización del Deseo.** Mostrar el estilo de vida aspiracional. | 🔥🔥🔥 (Impacto visual)              |
| 5     | `TestimonialGrid`          | **Validación por Pares.** "Si funcionó para ellos, puede funcionar para mí". | 🔥🔥🔥🔥 (Lectura de testimonios)     |
| 6     | `IngredientAnalysis`       | **Justificación Racional.** "Entiendo por qué funciona".     | 🔥🔥🔥 (Lectura de titulares)         |
| 7     | `GuaranteeSection`         | **Eliminación del Riesgo.** "No tengo nada que perder".      | 🔥🔥 (Escaneo visual de sellos)       |
| 8     | `OrderSection`             | **Punto de Conversión.** El momento de la decisión.          | 🔥🔥🔥🔥🔥 (Máxima)                  |
| 9     | `FaqAccordion`             | **Resolución de Dudas Finales.** Superar las últimas objeciones. | 🔥🔥 (Solo para los indecisos)        |
| 10    | `DoubleScrollingBanner`    | **Refuerzo y Urgencia Final.** "Mucha gente confía en esto". | 🔥🔥🔥 (Impacto dinámico)            |

## 4. Frases y Copy Específico (Extracto Inicial)

*   **ScrollingBanner:**
    1.  *"Riscopri l'energia per fare ciò che ami. La natura ti dà la spinta che cercavi."*
    2.  *"Offerta speciale: Torna a sentirti al 100%. Le scorte del nostro ingrediente più puro sono limitate."*
    3.  *"Per la donna che non si ferma. Il supporto naturale per le tue giornate più intense."*
*   **Titular del Hero (Ejemplo):**
    *   *"Quell'energia di una volta? È ancora dentro di te. Aiutala a risplendere."* (¿Esa energía de antes? Todavía está dentro de ti. Ayúdala a brillar.)
*   **Subtítulo del Hero (Ejemplo):**
    *   *"La formula naturale con la precisione svizzera, creata per chi vuole vivere ogni giorno al massimo, non solo sopravvivere."* (La fórmula natural con precisión suiza, creada para quienes quieren vivir cada día al máximo, no solo sobrevivir.)
*   **CTA Principal (Ejemplo):**
    *   *"Sì, Rivoglio la Mia Energia!"* (¡Sí, Quiero Mi Energía de Vuelta!)

Este manifiesto nos proporciona un plan de acción completo y detallado para construir todos los activos de la sub-campaña "Vitality".

// .docs/campaign_intelligence/12157_curcumin_saffron/02_subcampaign_vitality/00_MANIFIESTO_ESTRATEGICO.md