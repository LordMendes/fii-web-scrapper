  const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'https://fiis.com.br/';
const fiis = ['irdm11','ctps11','rbrf11'];

const getHtml = async (browser) => {
  const page = await browser.newPage();
  const searchUrl = url+fiis[0];
  console.log(searchUrl)
  return page.goto(searchUrl).then(function() {
    return page.content();  
  })
}

const getContent = async (html) => {
  $('#informations--indexes', html).each(function() {
    console.log($(this).text());
  });
}

const run = async () => {
  const browser = await puppeteer.launch();
  const html = await getHtml(browser)
  const response = await getContent(html);
  console.log(response)

}


run();
