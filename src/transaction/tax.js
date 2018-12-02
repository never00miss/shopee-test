import { TAXES } from "../constant/const";

export default class Tax {
  /**
   * this function init taxes json
   *
   * @param {JSON} paramsData
   *
   * @return {Object}
   */
  initTax(paramsData) {
    let data;

    try {
      data = JSON.parse(paramsData);
    } catch (error) {
      return { msg: error.message };
    }

    return this.getTaxDetail(data);
  }

  /**
   * get tax detail of transaction
   *
   * @param {Array} data
   */
  getTaxDetail(data) {
    let sumTotal = 0;
    let sumPrice = 0;
    let sumTax = 0;
    let prepareInsertData = [];

    // The primitive value is returned as the number of millisecond since midnight January 1, 1970 UTC.
    let taxID = new Date().valueOf();

    const transaction = data.map((val, key) => {
      try {
        const { name, tax_code, price, count } = val;
        const detailTaxes = this.taxes(tax_code, count, price);

        sumTotal += detailTaxes.grand_total;
        sumPrice += detailTaxes.total_price;
        sumTax += detailTaxes.total_tax;

        prepareInsertData.push([taxID, name, tax_code, count * price]);

        return {
          ...detailTaxes,
          name: name,
          count: count,
          price: price
        };
      } catch (error) {
        return { error: true, msg: error };
      }
    });

    return {
      detail_transaction: transaction,
      total_transaction: sumTotal,
      total_price: sumPrice,
      total_tax: sumTax,
      mysql_data: prepareInsertData,
      tax_id: taxID,
    };
  }

  /**
   * get taxes from exactly type, count and price input
   *
   * @param {Number} type
   * @param {Number} count
   * @param {Number} price
   *
   * @return {Object}
   */
  taxes(type, count, price) {
    if (isNaN(type) || isNaN(count) || isNaN(price)) {
      throw "Parameter is not a number!";
    }

    let totalTax;
    let taxData;

    const totalPrice = count * price;
    const activeTaxes = TAXES[type];

    taxData = {
      type: activeTaxes.type,
      total_tax: eval(activeTaxes.condition) ? count * eval(activeTaxes.tax) : 0
    };

    return {
      ...taxData,
      total_price: totalPrice,
      grand_total: totalPrice + taxData.total_tax
    };
  }
}
