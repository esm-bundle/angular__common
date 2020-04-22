import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

function createConfig({ format, target, minify, resolvedAngularCore }) {
  let dir = format === "module" ? "esm" : format;
  dir += `/${target}`;

  return {
    input: `./src/${target}/angular-common.js`,
    output: {
      file: `${dir}/angular-common${resolvedAngularCore ? ".resolved" : ""}${
        minify ? ".min" : ""
      }.js`,
      sourcemap: true,
      format,
      banner: `/* @angular/common@${packageJson.version} */`,
      paths: {
        "@angular/core": resolvedAngularCore
          ? `https://cdn.jsdelivr.net/npm/@esm-bundle/angular__core@${resolvedAngularCore}/esm/${target}/angular-core.resolved${
              minify ? ".min" : ""
            }.js`
          : "@angular/core",
      },
    },
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      minify &&
        terser({
          output: {
            comments: /@angular\/common@/,
          },
        }),
    ],
    external: ["@angular/core"],
  };
}

export default () => {
  const angularCoreDep = packageJson.devDependencies["@angular/core"];
  const resolvedAngularCore = angularCoreDep.slice(
    angularCoreDep.lastIndexOf("@") + 1
  );

  return [
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
      resolvedAngularCore,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
      resolvedAngularCore,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: true,
    }),
    createConfig({
      format: "module",
      target: "es5",
      minify: false,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
      resolvedAngularCore,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
      resolvedAngularCore,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: true,
    }),
    createConfig({
      format: "module",
      target: "es2015",
      minify: false,
    }),
    createConfig({ format: "system", target: "es5", minify: true }),
    createConfig({ format: "system", target: "es5", minify: false }),
    createConfig({ format: "system", target: "es2015", minify: true }),
    createConfig({ format: "system", target: "es2015", minify: false }),
  ];
};
