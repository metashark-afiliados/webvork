// RUTA: app/[locale]/(dev)/login/page.tsx
/**
 * @file page.tsx
 * @description Página de login para el Developer Command Center (DCC). Orquesta
 *              la carga de datos i18n y la composición de la UI con animaciones de élite.
 * @version 3.0.0 (Holistic Elite Compliance)
 * @author RaZ Podestá - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n.config";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { LoginForm } from "./_components/LoginForm";
import { logger } from "@/shared/lib/logging";
import { notFound } from "next/navigation";
import { DeveloperErrorDisplay } from "@/components/dev";

interface DevLoginPageProps {
  params: { locale: Locale };
}

// SSoT para las imágenes de fondo.
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
    `[DevLoginPage] Renderizando v3.0 (Elite Compliance) para locale: ${locale}`
  );

  const { dictionary, error } = await getDictionary(locale);
  const content = dictionary.devLoginPage;
  const headerContent = dictionary.header; // Para el alt text del logo

  // --- Pilar III: Guardia de Resiliencia Robusta ---
  if (error || !content || !headerContent) {
    const errorMessage =
      "Fallo al cargar el contenido i18n para la página de Login del DCC.";
    logger.error(`[DevLoginPage] ${errorMessage}`, { error });
    if (process.env.NODE_ENV === "production") {
      return notFound();
    }
    return (
      <DeveloperErrorDisplay
        context="DevLoginPage"
        errorMessage={errorMessage}
        errorDetails={
          error ||
          "Las claves 'devLoginPage' o 'header' faltan en el diccionario."
        }
      />
    );
  }

  const randomBackground =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <Link href={`/${locale}`}>
          <Image
            src={headerContent.logoUrl}
            alt={headerContent.logoAlt} // Pilar I: Cero Texto Hardcodeado
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
        {/*
          Este componente es un Server Component. La animación de entrada es
          manejada por su hijo Client Component <LoginForm />, lo cual es la
          arquitectura correcta para MEA/UX.
        */}
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
