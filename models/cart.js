const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Cart=sequelize.define('cart',{
  id:{
    type:Sequelize.INTEGER,
    autoincrement:true,
    allownull:false,
    primarykey:true
  }
})


module.exports=Cart;







// const fs = require("fs");
// const path = require("path");

// const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         try {
//           cart = JSON.parse(fileContent);
//           // if (!cart.products) cart.products = [];
//           // if (!cart.totalPrice) cart.totalPrice = 0;
//         } catch (parseError) {
//           console.error("Error parsing JSON: ", parseError);
//         }
//       }

//       // Analyze the cart => find existing product
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;

//       // Add new product / increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice;

//       fs.writeFile(p, JSON.stringify(cart), (writeErr) => {
//         if (writeErr) {
//           console.error("Error writing file: ", writeErr);
//         }
//       });
//     });
//   }

//   static deleteproduct(id, productprice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatecart = { ...JSON.parse(fileContent) };
//       const product = updatecart.product.find((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productqty = product.qty;
//       updatecart.products = updatecart.products.filter(
//         (prod) => prod.id !== id
//       );
//       updatecart.totalPrice = updatecart.totalPrice - productprice * productqty;
//       fs.writeFile(p, JSON.stringify(updatecart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static getcart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };

// // const fs = require("fs");
// // const path = require("path");

// // const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

// // module.exports = class cart {
// //   static addproduct(id, productprice) {
// //     fs.readFile(p, (err, filecontent) => {
// //       let cart = { products: [], totalprice: 0 };
// //       if (!err) {
// //         cart = JSON.parse(filecontent);
// //       }
// //       //Analyze the cart => find existing product
// //       const existingproductIndex = cart.products.findIndex(
// //         (prod) => prod.id === id
// //       );
// //       const existingproduct = cart.products[existingproductIndex];
// //       let updateproduct;

// //       //add new product /increase quantity
// //       if (existingproduct) {
// //         updateproduct = { ...existingproduct };
// //         updateproduct.qty = updateproduct.qty + 1;
// //         cart.products = [...cart.products];
// //         cart.products[existingproductIndex] = updateproduct;
// //       } else {
// //         updateproduct = { id: id, qty: 1 };
// //         cart.products = [...cart.products, updateproduct];
// //       }
// //       cart.totalprice = cart.totalprice + productprice;
// //       fs.writeFile(p, JSON.stringify(cart), (err) => {
// //         console.log(err);
// //       });
// //     });
// //   }
// // };
