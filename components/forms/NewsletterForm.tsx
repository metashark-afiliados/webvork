// components/forms/NewsletterForm.tsx
/**
 * @file NewsletterForm.tsx
 * @description Componente de cliente atómico para el formulario de suscripción a la newsletter.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui";
import { logger } from "@/lib/logging";

interface NewsletterFormProps {
  content: {
    placeholder: string;
    buttonText: string;
  };
}

export function NewsletterForm({
  content,
}: NewsletterFormProps): React.ReactElement {
  logger.info(
    "[Observabilidad] Renderizando NewsletterForm (Client Component)"
  );
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logger.success("Suscripción a la newsletter (simulado):", { email });
    // Aquí iría la lógica de envío a un servicio de email marketing
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="email"
        placeholder={content.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-background/80"
      />
      <Button type="submit" variant="default">
        <span className="hidden sm:inline">{content.buttonText}</span>
        <DynamicIcon name="Send" className="h-4 w-4 sm:hidden" />
      </Button>
    </form>
  );
}
