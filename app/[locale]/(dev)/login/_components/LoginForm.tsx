// RUTA: app/[locale]/(dev)/login/_components/LoginForm.tsx
/**
 * @file LoginForm.tsx
 * @description Componente de cliente de élite para el formulario de login del DCC,
 *              con animación de entrada y cumplimiento holístico de la Directiva 026.
 * @version 8.0.0 (Holistic Elite Leveling & MEA/UX)
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { logger } from "@/shared/lib/logging";
import { routes } from "@/shared/lib/navigation";
import type { Dictionary } from "@/shared/lib/schemas/i18n.schema";
import type { Locale } from "@/shared/lib/i18n.config";
import { FormInput } from "@/components/ui/FormInput";
import { Button, DynamicIcon } from "@/components/ui";
import { loginDevAction } from "../_actions/loginDev.action";
import { toast } from "sonner";

// --- SSoT de Tipos y Animaciones ---
type LoginFormContent = NonNullable<Dictionary["devLoginPage"]>;

interface LoginFormProps {
  content: LoginFormContent;
  locale: Locale;
}

const formContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

// --- Componente de Élite ---
export function LoginForm({ content, locale }: LoginFormProps) {
  logger.info("[LoginForm] Renderizando v8.0 (Elite & MEA).");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    logger.trace("[LoginForm] Intento de login iniciado.");
    setError(null);
    startTransition(async () => {
      const result = await loginDevAction(formData);
      if (result.success) {
        logger.success("[LoginForm] Autenticación exitosa. Redirigiendo...", {
          result,
        });
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
    <motion.div
      variants={formContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <form action={handleLogin} className="space-y-6">
        <motion.div variants={formItemVariants}>
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
        </motion.div>
        <motion.div variants={formItemVariants}>
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
            {/* Pilar I: Cero Texto Hardcodeado */}
            {isPending ? content.buttonLoadingText : content.buttonText}
          </Button>
        </motion.div>
        <motion.p
          variants={formItemVariants}
          className="text-xs text-muted-foreground text-center pt-4"
          dangerouslySetInnerHTML={{ __html: content.footerHtml }}
        />
      </form>
    </motion.div>
  );
}
