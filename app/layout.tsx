// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
// --- INICIO DE MODIFICACIONES ---
import { getDictionary } from "@/lib/i18n"; // 1. Importar el motor de i18n
import { CardNav } from "@/components/razBits/CardNav/CardNav"; // 2. Importar nuestro componente SSoT

// Se elimina la importación de la Navbar obsoleta
// import { Navbar } from "@/components/layout/navbar";
// --- FIN DE MODIFICACIONES ---

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shadcn - Landing template",
  description: "Landing template from Shadcn",
  icons: {
    icon: "/icon.png",
  },
};

// --- MODIFICACIÓN: La función ahora es `async` para poder usar `await` ---
export default async function RootLayout({
  children,
  params, // Next.js nos pasa los params, incluyendo el locale
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // 3. Obtener el diccionario para el locale actual
  const dictionary = await getDictionary(params.locale);

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 4. Renderizar CardNav pasándole su contenido desde el diccionario */}
          <CardNav content={dictionary.cardNav} />

          {/* Se elimina la llamada a <Navbar /> */}

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
// app/layout.tsx
