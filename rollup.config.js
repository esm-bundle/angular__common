import { terser } from "rollup-plugin-terser";
import packageJson from "@angular/common/package.json";

export default [
  createConfig({ prod: false, format: "system" }),
  createConfig({ prod: true, format: "system" }),
  createConfig({ prod: false, format: "es" }),
  createConfig({ prod: true, format: "es" }),
];

function createConfig({ prod, format }) {
  const dir = (format === "es" ? "." : format) + "/es2015/ivy";

  return {
    input: require.resolve("@angular/common/fesm2015/common.js"),
    output: {
      file: `${dir}/angular-common.${prod ? "min." : ""}js`,
      format,
      sourcemap: true,
      banner: `/* esm-bundle - @angular/common@${packageJson.version} - Ivy - ${format} format - es2015 - Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license */`,
    },
    plugins: [
      prod &&
        terser({
          format: {
            comments: /esm-bundle/,
            ecma: "2015",
          },
        }),
    ],
    external: [
      "rxjs",
      "rxjs/operators",
      "@angular/core",
      "@angular/router",
      "@angular/platform-browser",
    ],
  };
}
