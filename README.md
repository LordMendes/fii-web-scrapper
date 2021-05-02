# Fii Web Scrapper
<div>
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/>
</div>


This app is an web scrapper made to retrieve fii data from selected web sites.


## Running

Clone this repository 
```git
git clone git@github.com:LordMendes/fii-web-scrapper.git
cd fii-web-scrapper
```
After enter the project run
```git
yarn
```
to install project's dependencies, then you can run
```
yarn start
```
to start the project.

## Testing

To run the tests:
```
yarn test
```

## Routes

| Method | Route |
| ------ | ------ |
| GET | /fii/:FIICODE |
| GET | /fii/data/:FIICODE |

## Tecnologies

For this project I used:

- NodeJs 
- Express.JS
- Cheerio
