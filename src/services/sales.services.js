const { productModel, salesModel } = require('../models');

const addNewSale = async (sales) => {
  const verifySales = await Promise.all(
    sales.map((sale) => productModel.getById(sale.productId)),
  );
  const validate = verifySales.some((sale) => sale === undefined);
  if (validate) return { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };

  const newSale = await salesModel.addNewSale(sales);

  return { type: null, message: newSale };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length <= 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length <= 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  const result = await salesModel.deleteSale(id);

  return { type: null, message: result };
};

const updateSale = async (sales, id) => {
  const validateProduct = await Promise.all(
    sales.map((sale) => productModel.getById(sale.productId)),
  );
  const validateSale = await salesModel.isoledSale(id);
  const validate = validateProduct.some((sale) => sale === undefined);
  if (validate) return { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };
  if (!validateSale) return { type: 'SALE_NOT_FOUD', message: 'Sale not found' };
  const newSale = await salesModel.updateSale(sales, id);
  return { type: null, message: newSale };
};

module.exports = {
  addNewSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};