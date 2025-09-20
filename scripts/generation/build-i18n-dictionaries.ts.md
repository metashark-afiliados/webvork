// scripts/generation/build-i18n-dictionaries.ts
/\*\*

- @file build-i18n-dictionaries.ts
- @description Script de build para la internacionalización.
-              - v3.1.0 (Antifragile Dev Mode): En modo desarrollo, los errores
-                de validación se reportan pero no detienen el build. En producción,
-                el build se detiene para garantizar la integridad de los datos.
- @version 3.1.0
- @author RaZ Podestá - MetaShark Tech
  _/
  import _ as fs from "fs/promises";
  import \* as path from "path";
  import chalk from "chalk";
  import { supportedLocales, type Locale } from "@/shared/lib/i18n.config";
  import { i18nSchema } from "@/shared/lib/schemas/i18n.schema";

const MESSAGES_BASE_DIR = path.resolve(process.cwd(), "messages");
const RAZBITS_BASE_DIR = path.resolve(process.cwd(), "components/razBits");
const OUTPUT_DIR = path.resolve(process.cwd(), "public/locales");

type I18nFileContent = { [key in Locale]?: Record<string, any> };

async function discoverAndReadI18nFiles(): Promise<I18nFileContent[]> {
const allContents: I18nFileContent[] = [];
const directoriesToScan = [MESSAGES_BASE_DIR, RAZBITS_BASE_DIR];
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
console.log(
chalk.yellow.bold(
" - Modo de Producción detectado. Se excluirá el contenido de desarrollo."
)
);
}

for (const dir of directoriesToScan) {
try {
const files = await fs.readdir(dir, {
recursive: true,
withFileTypes: true,
});
for (const file of files) {
if (file.isFile() && file.name.endsWith(".i18n.json")) {
const filePath = path.join(file.path, file.name);
const devPathsToIgnore = [
path.join("messages", "components", "dev"),
path.join("messages", "pages", "dev"),
];

          if (
            isProduction &&
            devPathsToIgnore.some((devPath) => filePath.includes(devPath))
          ) {
            console.log(
              chalk.gray(
                `    - Omitiendo (PROD): ${path.relative(process.cwd(), filePath)}`
              )
            );
            continue;
          }
          try {
            const contentString = await fs.readFile(filePath, "utf-8");
            allContents.push(JSON.parse(contentString));
          } catch (error) {
            console.warn(
              chalk.yellow(
                `  - Advertencia: No se pudo leer o parsear ${filePath}`
              )
            );
          }
        }
      }
    } catch (err) {
      console.warn(
        chalk.yellow(
          `  - Advertencia: No se pudo escanear el directorio ${dir}`
        )
      );
    }

}
return allContents;
}

async function buildDictionaries() {
console.log(
chalk.blue.bold("🚀 Iniciando compilación de diccionarios i18n...")
);
await fs.mkdir(OUTPUT_DIR, { recursive: true });
const allI18nContents = await discoverAndReadI18nFiles();

let validationFailed = false;
const isProduction = process.env.NODE_ENV === "production";

for (const locale of supportedLocales) {
console.log(chalk.cyan(`\n   Ensamblando diccionario para [${locale}]...`));
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

    // Siempre escribe el archivo, incluso si es inválido, para que el dev server no se rompa.
    const outputPath = path.join(OUTPUT_DIR, `${locale}.json`);
    await fs.writeFile(
      outputPath,
      JSON.stringify(validation.data || fullDictionary, null, 2),
      "utf-8"
    );

    if (validation.success) {
      console.log(
        chalk.green(
          `  ✅ Diccionario para [${locale}] compilado con éxito en: ${outputPath}`
        )
      );
    } else {
      console.log(
        chalk.yellow(
          `  ⚠️  Diccionario para [${locale}] compilado CON ERRORES en: ${outputPath}`
        )
      );
    }

}

// --- [NUEVA LÓGICA] Detener el build solo en producción ---
if (validationFailed && isProduction) {
console.error(
chalk.red.bold(
"\n❌ Error Crítico: Uno o más diccionarios fallaron la validación en modo PRODUCCIÓN."
)
);
console.error(
chalk.yellow(
" El build ha sido detenido para prevenir un despliegue con datos corruptos."
)
);
process.exit(1);
} else if (validationFailed) {
console.warn(
chalk.yellow.bold(
"\n🔔 Aviso: Se detectaron errores de validación en modo DESARROLLO. El servidor continuará ejecutándose, pero algunas partes de la UI pueden no renderizarse correctamente."
)
);
}

console.log(
chalk.blue.bold("\n✨ Proceso de compilación de i18n completado.")
);
}

buildDictionaries().catch((error) => {
console.error(
chalk.red.bold(
"\n❌ Error crítico durante la compilación de diccionarios:"
),
error
);
process.exit(1);
});
