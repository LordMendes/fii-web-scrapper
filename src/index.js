const puppeteer = require('puppeteer');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const $ = require('cheerio');

const url = 'https://fiis.com.br/';
const fiis = ['irdm11','ctps11','rbrf11'];

const getHtml = async (browser) => {
  const page = await browser.newPage();
  const searchUrl = url+fiis[0];
  console.log('url -> ',searchUrl)
  return page.goto(searchUrl).then(function() {
    return page.content();  
  })
}

const getFiiHeaderValues = (html) => {
  let headerListValue=[];
  let headerListTitle=[];
  $('#informations--indexes .item .value', html).each(function() {
    headerListValue.push($(this).text().split(' ').join(' '));
  });
  $('#informations--indexes .item .title', html).each(function() {
    headerListTitle.push($(this).text().split(' ').join(' '));
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

function request(url, action) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
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
  const administratorInfo = await request(url+fiis[0], getAdministratorInfo)
  const headerValues = await request(url+fiis[0], getFiiHeaderValues)
  console.log(administratorInfo);
  console.log(headerValues);
}



run();
