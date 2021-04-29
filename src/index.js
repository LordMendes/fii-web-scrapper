const request = require('./services/requestInformation');


const run = async () => {
  Promise.all([
    request.fiisPageRequest('irdm11'),
    request.clubeFiisRequest('irdm11'),
    request.fiiHeadersRequest('irdm11')
  ]).then((response) => console.log(response));
};

run();
