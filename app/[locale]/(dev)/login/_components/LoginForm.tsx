// app/[locale]/(dev)/login/_components/LoginForm.tsx
/**
 * @file LoginForm.tsx
 * @description Componente de cliente para el formulario de login del DCC.
 *              v6.0.0 (Alias Unification & Import Fix): Se corrige la ruta de
 *              importación del schema de i18n para usar el alias raíz y el
 *              nombre de archivo completo.
 * @version 6.0.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
// --- [INICIO DE CORRECCIÓN DE RUTA] ---
import type { Dictionary } from "@/lib/schemas/i18n.schema";
// --- [FIN DE CORRECCIÓN DE RUTA] ---
import type { Locale } from "@/lib/i18n.config";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

interface LoginFormProps {
  content: NonNullable<Dictionary["devLoginPage"]>;
  locale: Locale;
}

export function LoginForm({ content, locale }: LoginFormProps) {
  logger.info("[LoginForm] Renderizando componente...");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    logger.info(
      "[LoginForm] Login simulado. Redirigiendo al dashboard de desarrollo..."
    );
    router.push(routes.devDashboard.path({ locale }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <FormInput
        id="username"
        label={content.usernameLabel}
        icon="User"
        placeholder={content.usernamePlaceholder}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <FormInput
        id="password"
        label={content.passwordLabel}
        icon="Lock"
        placeholder={content.passwordPlaceholder}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        size="lg"
        variant="default"
        className="w-full !mt-8"
      >
        {content.buttonText}
      </Button>
      <p
        className="text-xs text-muted-foreground text-center pt-4"
        dangerouslySetInnerHTML={{ __html: content.footerHtml }}
      />
    </form>
  );
}
// app/[locale]/(dev)/login/_components/LoginForm.tsx
