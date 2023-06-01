describe("@esm-bundle/angular-common", () => {
  describe("@angular/common", () => {
    it("can load the System.register es2022 bundle", async () => {
      const m = await System.import(
        "/base/system/es2022/ivy/angular-common.js"
      );
      expect(m.Location).toBeDefined();
    });

    it("can load the System.register es2022 prod bundle", async () => {
      const m = await System.import(
        "/base/system/es2022/ivy/angular-common.min.js"
      );
      expect(m.Location).toBeDefined();
    });
  });

  describe("@angular/common/http", () => {
    it("can load the System.register es2022 bundle", async () => {
      const m = await System.import("/base/system/es2022/ivy/angular-http.js");
      expect(m.HttpClient).toBeDefined();
    });

    it("can load the System.register es2022 prod bundle", async () => {
      const m = await System.import(
        "/base/system/es2022/ivy/angular-http.min.js"
      );
      expect(m.HttpClient).toBeDefined();
    });
  });

  // TODO(artur): this should be uncommented once we have 'esm-bundle/angular__upgrade'.
  // describe('@angular/common/upgrade', () => {
  //   ['es2015', 'es2020'].forEach((ecma) => {
  //     it('can load the System.register es2022 bundle', async () => {
  //       const m = await System.import('/base/system/es2022/ivy/angular-upgrade.js');
  //       expect(m.HttpClient).toBeDefined();
  //     });

  //     it('can load the System.register es2022 prod bundle', async () => {
  //       const m = await System.import('/base/system/es2022/ivy/angular-upgrade.min.js');
  //       expect(m.HttpClient).toBeDefined();
  //     });
  //   });
  // });
});
