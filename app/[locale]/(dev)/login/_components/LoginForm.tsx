// app/[locale]/(dev)/login/_components/LoginForm.tsx
/**
 * @file LoginForm.tsx
 * @description Componente de cliente para el formulario de login del DCC.
 * @version 7.1.0 (Action Contract Sync & Observability): Sincroniza la llamada
 *              a la Server Action con su nuevo contrato y añade logging de élite.
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import type { Dictionary } from "@/lib/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { FormInput } from "@/components/ui/FormInput";
import { Button, DynamicIcon } from "@/components/ui";
import { loginDevAction } from "../_actions/loginDev.action";
import { toast } from "sonner";

interface LoginFormProps {
  content: NonNullable<Dictionary["devLoginPage"]>;
  locale: Locale;
}

export function LoginForm({ content, locale }: LoginFormProps) {
  logger.info("[Observabilidad] Renderizando LoginForm v7.1");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    logger.trace("[LoginForm] Intento de login iniciado.");
    setError(null);
    startTransition(async () => {
      // --- [INICIO DE CORRECCIÓN DE CONTRATO] ---
      const result = await loginDevAction(formData);
      // --- [FIN DE CORRECCIÓN DE CONTRATO] ---
      if (result.success) {
        logger.success("[LoginForm] Autenticación exitosa.");
        toast.success("Login exitoso. Redirigiendo al DCC...");
        router.push(routes.devDashboard.path({ locale }));
      } else {
        logger.error("[LoginForm] Fallo de autenticación.", {
          error: result.error,
        });
        toast.error("Error de Login", { description: result.error });
        setError(result.error);
      }
    });
  };

  return (
    <form action={handleLogin} className="space-y-6">
      <FormInput
        id="password"
        label={content.passwordLabel}
        icon="Lock"
        placeholder={content.passwordPlaceholder}
        type="password"
        name="password"
        error={error ?? undefined}
        required
        autoComplete="current-password"
      />
      <Button
        type="submit"
        size="lg"
        variant="default"
        className="w-full !mt-8"
        disabled={isPending}
      >
        {isPending && (
          <DynamicIcon
            name="LoaderCircle"
            className="mr-2 h-4 w-4 animate-spin"
          />
        )}
        {isPending ? "Verificando..." : content.buttonText}
      </Button>
      <p
        className="text-xs text-muted-foreground text-center pt-4"
        dangerouslySetInnerHTML={{ __html: content.footerHtml }}
      />
    </form>
  );
}
// app/[locale]/(dev)/login/_components/LoginForm.tsx
