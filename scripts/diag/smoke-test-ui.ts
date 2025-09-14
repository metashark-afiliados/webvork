// scripts/diag/smoke-test-ui.ts
/**
 * @file smoke-test-ui.ts
 * @description Script de diagnóstico y observabilidad. Importa todos los componentes
 *              de la UI a través del barrel file para verificar la integridad de las
 *              exportaciones antes del build.
 * @version 1.0.0
 * @author RaZ podesta - MetaShark Tech
 */
import chalk from "chalk";
import * as UI from "../../components/ui";

function smokeTest() {
  console.log(chalk.blue.bold("🚀 Iniciando Smoke Test del Módulo UI..."));
  const allExports = Object.keys(UI);
  const totalExports = allExports.length;

  if (totalExports === 0) {
    console.error(chalk.red.bold("🔥 FALLO CRÍTICO: El barrel file de UI no exporta nada."));
    process.exit(1);
  }

  console.log(chalk.cyan(`   Verificando ${totalExports} exportaciones...`));

  allExports.forEach((exportName) => {
    // @ts-ignore
    if (typeof UI[exportName] === "undefined") {
      console.error(chalk.red.bold(`🔥 FALLO: La exportación "${exportName}" es undefined.`));
      process.exit(1);
    }
  });

  console.log(chalk.green.bold("✅ Smoke Test del Módulo UI superado con éxito. Todas las exportaciones son válidas."));
}

smokeTest();