const puppeteer = require('puppeteer');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const $ = require('cheerio');

const urlFiis = 'https://fiis.com.br/';
const urlFundsExplorer = 'https://www.fundsexplorer.com.br/funds/';

const fiis = ['irdm11','ctps11','rbrf11'];


const getFiiHeaderValues = (html) => {
  let headerListValue=[];
  let headerListTitle=[];
  $('.carousel-cell .indicator-title', html).each(function() {
    headerListTitle.push($(this).text().split('\n').join(' '));    
  });
  $('.carousel-cell .indicator-value', html).each(function() {
    headerListValue.push($(this).text().split('\n').join(' ').replace(/\s/g, ''));
  });
  let header = {};
  headerListTitle.forEach((key, index) => header[key] = headerListValue[index])
  return header;
}

const getAdministratorInfo = (html) => {
  let administrator = {name: '', cnpj: ''};
  $('#informations--admin .administrator-name', html).each(function() {
   administrator.name = $(this).text();
  });
  $('#informations--admin .administrator-doc', html).each(function() {
    administrator.cnpj = $(this).text();
  });
  return administrator;
}

const getLastRevenue = (html) => {
  let rawLastRevenueList = [];
  let lastRevenueList = [];
  $('#last-revenues--table tbody', html).each(function() {
    rawLastRevenueList = $(this).text().split('\n').filter(item => !!item);
  });
  for(let i = 0 ; i<rawLastRevenueList.length ; i+=5){
    lastRevenueList.push({
      baseDate: rawLastRevenueList[i],
      paymentDate: rawLastRevenueList[i+1],
      baseQuotation: rawLastRevenueList[i+2],
      dividendYeld: rawLastRevenueList[i+3],
      revenue: rawLastRevenueList[i+4]
    })
  }
  return lastRevenueList;
}

const getFiiLastUpdates = (html) => {
  let updateNewsList =[];
  let updateNewsListLink = [];
  let updateNewsListTitle = [];
  let updateNewsListDate = [];

  $('#news--wrapper .date', html).each(function() {
    updateNewsListDate.push($(this).text());
  });
  $('#news--wrapper .title', html).each(function() {
    updateNewsListTitle.push($(this).text());
  });
  $('#news--wrapper a', html).each(function() {
    updateNewsListLink.push($(this).attr('href'))
  });

  updateNewsListTitle.forEach((title, index) => {
    updateNewsList.push({
      title,
      date: updateNewsListDate[index],
      link: updateNewsListLink[index] === 'javascript:;' ? null : updateNewsListLink[index]
    })
  })

  return updateNewsList;
}


function request(url, fiiCode, action) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url+fiiCode, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        var html = xhr.responseText;
        var res = action(html)
        xhr.status == 200 ? resolve(res) : reject('error');
      }
    }
  });
}


const run = async () => {
  const administratorInfo = await request(urlFiis, fiis[0], getAdministratorInfo)
  const headerValues = await request(urlFundsExplorer, fiis[0], getFiiHeaderValues)
  const lastRevenue = await request(urlFiis, fiis[0], getLastRevenue)
  const fiiUpdate = await request(urlFiis, fiis[0], getFiiLastUpdates)
  console.log(headerValues)
}



run();
