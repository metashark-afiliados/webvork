// scripts/generation/build-i18n-dictionaries.ts
/**
 * @file build-i18n-dictionaries.ts
 * @description Script de build para la internacionalización. Refactorizado para
 *              consumir la utilidad atómica i18n-discoverer, centralizando la
 *              lógica de descubrimiento de archivos y cumpliendo el principio DRY.
 * @version 4.0.0
 * @author RaZ Podestá - MetaShark Tech
 * @see roadmap.md - Tarea 2.2
 */
import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import { supportedLocales } from "../../lib/i18n.config";
import { i18nSchema } from "../../lib/schemas/i18n.schema";
import { discoverAndReadI18nFiles } from "../../lib/dev/i18n-discoverer"; // <-- CONSUME SSoT
import { logger } from "../../lib/logging";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/locales");

async function buildDictionaries() {
  logger.startGroup("🚀 Iniciando compilación de diccionarios i18n...");
  const isProduction = process.env.NODE_ENV === "production";

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // 1. Invoca al descubridor atómico, pasando la configuración del entorno.
  const allI18nContents = await discoverAndReadI18nFiles({
    excludeDevContent: isProduction,
  });

  let validationFailed = false;

  for (const locale of supportedLocales) {
    logger.startGroup(`   Ensamblando diccionario para [${locale}]...`);
    const fullDictionary = allI18nContents.reduce((acc, moduleContent) => {
      const contentForLocale = moduleContent[locale];
      return { ...acc, ...(contentForLocale || {}) };
    }, {});

    const validation = i18nSchema.safeParse(fullDictionary);

    if (!validation.success) {
      console.error(
        chalk.red.bold(`  🔥 ¡FALLO DE VALIDACIÓN para [${locale}]!`)
      );
      console.error(
        chalk.red(
          JSON.stringify(validation.error.flatten().fieldErrors, null, 2)
        )
      );
      validationFailed = true;
    }

    const outputPath = path.join(OUTPUT_DIR, `${locale}.json`);
    await fs.writeFile(
      outputPath,
      JSON.stringify(validation.data || fullDictionary, null, 2),
      "utf-8"
    );

    if (validation.success) {
      logger.success(
        `  ✅ Diccionario para [${locale}] compilado con éxito en: ${path.relative(
          process.cwd(),
          outputPath
        )}`
      );
    } else {
      logger.warn(
        `  ⚠️  Diccionario para [${locale}] compilado CON ERRORES en: ${path.relative(
          process.cwd(),
          outputPath
        )}`
      );
    }
    logger.endGroup();
  }

  if (validationFailed && isProduction) {
    console.error(
      chalk.red.bold(
        "\n❌ Error Crítico: Uno o más diccionarios fallaron la validación en modo PRODUCCIÓN."
      )
    );
    process.exit(1);
  } else if (validationFailed) {
    console.warn(
      chalk.yellow.bold(
        "\n🔔 Aviso: Se detectaron errores de validación en modo DESARROLLO."
      )
    );
  }

  logger.success("\n✨ Proceso de compilación de i18n completado.");
  logger.endGroup();
}

buildDictionaries().catch((error) => {
  console.error(
    chalk.red.bold("\n❌ Error fatal durante la compilación de diccionarios:"),
    error
  );
  process.exit(1);
});
// scripts/generation/build-i18n-dictionaries.ts
