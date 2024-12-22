import Product  from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){


  // check if user is admin to crate products
  if(!isAdmin(req)){
    res.json({
      message: "Please login as administrator to add products"
    })
    return
  }

  const newProductData = req.body

  const product = new Product(newProductData)

  product.save().then(()=>{
    res.json({
      message: "Product created"
    })
  }).catch((error)=>{
    res.json({
      message: error //send error to front end
    })
  })
}

export function getProducts(req, res) {
  Product.find({})
    .then((products) => {
      res.json(products); // Send the product list as a response
    })
    .catch((error) => {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal Server Error' }); // Send a 500 status code with an error message
    });
}


// Update product function
export function updateProduct(req, res) {
  // Check if user is admin to update products
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as administrator to update products"
    });
    return;
  }

  const { productId } = req.params; // Assuming productId is passed as a URL parameter
  const updatedProductData = req.body;

  Product.findOneAndUpdate({ productId }, updatedProductData, { new: true, runValidators: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        res.status(404).json({
          message: "Product not found"
        });
        return;
      }
      res.json({
        message: "Product updated",
        product: updatedProduct
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error // Send error to front end
      });
    });
}

// Delete product function
export function deleteProduct(req, res) {
  // Check if user is admin to delete products
  if (!isAdmin(req)) {
    res.json({
      message: "Please login as administrator to delete products"
    });
    return;
  }

  const { productId } = req.params; // Assuming productId is passed as a URL parameter

  Product.findOneAndDelete({ productId })
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({
          message: "Product not found"
        });
        return;
      }
      res.json({
        message: "Product deleted",
        product: deletedProduct
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: error // Send error to front end
      });
    });
}

