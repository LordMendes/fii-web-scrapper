/* eslint-disable no-script-url */
const $ = require('cheerio');

const getFiiHeaderValues = (html) => {
  const headerListValue = [];
  const headerListTitle = [
    'segment',
    'dateIPO',
    'valueIPO',
    'manager',
    'mandate',
    'averageLiquity30Days',
    'quotesVolume',
    'ifix',
  ];

  $('#primaryTable tr td', html).each(function () {
    headerListValue.push($(this).text().split('\n').join(' '));
  });
  const header = {};
  headerListTitle.forEach((key, index) => {
    header[key] = headerListValue[index];
  });
  return header;
};

const getLastRevenue = (html) => {
  let rawLastRevenueList = [];
  const lastRevenueList = [];
  $('#last-revenues--table tbody', html).each(function () {
    rawLastRevenueList = $(this)
      .text()
      .split('\n')
      .filter((item) => !!item);
  });
  for (let i = 0; i < rawLastRevenueList.length; i += 5) {
    lastRevenueList.push({
      baseDate: rawLastRevenueList[i],
      paymentDate: rawLastRevenueList[i + 1],
      baseQuotation: rawLastRevenueList[i + 2],
      dividendYeld: rawLastRevenueList[i + 3],
      revenue: rawLastRevenueList[i + 4],
    });
  }
  return lastRevenueList;
};

const getFiiLastUpdates = (html) => {
  const updateNewsList = [];
  const updateNewsListLink = [];
  const updateNewsListTitle = [];
  const updateNewsListDate = [];

  $('#news--wrapper .date', html).each(function () {
    updateNewsListDate.push($(this).text());
  });
  $('#news--wrapper .title', html).each(function () {
    updateNewsListTitle.push($(this).text());
  });
  $('#news--wrapper a', html).each(function () {
    updateNewsListLink.push($(this).attr('href'));
  });

  updateNewsListTitle.forEach((title, index) => {
    updateNewsList.push({
      title,
      date: updateNewsListDate[index],
      link:
        updateNewsListLink[index] === 'javascript:;'
          ? null
          : updateNewsListLink[index],
    });
  });

  return updateNewsList;
};

const getTaxes = (html) => {
  const taxesValues = [];
  const taxesTitles = [
    'paidOutValueRefYear',
    'percentageOverPatrimonyValue',
    'percentageOverMaketValue',
  ];
  $('.taxaadm tr span', html).each(function () {
    taxesValues.push($(this).text());
  });
  const taxes = taxesTitles.reduce((formattedTaxes, taxTitle, index) => {
    formattedTaxes[taxTitle] = taxesValues[index];
    return formattedTaxes;
  }, {});

  return taxes;
};

const getYield = (html) => {
  const yieldTitles = [
    'oneMonthYield',
    'threeMonthYield',
    'sixMonthYield',
    'twelveMonthYield',
    'pvpa',
    'patrimonialValue',
    'marketValue',
  ];
  const yieldValues = [];
  $('.list span', html).each(function () {
    yieldValues.push($(this).text());
  });
  const yieldInfo = yieldTitles.reduce((formattedYieldInfo, title, index) => {
    formattedYieldInfo[title] = yieldValues[index];
    return formattedYieldInfo;
  }, {});
  return yieldInfo;
};

module.exports = {
  getFiiHeaderValues,
  getTaxes,
  getYield,
  getLastRevenue,
  getFiiLastUpdates,
};
