const { Router } = require('express');
const {
  fiiHeadersRequest,
  getFiiData,
} = require('../../services/requestInformation');

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


fiiRouter.get('/:fiiCode', async (request, response) => {
  try {
    const { fiiCode } = request.params;

    const fiiData = await fiiHeadersRequest(fiiCode);

    return response.json(fiiData);
  }catch(err){
    return response.status(400).json({error: err.message})
  }
});

module.exports = fiiRouter;