import Tax from "./transaction/tax";
import TaxModel from "./model/taxModel";

const corsHeader = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }
};

export const get_tax = async (event, context, callback) => {
  let paramData;

  if (event.queryStringParameters && "data" in event.queryStringParameters) {
    paramData = event.queryStringParameters.data;
  } else {
    return {
      ...corsHeader,
      statusCode: 200,
      body: JSON.stringify({
        message: 'You need "data" parameter'
      })
    };
  }

  const transactionData = new Tax().initTax(paramData);

  // prepare to insert, dont wait for insert do it asyncronous
  new TaxModel().bulkInsert(transactionData.mysql_data);
  delete transactionData.mysql_data;
  // done insert

  const response = {
    body: JSON.stringify({
      message: "success",
      data: transactionData
    })
  };

  return response;
};
