const {productModel} = require('../model/Model');

//--------------------------------------------------------------------------------list Product
const listProduct = async (req, resp) => {
  try {
    const products = await productModel.find();
    if (products.length > 0) {
      resp.status(200).send(products);
    } else {
      resp.status(404).send({ result: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    resp.status(500).send({ error: "An error occurred while fetching products" });
  }
};
 
//--------------------------------------------------------------------------------create Product
const createProduct = (req, resp) => {
  productModel.create(req.body)
    .then(add => {
      resp.status(200).json(add);
    })
    .catch(err => resp.status(500).json(err))
};

//--------------------------------------------------------------------------------Get update Product
const GetupdateProduct = async (req, resp) => {
  let result = await productModel.findOne({ _id: req.params.id });
  if (result) {
    return resp.send(result);
  } else {
    resp.send({ result: "No product found" });
  }
};

//--------------------------------------------------------------------------------update Product
const updateProduct = async (req, resp) => {
  let result = await productModel.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
};

//--------------------------------------------------------------------------------delete Product
const deleteProduct = async (req, resp) => {
  let result = await productModel.deleteOne({ _id: req.params.id });
  resp.send(result);
}

module.exports = { listProduct, createProduct, GetupdateProduct, updateProduct, deleteProduct };


