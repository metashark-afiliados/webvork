// app/page.tsx
"use client"; // El logger usa hooks de cliente (performance.now), por lo que el componente que lo usa debe ser de cliente.

import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { clientLogger } from "@/lib/logging";

// La metadata se mantiene en el servidor, no es necesario moverla.
/* export const metadata = { ... }; */

export default function Home() {
  clientLogger.startGroup("Renderizando Página Principal (Home)");
  clientLogger.info("Inicio del renderizado del componente Home.");
  clientLogger.time("Renderizado completo de Home");

  // El resto del componente permanece igual...

  clientLogger.timeEnd("Renderizado completo de Home");
  clientLogger.endGroup();

  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      <PricingSection />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
// app/page.tsx
