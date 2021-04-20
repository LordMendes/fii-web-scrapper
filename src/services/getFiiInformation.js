const $ = require('cheerio');

const DEPRECATED_getFiiHeaderValues = (html) => {
  let headerListValue = [];
  let headerListTitle = [];
  // $('.carousel-cell .indicator-title', html).each(function() {
  //   headerListTitle.push($(this).text().split('\n').join(' '));
  // });
  // $('.carousel-cell .indicator-value', html).each(function() {
  //   headerListValue.push($(this).text().split('\n').join(' ').replace(/\s/g, ''));
  // });

  $('div', html).each(function () {
    console.log($(this).text());
  });
  $('#primaryTable tr td', html).each(() => {
    // headerListTitle.push($(this).text().split('\n').join(' '));
  });
  let header = {};
  headerListTitle.forEach(
    (key, index) => (header[key] = headerListValue[index]),
  );
  return header;
};

const BETA_getFiiHeaderValues = (html) => {
  let headerListValue = [];
  let headerListTitle = [
    'segment',
    'dateIPO',
    'valueIPO',
    'manager',
    'mandate',
    'avarageLiuity30Days',
    'quotesVolume',
    'ifix',
  ];

  $('#primaryTable tr td', html).each(function () {
    headerListValue.push($(this).text().split('\n').join(' '));
  });
  let header = {};
  headerListTitle.forEach(
    (key, index) => (header[key] = headerListValue[index]),
  );
  console.log(header);
  return header;
};

const DEPRECATED_getAdministratorInfo = (html) => {
  let administrator = { name: '', cnpj: '' };
  $('#informations--admin .administrator-name', html).each(function () {
    administrator.name = $(this).text();
  });
  $('#informations--admin .administrator-doc', html).each(function () {
    administrator.cnpj = $(this).text();
  });
  return administrator;
};

const getLastRevenue = (html) => {
  let rawLastRevenueList = [];
  let lastRevenueList = [];
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
  let updateNewsList = [];
  let updateNewsListLink = [];
  let updateNewsListTitle = [];
  let updateNewsListDate = [];

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

const BETA_getTaxes = (html) => {
  let taxesValues = [];
  let taxesTitles = [
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

const BETA_getYield = (html) => {
  let yieldTitles = [
    'oneMonthYield',
    'threeMonthYield',
    'sixMonthYield',
    'twelveMonthYield',
    'pvpa',
    'patrimonialValue',
    'marketValue',
  ];
  let yieldValues = [];
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
  BETA_getFiiHeaderValues,
  BETA_getTaxes,
  BETA_getYield,
  getLastRevenue,
  getFiiLastUpdates,
};
