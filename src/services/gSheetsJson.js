const { XMLHttpRequest } = require('xmlhttprequest');
const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis, mundoFii } = require('../const/pathUrls');

const {
  getFiiHeaderValues,
  getTaxes,
  getYield,
  getLastRevenue,
  getFiiLastUpdates,
  getFiiInfoData,
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

const mundoFiiRequest = async (fiiCode) => {
  const html = await requestHtml(mundoFii, fiiCode);
  const fiisRetrievedData = {
    data: getFiiInfoData(html),
  };
  return fiisRetrievedData;
};

const getGSheetJson = async (fiiCode) => {
  const { data } = await mundoFiiRequest(fiiCode);
  
  const formattedForSheetData = {
    segment: data.segment,
    lastYield: Number(
      data.lastYield.replace(',', '.').replace('R$', ''),
    ),
    manager: data.manager,
  };

  return formattedForSheetData;
};

module.exports = {
  getGSheetJson,
};
