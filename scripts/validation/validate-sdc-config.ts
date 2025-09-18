// scripts/validation/validate-sdc-config.ts
/**
 * @file validate-sdc-config.ts
 * @description Guardián de Integridad para la configuración de la SDC.
 * @version 1.1.0 (Type Safety): Se alinea con el tsconfig.scripts.json para
 *              resolver todos los errores de tipo y de parsing.
 * @version 1.1.0
 * @author RaZ Podestá - MetaShark Tech
 */
import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";

const wizardConfigPath = path.resolve(
  process.cwd(),
  "app/[locale]/(dev)/dev/campaign-suite/_config/wizard.config.ts"
);

async function main() {
  console.log(
    chalk.blue.bold("🛡️  Ejecutando Guardián de Integridad de la SDC...")
  );
  let errorCount = 0;

  try {
    const { stepsConfig } = await import(wizardConfigPath);

    for (const step of stepsConfig) {
      console.log(
        chalk.cyan(`   🔎 Verificando Paso ${step.id}: ${step.titleKey}`)
      );

      const i18nPath = path.resolve(process.cwd(), step.i18nPath);
      const schemaPath = path.resolve(process.cwd(), `${step.schemaPath}.ts`);

      try {
        await fs.access(i18nPath);
        console.log(chalk.gray(`     ✅ [i18n] Encontrado: ${step.i18nPath}`));
      } catch {
        console.error(
          chalk.red.bold(`     🔥 [i18n] ¡NO ENCONTRADO!: ${step.i18nPath}`)
        );
        errorCount++;
      }

      try {
        await fs.access(schemaPath);
        console.log(
          chalk.gray(`     ✅ [schema] Encontrado: ${step.schemaPath}.ts`)
        );
      } catch {
        console.error(
          chalk.red.bold(
            `     🔥 [schema] ¡NO ENCONTRADO!: ${step.schemaPath}.ts`
          )
        );
        errorCount++;
      }
    }

    if (errorCount > 0) {
      console.error(
        chalk.red.bold(
          `\n❌ Validación fallida. Se encontraron ${errorCount} rutas de archivo rotas.`
        )
      );
      process.exit(1);
    } else {
      console.log(
        chalk.green.bold(
          "\n✅ Validación completada. La configuración de la SDC es coherente."
        )
      );
    }
  } catch (error) {
    console.error(
      chalk.red.bold("\n❌ Error crítico al ejecutar el guardián:"),
      error
    );
    process.exit(1);
  }
}

main();
// scripts/validation/validate-sdc-config.ts
