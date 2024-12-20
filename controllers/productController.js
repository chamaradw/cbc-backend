import Product  from "../models/product.js";
import { isadmin } from "./userController.js";

export async function getProduct(req,res){

  try{
    const productList = await Product.find()

    res.json({
      list : productList
    })
    console.log(productList)
  }catch(e){
    res.json({
      message : "Error"
    })
  }


}

export function createProduct(req,res){

  if(!isadmin(req)){
    res.json({
      message : "Pleae login as an admin to create a product"
    })
  }

  console.log(req.user)

  if(req.user == null){
    res.json({
      message : "You are not logged in"
    })
    return
  }

  

  const product = new Product(req.body)

  product.save().then(()=>{
    res.json({
      message: "Product created"
    })
  }).catch(()=>{
    res.json({
      message:Error
      
    
    })
  })
}

export function deleteProduct(req,res){

  Product.deleteOne({name : req.params.name}).then(
    ()=>{
      res.json(
        {
          message : "Product deleted successfully"
        }
      )
    }
  ).catch(
    ()=>{
      res.json(
        {
          message : "Product not deleted"
        }
      )
    }
  )
}

export function getProductByName(req,res){

  const name = req.params.name;

  Product.find({name : name}).then(

    (productList)=>{

      if(productList.length == 0){
        res.json({
          message : "Product not found"
        })
      }else{
        res.json({
          list : productList
        })
        
      }

      
    }
  ).catch(
    ()=>{
      res.json({
        message : "Product not found"
      })
    }
  )

}