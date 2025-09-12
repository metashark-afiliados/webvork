// src/components/forms/HiddenFormFields.tsx
/**
 * @file HiddenFormFields.tsx
 * @description Aparato atômico de apresentação, focado em uma única responsabilidade:
 *              renderizar todos os campos de formulário ocultos necessários para a
 *              atribuição de tracking e a integração com o sistema do produtor.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 * @see .docs/development/TODO.md - Tarefa 2.3
 */
import React from "react";

/**
 * @interface HiddenFormFieldsProps
 * @description Define as propriedades para o componente. Atualmente não requer props,
 *              mas está preparado para receber valores dinâmicos no futuro, alinhando-se
 *              com a nossa estratégia de gestão de configuração centralizada.
 */
interface HiddenFormFieldsProps {
  // Atualmente vazio, mas preparado para extensibilidade.
}

/**
 * @component HiddenFormFields
 * @description Renderiza o payload de dados ocultos para o formulário de pedido.
 *              Esta é uma peça crucial da clonagem da lógica do produtor, garantindo
 *              que o sistema deles receba todos os dados necessários de forma transparente.
 * @returns {React.ReactElement} O fragmento JSX com os inputs ocultos.
 */
export function HiddenFormFields({}: HiddenFormFieldsProps): React.ReactElement {
  console.log(
    "[Observabilidad] Renderizando HiddenFormFields (Payload de Tracking)"
  );

  return (
    <>
      {/* 
        Estes campos são uma réplica exata e completa dos campos encontrados na página do produtor.
        O script `webvork.js` (que será injetado globalmente) encontrará estes inputs
        pelo seu atributo 'name' e preencherá seus valores dinamicamente.
      */}
      <input name="lang" type="hidden" defaultValue="it" />
      <input name="ym" type="hidden" defaultValue="default" />
      <input name="utm_source" type="hidden" />
      <input name="utm_medium" type="hidden" />
      <input name="utm_campaign" type="hidden" />
      <input name="utm_content" type="hidden" />
      <input name="utm_term" type="hidden" />
      <input name="referer" type="hidden" />
      <input name="guid" type="hidden" />
      <input name="first_guid" type="hidden" />
      <input name="landing_id" type="hidden" />
      <input name="prelanding_id" type="hidden" />
      <input name="offer_id" type="hidden" />
      <input name="url" type="hidden" />
      <input name="shopwindow_id" type="hidden" />
      <input name="cookie_enabled" type="hidden" />
    </>
  );
}
// src/components/forms/HiddenFormFields.tsx
