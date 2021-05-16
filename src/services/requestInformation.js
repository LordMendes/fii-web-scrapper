const { XMLHttpRequest } = require('xmlhttprequest');
const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis } = require('../utils/pathUrls');

const {
  getFiiHeaderValues,
  getTaxes,
  getYield,
  getLastRevenue,
  getFiiLastUpdates,
} = informationGetters;

const requestHtml = (url, fiiCode) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + fiiCode, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const html = xhr.responseText;
        if (xhr.status === 200) {
          resolve(html);
        } else {
          reject(new Error('Request Promise Error'));
        }
      }
    };
  });

const fiisPageRequest = async (fiiCode) => {
  const html = await requestHtml(fiis, fiiCode);
  const fiisRetrievedData = {
    lastRevenue: getLastRevenue(html),
    fiiLastUpdates: getFiiLastUpdates(html),
  };
  return fiisRetrievedData;
};

const clubeFiisRequest = async (fiiCode) => {
  const html = await requestHtml(clubeFiis, fiiCode);
  const fiisRetrievedData = {
    taxes: getTaxes(html),
    fiiYield: getYield(html),
    headers: getFiiHeaderValues(html),
  };
  return fiisRetrievedData;
};

const fiiHeadersRequest = async (fiiCode) => {
  const html = await requestHtml(clubeFiis, fiiCode);
  const fiiHeadersData = getFiiHeaderValues(html);

  return fiiHeadersData;
};

const getFiiData = async (fiiCode) => {
  const { fiiLastUpdates, lastRevenue } = await fiisPageRequest(fiiCode);
  const { taxes, fiiYield, headers } = await clubeFiisRequest(fiiCode);

  return { headers, fiiLastUpdates, lastRevenue, taxes, fiiYield };
};

const getAllData = async (fiiCode) => {
  const fiiData = await getFiiData(fiiCode);

  return fiiData;
};

module.exports = {
  fiiHeadersRequest,
  getFiiData,
  getAllData,
};
