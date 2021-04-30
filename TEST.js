const request = require('./src/services/requestInformation')

request.fiiHeadersRequest('irdm11').then((res) => console.log(res))