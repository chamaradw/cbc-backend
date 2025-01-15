import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({ message: "Please login as an administrator to add products" });
    return;
  }

  const newProductData = req.body;

  try {
    const product = new Product(newProductData);
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      res.status(404).json({ message: "No products found." });
      return;
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// export async function updateProduct(req, res) {
//   if (!isAdmin(req)) {
//     res.status(401).json({ message: "Please login as an administrator to update products" });
//     return;
//   }

//   const { productId } = req.params;
//   const updatedProductData = req.body;

//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedProduct) {
//       res.status(404).json({ message: "Product not found" });
//       return;
//     }

//     res.status(200).json({ message: "Product updated", product: updatedProduct });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(401).json({ message: "Please login as an administrator to update products" });
    return;
  }

  const { productId } = req.params;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate({ productId }, updatedProductData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated", product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export async function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Please login as an administrator to delete products" });
    return;
  }

  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getProductsById(req, res) {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
