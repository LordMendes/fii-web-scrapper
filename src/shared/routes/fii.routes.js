const { Router } = require('express');
const {
  fiiHeadersRequest,
  getFiiData,
  getAllData,
} = require('../../services/requestInformation');
const {getGSheetJson} = require('../../services/gSheetsJson')

const fiiRouter = Router();

fiiRouter.get('/data/:fiiCode', async (request, response) => {
  try {
    const { fiiCode } = request.params;

    const fiiData = await getFiiData(fiiCode);

    return response.json(fiiData);
  }catch(err){
    return response.status(400).json({error: err.message})
  }
});

fiiRouter.get('/all/:fiiCode', async (request, response) => {
  try {
    const { fiiCode } = request.params;

    const fiiData = await getAllData(fiiCode);

    return response.json(fiiData);
  }catch(err){
    return response.status(400).json({error: err.message})
  }
});


fiiRouter.get('/:fiiCode', async (request, response) => {
    console.log('ok')
    try {
    const { fiiCode } = request.params;
    const fiiData = await fiiHeadersRequest(fiiCode);

    return response.json(fiiData);
  }catch(err){
    return response.status(400).json({error: err.message})
  }
});


fiiRouter.get('/gsheet/:fiiCode', async (request, response) => {
  try {
    const { fiiCode } = request.params;

    const fiiData = await getGSheetJson(fiiCode);

    return response.json(fiiData);
  }catch(err){
    return response.status(400).json({error: err.message})
  }
});

module.exports = fiiRouter;