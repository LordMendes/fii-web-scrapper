const {XMLHttpRequest} = require('xmlhttprequest');
const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis } = require('./pathUrls');

const {
  getFiiHeaderValues,
  getTaxes,
  getYield,
  getLastRevenue,
  getFiiLastUpdates,
} = informationGetters;

const requestHtml = (url, fiiCode, action) => {
  console.log('Request -> ', url + fiiCode);
  return new Promise(((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + fiiCode, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const html = xhr.responseText;
        const res = action(html);
        if(xhr.status === 200) resolve(res)
        else throw new Error('Request Promise Error');
      }
    };
  }));
};

const requestLastRevenue = async (fiiCode) => {
  const response = await requestHtml(fiis, fiiCode, getLastRevenue);
  return response;
};

const requestLastUpdates = async (fiiCode) => {
  const response = await requestHtml(fiis, fiiCode, getFiiLastUpdates);
  return response;
};


const requestFiiHeaderValues = async (fiiCode) => {
  const response = await requestHtml(
    clubeFiis,
    fiiCode,
    getFiiHeaderValues,
  );
  return response;
};


const requestTaxes = async (fiiCode) => {
  const response = await requestHtml(clubeFiis, fiiCode, getTaxes);
  return response;
};

const requestYield = async (fiiCode) => {
  const response = await requestHtml(clubeFiis, fiiCode, getYield);
  return response;
};

module.exports = {
  requestFiiHeaderValues,
  requestLastRevenue,
  requestLastUpdates,
  requestTaxes,
  requestYield,
};
