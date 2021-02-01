describe("@esm-bundle/angular-common", () => {
  it("can load the System.register es2015 bundle", () => {
    return System.import("/base/system/es2015/ivy/angular-common.js");
  });

  it("can load the System.register es2015 prod bundle", () => {
    return System.import("/base/system/es2015/ivy/angular-common.min.js");
  });
});
