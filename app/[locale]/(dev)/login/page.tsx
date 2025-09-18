// app/[locale]/(dev)/login/page.tsx
/**
 * @file page.tsx
 * @description Página de login para el Developer Command Center (DCC).
 *              v2.2.0 (Code Hygiene): Se elimina la importación no utilizada
 *              de 'Dictionary' para cumplir con las reglas de ESLint.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n.config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { LoginForm } from "./_components/LoginForm";
import { logger } from "@/lib/logging";

interface DevLoginPageProps {
  params: { locale: Locale };
}

const backgroundImages = [
  "/img/dev/login/bg-1.png",
  "/img/dev/login/bg-2.png",
  "/img/dev/login/bg-3.png",
  "/img/dev/login/bg-4.png",
  "/img/dev/login/bg-5.png",
];

export default async function DevLoginPage({
  params: { locale },
}: DevLoginPageProps) {
  logger.info(
    `[DevLoginPage] Renderizando la página de login para locale: ${locale}`
  );

  const { dictionary } = await getDictionary(locale);
  const content = dictionary.devLoginPage;

  if (!content) {
    logger.error(
      `[DevLoginPage] Contenido 'devLoginPage' no encontrado para locale: '${locale}'.`
    );
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-destructive p-8">
        <div>
          <h2 className="text-2xl font-bold">Error de Contenido</h2>
          <p>
            El contenido para la página de login de desarrollo no se encontró en
            el diccionario.
          </p>
        </div>
      </div>
    );
  }

  const randomBackground =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <Link href={`/${locale}`}>
          <Image
            src="/img/layout/header/globalfitwell-logo-v2.svg"
            alt="Global Fitwell Logo"
            width={150}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
      </header>

      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src={randomBackground}
          alt="Fondo decorativo de login"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Card className="w-full bg-background/50 backdrop-blur-lg border-white/10 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {content.title}
            </CardTitle>
            <CardDescription>{content.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm content={content} locale={locale} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
// app/[locale]/(dev)/login/page.tsx
