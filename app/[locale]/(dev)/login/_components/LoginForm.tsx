// app/[locale]/(dev)/login/_components/LoginForm.tsx // <-- Comentario incorrecto, debería ser para la página.
/**
 * @file LoginForm.tsx
 * @description Componente de cliente para el formulario de login del DCC.
 *              - v1.5.0: Adapta el uso de la prop `icon` en `FormInput` para
 *                aceptar directamente un `LucideIconName` (string), tras la
 *                refactorización de `FormInput.tsx`. Esto resuelve los errores
 *                de tipo al integrar `DynamicIcon`.
 * @version 1.5.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { User, Lock } from "lucide-react"; // Ya eliminado
// import DynamicIcon from "@/components/ui/DynamicIcon"; // <-- ELIMINADO: DynamicIcon ya no se usa directamente aquí
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";

interface LoginFormProps {
  content: NonNullable<Dictionary["devLoginPage"]>;
  locale: Locale;
}

export function LoginForm({ content, locale }: LoginFormProps) {
  logger.info("[Observabilidad] Renderizando LoginForm (Client Component)");
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
        icon="User" // <-- CORRECCIÓN: Ahora se pasa un string literal
        placeholder={content.usernamePlaceholder}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <FormInput
        id="password"
        label={content.passwordLabel}
        icon="Lock" // <-- CORRECCIÓN: Ahora se pasa un string literal
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
