const fs = require('fs').promises;
const { join } = require('path');

const readCacauTrybeFile = async () => {
  const path = '/files/cacauTrybeFile.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllChocolates = async () => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates;
};

const getChocolateById = async (id) => {
  const cacauTrybe = await readCacauTrybeFile();
  const chocolate = cacauTrybe.chocolates.find((element) => element.id === id);

  return chocolate;
};

const getChocolateByBrandId = async (brandId) => {
  const cacauTrybe = await readCacauTrybeFile();
  const chocolates = cacauTrybe.chocolates.filter((element) => element.brandId === brandId);

  return chocolates;
};

module.exports = {
  getAllChocolates,
  getChocolateById,
  getChocolateByBrandId
};