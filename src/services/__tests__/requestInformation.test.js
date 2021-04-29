const request = require('../requestInformation');

describe('clubeFiisRequest Tests', () => {
  it('Should have the expect length', async () => {
    const response = await request.clubeFiisRequest('irdm11');

    const objectKeys = Object.keys(response);

    expect(objectKeys.length).toBe(2);
  });

  it('Should contain the expected keys', async () => {
    const response = await request.clubeFiisRequest('irdm11');

    const objectKeys = Object.keys(response);

    expect(objectKeys).toContain('taxes');
    expect(objectKeys).toContain('yield');
  });
});

describe('fiisRequest Tests', () => {
  it('Should have the expect length', async () => {
    const response = await request.fiisPageRequest('irdm11');

    const objectKeys = Object.keys(response);

    expect(objectKeys.length).toBe(2);
  });

  it('Should contain the expected keys', async () => {
    const response = await request.fiisPageRequest('irdm11');

    const objectKeys = Object.keys(response);

    expect(objectKeys).toContain('lastRevenue');
    expect(objectKeys).toContain('fiiLastUpdates');
  });
});

describe('fiiHeadersRequest Tests', () => {
  it('Should have the expect length', async () => {
    const { headers } = await request.fiiHeadersRequest('irdm11');

    const objectKeys = Object.keys(headers);

    expect(objectKeys.length).toBe(8);
  });

  it('Should contain the expected keys', async () => {
    const { headers } = await request.fiiHeadersRequest('irdm11');

    const objectKeys = Object.keys(headers);

    expect(objectKeys).toContain('segment');
    expect(objectKeys).toContain('dateIPO');
    expect(objectKeys).toContain('valueIPO');
    expect(objectKeys).toContain('manager');
    expect(objectKeys).toContain('mandate');
    expect(objectKeys).toContain('averageLiquity30Days');
    expect(objectKeys).toContain('quotesVolume');
    expect(objectKeys).toContain('ifix');
  });
});
