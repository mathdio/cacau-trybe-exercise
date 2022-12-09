const express = require('express');
const cacauTrybe = require('./cacauTrybe');

const app = express();

app.use(express.json())

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();
  res.status(200).json({ chocolates });
});

app.get('/chocolates/total', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();

  res.status(200).json({ totalChocolates: chocolates.length });
});

app.get('/chocolates/search', async (req, res) => {
  const { name } = req.query;
  const chocolates = await cacauTrybe.getChocolatesByName(name);

  if (chocolates.length === 0) {
    res.status(404).json({ message: 'Chocolates not found' });
  }

  res.status(200).json(chocolates);
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const chocolate = await cacauTrybe.getChocolateById(Number(id));

  if (!chocolate) {
    res.status(404).json({ message: 'Chocolate not found' });
  }
  res.status(200).json({ chocolate });
});

app.put('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const { name, brandId } = req.body;
  const updatedChocolate = await cacauTrybe.updateChocolate(Number(id), { name, brandId });

  if (!updatedChocolate) {
    res.status(404).json({ message: 'Chocolate not found' });
  }

  res.status(200).json({ chocolate: updatedChocolate });
});

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacauTrybe.getChocolateByBrandId(Number(brandId));

  res.status(200).json({ chocolates });
});

module.exports = app;