import fs from "fs";
import url from "url";
import path from "path";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { createEs2015LinkerPlugin } from "@angular/compiler-cli/linker/babel";
import {
  ConsoleLogger,
  NodeJSFileSystem,
  LogLevel,
} from "@angular/compiler-cli";

const __dirname = new url.URL(".", import.meta.url).pathname;
const packageJson = JSON.parse(
  fs
    .readFileSync(
      path.resolve(__dirname, "node_modules/@angular/common/package.json")
    )
    .toString()
);

/** File system used by the Angular linker plugin. */
const fileSystem = new NodeJSFileSystem();
/** Logger used by the Angular linker plugin. */
const logger = new ConsoleLogger(LogLevel.info);
/**
 * The linker plugin is used to make output files AOT compatible, so they don't
 * require the `@angular/compiler` at runtime.
 */
const linkerPlugin = createEs2015LinkerPlugin({
  fileSystem,
  logger,
  linkerJitMode: false,
});

const packages = ["2022"]
  .map((ecma) => [
    { ecma, angularPackage: "@angular/common", filename: "common" },
    { ecma, angularPackage: "@angular/common/http", filename: "http" },
    { ecma, angularPackage: "@angular/common/upgrade", filename: "upgrade" },
  ])
  .flat();

export default packages
  .map(({ ecma, angularPackage, filename }) => [
    createConfig({
      ecma,
      prod: false,
      format: "system",
      angularPackage,
      filename,
    }),
    createConfig({
      ecma,
      prod: true,
      format: "system",
      angularPackage,
      filename,
    }),
    createConfig({ ecma, prod: false, format: "es", angularPackage, filename }),
    createConfig({ ecma, prod: true, format: "es", angularPackage, filename }),
  ])
  .flat();

function createConfig({ ecma, prod, format, angularPackage, filename }) {
  const dir = (format === "es" ? "." : format) + `/es${ecma}/ivy`;

  return {
    input: path.join(
      __dirname,
      `node_modules/@angular/common/fesm${ecma}/${filename}.mjs`
    ),
    output: {
      file: `${dir}/angular-${filename}.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - ${angularPackage}@${packageJson.version} - Ivy - ${format} format - es${ecma} - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      babel({ plugins: [linkerPlugin] }),
      prod &&
        terser({
          format: {
            ecma,
            comments: /esm-bundle/,
          },
          compress: {
            global_defs: {
              ngJitMode: false,
              ngDevMode: false,
              ngI18nClosureMode: false,
            },
          },
        }),
    ],
    external: [
      "rxjs",
      "rxjs/operators",
      "@angular/core",
      "@angular/router",
      "@angular/platform-browser",
      "@angular/upgrade",
    ],
  };
}
