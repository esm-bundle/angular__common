describe("@esm-bundle/angular-common", () => {
  describe("@angular/common", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-common.js`
        );
        expect(m.Location).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-common.min.js`
        );
        expect(m.Location).toBeDefined();
      });
    });
  });

  describe("@angular/common/http", () => {
    ["es2015", "es2020"].forEach((ecma) => {
      it(`can load the System.register ${ecma} bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-http.js`
        );
        expect(m.HttpClient).toBeDefined();
      });

      it(`can load the System.register ${ecma} prod bundle`, async () => {
        const m = await System.import(
          `/base/system/${ecma}/ivy/angular-http.min.js`
        );
        expect(m.HttpClient).toBeDefined();
      });
    });
  });

  // TODO(artur): this should be uncommented once we have `esm-bundle/angular__upgrade`.
  // describe('@angular/common/upgrade', () => {
  //   ['es2015', 'es2020'].forEach((ecma) => {
  //     it(`can load the System.register ${ecma} bundle`, async () => {
  //       const m = await System.import(`/base/system/${ecma}/ivy/angular-upgrade.js`);
  //       expect(m.HttpClient).toBeDefined();
  //     });

  //     it(`can load the System.register ${ecma} prod bundle`, async () => {
  //       const m = await System.import(`/base/system/${ecma}/ivy/angular-upgrade.min.js`);
  //       expect(m.HttpClient).toBeDefined();
  //     });
  //   });
  // });
});
