describe("@esm-bundle/angular-common", () => {
  it("can load the esm es2015 bundle without dying", () => {
    return import("../esm/es2015/angular-common.min.js");
  });

  it("can load the esm es5 bundle without dying", () => {
    return import("../esm/es5/angular-common.min.js");
  });
});
