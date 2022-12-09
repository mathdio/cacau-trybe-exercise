const fs = require('fs').promises;
const { join } = require('path');
const path = '/files/cacauTrybeFile.json';

const readCacauTrybeFile = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const writeCacauTrybeFile = async (content) => {
  try {
    const filePath = join(__dirname, path);
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const updateChocolate = async (id, contentToUpdate) => {
  const cacauTrybe = await readCacauTrybeFile();
  const chocolateToUpdate = cacauTrybe.chocolates.find((chocolate) => chocolate.id === id);

  if (chocolateToUpdate) {
    cacauTrybe.chocolates = cacauTrybe.chocolates.map((chocolate) => {
      if (chocolate.id === id) {
        return { ...chocolate, ...contentToUpdate };
      }
      return chocolate;
    });

    await writeCacauTrybeFile(cacauTrybe);
    return { ...chocolateToUpdate, ...contentToUpdate };
  }

  return false;
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

const getChocolatesByName = async (name) => {
  const cacauTrybe = await readCacauTrybeFile();
  const chocolates = cacauTrybe.chocolates.filter((chocolate) => chocolate.name.toLowerCase().includes(name.toLowerCase()));

  return chocolates;
};

module.exports = {
  getAllChocolates,
  getChocolateById,
  getChocolateByBrandId,
  getChocolatesByName,
  updateChocolate
};