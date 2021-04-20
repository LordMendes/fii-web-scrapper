const request = require('./services/requestInformation');


const run = async () => {
  Promise.all([
    request.requestFiiHeaderValues('irdm11'),
    request.requestLastRevenue('irdm11'),
    request.requestLastUpdates('irdm11'),
    request.requestTaxes('irdm11'),
    request.requestYield('irdm11'),
  ]).then((response) => console.log(response));
};

run();
