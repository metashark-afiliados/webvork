// app/[locale]/(dev)/login/_components/LoginForm.tsx
/**
 * @file LoginForm.tsx
 * @description Componente de cliente para el formulario de login del DCC.
 *              - v1.2.0: Se estandarizan y verifican todas las importaciones de alias
 *                de ruta para cumplir con la SSoT de tsconfig.json, garantizando la
 *                resolución de módulos en el build de producción.
 * @version 1.2.0
 * @author RaZ podesta - MetaShark Tech
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock } from "lucide-react";
import { logger } from "@/lib/logging";
import { routes } from "@/lib/navigation";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
import { FormInput } from "@/ui/FormInput";
import { Button } from "@/ui/Button";

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
        icon={User}
        placeholder={content.usernamePlaceholder}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <FormInput
        id="password"
        label={content.passwordLabel}
        icon={Lock}
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
