// scripts/validation/validate-theme-fragments.ts
/**
 * @file validate-theme-fragments.ts
 * @description Script de validación que actúa como un guardián de calidad.
 *              Escanea todos los `campaign.map.json`, parsea las cadenas NET
 *              y verifica que cada fragmento de tema referenciado exista en el
 *              sistema de archivos.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import * as fs from "fs/promises";
import * as path from "path";
import chalk from "chalk";
import { parseThemeNetString } from "../../lib/utils/theme.utils.ts";
import { netTracePrefixToPathMap } from "../../lib/config/theming.config.ts";

const CAMPAIGNS_DIR = path.resolve(process.cwd(), "content/campaigns");
const FRAGMENTS_DIR = path.resolve(process.cwd(), "content/theme-fragments");

async function validateFragments() {
  console.log(
    chalk.blue.bold("🚀 Iniciando validación de fragmentos de tema...")
  );
  let errorsFound = 0;

  try {
    const campaignDirs = await fs.readdir(CAMPAIGNS_DIR);

    for (const campaignId of campaignDirs) {
      const mapPath = path.join(CAMPAIGNS_DIR, campaignId, "campaign.map.json");
      try {
        const mapContent = await fs.readFile(mapPath, "utf-8");
        const campaignMap = JSON.parse(mapContent);

        for (const variantId in campaignMap.variants) {
          const variant = campaignMap.variants[variantId];
          if (!variant.theme) continue;

          const themePlan = parseThemeNetString(variant.theme);

          for (const prefix in themePlan) {
            const dir = netTracePrefixToPathMap[prefix];
            if (!dir) continue;

            const name = themePlan[prefix];
            const fragmentPath = path.join(
              FRAGMENTS_DIR,
              dir,
              `${name}.${dir}.json`
            );

            try {
              await fs.access(fragmentPath);
            } catch {
              console.error(
                chalk.red.bold(`  🔥 ERROR: Fragmento no encontrado!`)
              );
              console.error(
                chalk.red(
                  `    - Mapa de Campaña: ${path.relative(process.cwd(), mapPath)}`
                )
              );
              console.error(
                chalk.red(
                  `    - Variante: "${variant.name}" (ID: ${variantId})`
                )
              );
              console.error(chalk.red(`    - Trazo NET: "${prefix}-${name}"`));
              console.error(
                chalk.red(
                  `    - Ruta esperada: ${path.relative(process.cwd(), fragmentPath)}\n`
                )
              );
              errorsFound++;
            }
          }
        }
      } catch (e) {
        console.warn(
          chalk.yellow(`  ⚠️  Advertencia: No se pudo procesar ${mapPath}.`)
        );
      }
    }

    if (errorsFound > 0) {
      console.error(
        chalk.red.bold(
          `\n❌ Validación fallida. Se encontraron ${errorsFound} fragmentos de tema faltantes.`
        )
      );
      process.exit(1);
    } else {
      console.log(
        chalk.green.bold(
          "\n✅ Validación completada. Todos los fragmentos de tema referenciados existen."
        )
      );
    }
  } catch (error) {
    console.error(
      chalk.red.bold("\n❌ Error crítico durante la validación:"),
      error
    );
    process.exit(1);
  }
}

validateFragments();
// scripts/validation/validate-theme-fragments.ts
