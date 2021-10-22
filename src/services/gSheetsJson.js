const { XMLHttpRequest } = require('xmlhttprequest');
const informationGetters = require('./getFiiInformation');
const { fiis, clubeFiis } = require('../const/pathUrls');

const {
  getFiiHeaderValues,
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
    fiiLastUpdates: getFiiLastUpdates(html),
  };
  return fiisRetrievedData;
};

const clubeFiisRequest = async (fiiCode) => {
  const html = await requestHtml(clubeFiis, fiiCode);
  const fiisRetrievedData = {
    headers: getFiiHeaderValues(html),
  };
  return fiisRetrievedData;
};


const getGSheetJson = async (fiiCode) => {
  const { lastRevenue } = await fiisPageRequest(fiiCode);
  const { headers } = await clubeFiisRequest(fiiCode);
  
  const formattedForSheetData = {
    segment: headers.segment,
    lastYield: Number(lastRevenue[0].revenue.replace(',','.').replace("R$","")),
    manager: headers.manager
  }

  return formattedForSheetData;
};


module.exports = {
  getGSheetJson
};
