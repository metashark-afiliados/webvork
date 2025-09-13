// app/[locale]/(dev)/login/page.tsx
/**
 * @file page.tsx
 * @description Página de login para el Developer Command Center.
 *              - v1.4.0: Refactoriza los alias de importación al patrón robusto
 *                `@/components/...` para garantizar la compatibilidad con el build.
 * @version 1.4.0
 * @author RaZ podesta - MetaShark Tech
 */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import type { Dictionary } from "@/schemas/i18n.schema";
import type { Locale } from "@/lib/i18n.config";
// --- INICIO DE CORRECCIÓN: Rutas de importación robustas ---
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
// --- FIN DE CORRECCIÓN ---
import { LoginForm } from "./_components/LoginForm";

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
  const dictionary: Partial<Dictionary> = await getDictionary(locale);
  const content = dictionary.devLoginPage;

  if (!content) {
    return <div>Error: Contenido para la página de login no encontrado.</div>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Header Minimalista */}
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

      {/* Fondo Dinámico */}
      <div className="absolute inset-0 z-0 opacity-20">
        {backgroundImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Fondo de diseño ${index + 1}`}
            fill
            className="object-cover"
            style={{
              transform: `translate(${Math.random() * 60 - 30}vw, ${Math.random() * 60 - 30}vh) scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 40 - 20}deg)`,
              transformOrigin: "center center",
            }}
            sizes="50vw"
            priority
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      {/* Formulario de Login */}
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
