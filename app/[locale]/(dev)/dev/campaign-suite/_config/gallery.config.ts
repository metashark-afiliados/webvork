// app/[locale]/(dev)/dev/campaign-suite/_config/gallery.config.ts
/**
 * @file gallery.config.ts
 * @description SSoT para los componentes disponibles en las galerías de la SDC.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */

export const galleryConfig = {
  headers: [
    {
      name: "StandardHeader",
      previewImage: "/img/previews/headers/standard-header-preview.png",
      description: "Cabecera estándar con logo, navegación y CTA.",
    },
    {
      name: "MinimalHeader",
      previewImage: "/img/previews/headers/minimal-header-preview.png",
      description: "Cabecera minimalista solo con logo.",
    },
  ],
  footers: [
    {
      name: "StandardFooter",
      previewImage: "/img/previews/footers/standard-footer-preview.png",
      description: "Pie de página completo con enlaces y newsletter.",
    },
  ],
} as const;

export type GalleryComponentType = keyof typeof galleryConfig;
export type GalleryItem = (typeof galleryConfig)[GalleryComponentType][number];
// app/[locale]/(dev)/dev/campaign-suite/_config/gallery.config.ts
