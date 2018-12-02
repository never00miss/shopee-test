import { TAXES } from "../src/constant/const";
import assert from "assert";
import Tax from "../src/transaction/tax";

describe("taxes unit testing", async function() {
  it("unit testing taxes type 1 aka food", async () => {
    const type = 1;
    const count = 2;
    const price = 1000;
    const activeTax = TAXES[type];

    const taxesDetail = new Tax().taxes(type, count, price);

    const tax = `price * 10 / 100`;

    const totalTax = eval(activeTax.condition) ? count * eval(tax) : 0;

    assert.strictEqual(activeTax.tax, tax);
    assert.strictEqual(activeTax.key, 1);
    assert.strictEqual(taxesDetail.total_tax, totalTax);
  });

  it("unit testing taxes type 2 aka CIGARETTES", async () => {
    const type = 2;
    const count = 2;
    const price = 1000;
    const activeTax = TAXES[type];

    const taxesDetail = new Tax().taxes(type, count, price);

    const tax = `(2 / 100) * price + 10`;

    const totalTax = eval(activeTax.condition) ? count * eval(tax) : 0;
    assert.strictEqual(activeTax.tax, tax);
    assert.strictEqual(activeTax.key, 2);
    assert.strictEqual(taxesDetail.total_tax, totalTax);
  });

  it("unit testing taxes type 3 aka food", async () => {
    const type = 3;
    const count = 2;
    const price = 1000;
    const activeTax = TAXES[type];

    const taxesDetail = new Tax().taxes(type, count, price);

    const tax = `((1 / 100) * (price - 100))`;
    const totalTax = eval(activeTax.condition) ? count * eval(tax) : 0;

    assert.strictEqual(activeTax.tax, tax);
    assert.strictEqual(activeTax.key, 3);
    assert.strictEqual(taxesDetail.total_tax, totalTax);
  });
});
