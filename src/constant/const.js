export const TAXES = {
  1: {
    type: "FOOD",
    key: 1,
    refundable: true,
    tax: `price * 10 / 100`,
    condition: `true`
  },
  2: {
    type: "TOBACCO",
    key: 2,
    refundable: false,
    tax: `(2 / 100) * price + 10`,
    condition: `true`
  },
  3: {
    type: "ENTERTAINMENT",
    key: 3,
    refundable: false,
    tax: `((1 / 100) * (price - 100))`,
    condition: `price >= 100`
  }
};
