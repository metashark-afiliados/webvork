// components/forms/OrderForm.tsx
/**
 * @file OrderForm.tsx
 * @description Formulário de pedido final. Refactorizado para una responsabilidad
 *              única: gestionar la entrada y envío de datos del usuario, eliminando
 *              toda la lógica de visualización de precios.
 *              - v5.1.0: Adapta el uso de la prop `icon` en `FormInput` para
 *                aceptar directamente un `LucideIconName` (string), tras la
 *                refactorización de `FormInput.tsx`. Esto resuelve los errores
 *                de tipo TS2322.
 * @version 5.1.0
 * @author RaZ Podestá - MetaShark Tech
 * @see .docs/development/TODO.md - Tarefa 2.3
 * @principle Principio de Responsabilidad Única (PRU)
 */
"use client";

import React, { useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { User, Phone } from "lucide-react"; // <-- ELIMINADO: Ya no se importan los componentes directamente
import { producerConfig } from "@/config/producer.config";
import { logger } from "@/lib/logging";
import { useProducerLogic } from "@/hooks/useProducerLogic";
import { HiddenFormFields } from "@/components/forms/HiddenFormFields";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

// --- Schema y Tipos ---
const OrderFormSchema = z.object({
  name: z.string().min(2, "Il nome è obbligatorio"),
  phone: z
    .string()
    .min(9, "Il numero de telefono no es válido")
    .regex(/^\+?[0-9\s-()]+$/, "Formato de telefone inválido"),
});
type OrderFormData = z.infer<typeof OrderFormSchema>;

// --- Props de Contenido i18n (Simplificadas) ---
interface OrderFormProps {
  nameInputLabel: string;
  nameInputPlaceholder: string;
  phoneInputLabel: string;
  phoneInputPlaceholder: string;
  submitButtonText: string;
  submitButtonLoadingText: string;
}

export function OrderForm({
  nameInputLabel,
  nameInputPlaceholder,
  phoneInputLabel,
  phoneInputPlaceholder,
  submitButtonText,
  submitButtonLoadingText,
}: OrderFormProps): React.ReactElement {
  console.log("[Observabilidad] Renderizando OrderForm (Atomizado)");
  const formRef = useRef<HTMLFormElement>(null);

  // Activa la lógica de tracking diferido
  useProducerLogic();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderFormSchema),
  });

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    logger.info(
      "[OrderForm] Validação do cliente bem-sucedida. Acionando submissão nativa...",
      { action: producerConfig.ACTION_URL, data }
    );
    // Dispara el envío nativo del formulario.
    formRef.current?.submit();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      action={producerConfig.ACTION_URL}
      method="POST"
      className="space-y-4 wv_order-form"
      noValidate
    >
      <FormInput
        id="name"
        label={nameInputLabel}
        icon="User" // <-- ¡CORRECCIÓN APLICADA AQUÍ! Se pasa el string literal
        placeholder={nameInputPlaceholder}
        {...register("name")}
        error={errors.name?.message}
        aria-invalid={!!errors.name}
        autoComplete="name"
      />
      <FormInput
        id="phone"
        label={phoneInputLabel}
        icon="Phone" // <-- ¡CORRECCIÓN APLICADA AQUÍ! Se pasa el string literal
        type="tel"
        placeholder={phoneInputPlaceholder}
        {...register("phone")}
        error={errors.phone?.message}
        aria-invalid={!!errors.phone}
        autoComplete="tel"
      />

      <HiddenFormFields />

      <Button
        type="submit"
        size="lg"
        variant="accent"
        className="w-full !mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? submitButtonLoadingText : submitButtonText}
      </Button>
    </form>
  );
}
