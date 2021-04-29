const { XMLHttpRequest } = require('xmlhttprequest');
const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis } = require('./pathUrls');

const {
  getFiiHeaderValues,
  getTaxes,
  getYield,
  getLastRevenue,
  getFiiLastUpdates,
} = informationGetters;

const requestHtml = (url, fiiCode) => {
  console.log('Request -> ', url + fiiCode);
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + fiiCode, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const html = xhr.responseText;
        if (xhr.status === 200) resolve(html);
        else throw new Error('Request Promise Error');
      }
    };
  });
};

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
    yield: getYield(html),
  };
  return fiisRetrievedData;
};

const fiiHeadersRequest = async (fiiCode) => {
  const html = await requestHtml(clubeFiis, fiiCode);
  const fiiHeadersData = {
    headers: getFiiHeaderValues(html)
  }
  return fiiHeadersData;
};

module.exports = {
  fiiHeadersRequest,
  fiisPageRequest,
  clubeFiisRequest,
};
