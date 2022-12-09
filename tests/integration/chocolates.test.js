const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const sinon = require("sinon");
const fs = require("fs");

chai.use(chaiHttp);

const { expect } = chai;

const mockFile = JSON.stringify({
  brands: [
    {
      id: 1,
      name: "Lindt & Sprungli",
    },
    {
      id: 2,
      name: "Ferrero",
    },
    {
      id: 3,
      name: "Ghirardelli",
    },
  ],
  chocolates: [
    {
      id: 1,
      name: "Mint Intense",
      brandId: 1,
    },
    {
      id: 2,
      name: "White Coconut",
      brandId: 1,
    },
    {
      id: 3,
      name: "Mon Chéri",
      brandId: 2,
    },
    {
      id: 4,
      name: "Mounds",
      brandId: 3,
    },
  ],
});

const mockFileUpdated = {
  "brands": [
    {
      "id": 1,
      "name": "Lindt & Sprungli"
    },
    {
      "id": 2,
      "name": "Ferrero"
    },
    {
      "id": 3,
      "name": "Ghirardelli"
    }
  ],
  "chocolates": [
    {
      "id": 1,
      "name": "Mint Pretty Good",
      "brandId": 2
    },
    {
      "id": 2,
      "name": "White Coconut",
      "brandId": 1
    },
    {
      "id": 3,
      "name": "Mon Chéri",
      "brandId": 2
    },
    {
      "id": 4,
      "name": "Mounds",
      "brandId": 3
    }
  ]
};

describe("Testando a API Cacau Trybe", function () {
  beforeEach(function () {
    sinon.stub(fs.promises, 'readFile').resolves(mockFile);
  });

  afterEach(function () {
    sinon.restore();
  });
});

describe("usando metódo GET em /chocolates", function () {
  it("retorna lista completa de chocolates", async function () {
    const response = await chai.request(app).get("/chocolates");
    expect(response.status).to.be.equal(200);

    const output = [
      { id: 1, name: "Mint Intense", brandId: 1 },
      { id: 2, name: "White Coconut", brandId: 1 },
      { id: 3, name: "Mon Chéri", brandId: 2 },
      { id: 4, name: "Mounds", brandId: 3 },
    ];
    expect(response.body.chocolates).to.deep.equal(output);
  });
});

describe('usando método GET em /chocolates/:id para buscar o ID 4', function () {
  it('retorna o chocolate Mounds', async function () {
    const response = await chai.request(app).get('/chocolates/4');
    expect(response.status).to.be.equal(200);

    expect(response.body.chocolate).to.deep.equal(
      {
        "id": 4,
        "name": "Mounds",
        "brandId": 3
      });
  });
});

describe('usando método GET em /chocolates/:id para buscar o ID 99', function () {
  it('retorna status 404 com a mensagem "Chocolate not found"', async function () {
    const response = await chai.request(app).get('/chocolates/99');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Chocolate not found' });
  });
});

describe('usando método GET em /chocolates/brand/:brandId para buscar brandId 1', function () {
  it('retorna os chocolates da marca Lindt & Sprungli', async function () {
    const response = await chai.request(app).get('/chocolates/brand/1');
    expect(response.status).to.be.equal(200);

    const output = [
      {
          "id": 1,
          "name": "Mint Intense",
          "brandId": 1
      },
      {
          "id": 2,
          "name": "White Coconut",
          "brandId": 1
      }
    ];
    expect(response.body.chocolates).to.deep.equal(output);
  });
});

describe('usando método GET em /chocolates/total para buscar a quantidade total de chocolates', function () {
  it('retorna 4 como quantidade total de chocolates', async function () {
    const response = await chai.request(app).get('/chocolates/total');
    expect(response.status).to.be.equal(200);

    const output = {
      totalChocolates: 4
    };
    expect(response.body).to.deep.equal(output);
  });
});

describe('usando método GET em /chocolates/search para buscar chocolates com o termo "Mo"', function () {
  it('retornar os chocolates que contém o termo "Mo"', async function () {
    const response = await chai.request(app).get('/chocolates/search?name=Mo');
    expect(response.status).to.be.equal(200);

    const output = [
      {
        "id": 3,
        "name": "Mon Chéri",
        "brandId": 2
      },
      {
        "id": 4,
        "name": "Mounds",
        "brandId": 3
      }
    ];
    expect(response.body).to.deep.equal(output);
  });
});

describe('usando método GET em /chocolates/search para buscar chocolates com o termo "Ma"', function () {
  it('retorna status 404 com a mensagem "Chocolates not found"', async function () {
    const response = await chai.request(app).get('/chocolates/search?name=Ma');
    expect(response.status).to.be.equal(404);

    const output = {
      message: 'Chocolates not found'
    };
    expect(response.body).to.deep.equal(output);
  });
});

describe('usando método PUT em /chocolates/:id para atualizar o chocolate de ID 1', function () {
  it('retorna informações atualizadas do chocolate', async function () {
    const response = await chai
      .request(app)
      .put('/chocolates/1')
      .send({ 
        "name": "Mint Pretty Good",
        "brandId": 2
      });
    expect(response.status).to.be.equal(200);

    const output = {
      "chocolate": { 
        "id": 1,
        "name": "Mint Pretty Good",
        "brandId": 2
      }
    };
    expect(response.body).to.deep.equal(output);
  });
});

describe('usando método PUT em /chocolates/:id para atualizar o chocolate de ID 99', function () {
  it('retorna status 404 com a mensagem "Chocolate not found"', async function () {
    const response = await chai
      .request(app)
      .put('/chocolates/99')
      .send({ 
        "name": "Mint Pretty Good",
        "brandId": 2
      });
    expect(response.status).to.be.equal(404);

    const output = { message: 'Chocolate not found' };
    expect(response.body).to.deep.equal(output);
  });
});