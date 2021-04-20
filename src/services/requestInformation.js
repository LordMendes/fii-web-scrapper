const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis } = require('./pathUrls');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const {
  BETA_getFiiHeaderValues,
  BETA_getTaxes,
  BETA_getYield,
  getLastRevenue,
  getFiiLastUpdates,
} = informationGetters;

const requestHtml = (url, fiiCode, action) => {
  console.log('Request -> ', url + fiiCode);
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + fiiCode, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        var html = xhr.responseText;
        var res = action(html);
        xhr.status == 200 ? resolve(res) : reject('error');
      }
    };
  });
};

const requestFiiHeaderValues = async (fiiCode) => {
  const response = await requestHtml(
    clubeFiis,
    fiiCode,
    BETA_getFiiHeaderValues,
  );
  return response;
};

const requestLastRevenue = async (fiiCode) => {
  const response = await requestHtml(fiis, fiiCode, getLastRevenue);
  return response;
};

const requestLastUpdates = async (fiiCode) => {
  const response = await requestHtml(fiis, fiiCode, getFiiLastUpdates);
  return response;
};

const requestTaxes = async (fiiCode) => {
  const response = await requestHtml(clubeFiis, fiiCode, BETA_getTaxes);
  return response;
};

const requestYield = async (fiiCode) => {
  const response = await requestHtml(clubeFiis, fiiCode, BETA_getYield);
  return response;
};

module.exports = {
  requestFiiHeaderValues,
  requestLastRevenue,
  requestLastUpdates,
  requestTaxes,
  requestYield,
};
