const Sequalize=require('sequalize');
const sequalize=require('../util/database');
const { type } = require('express/lib/response');

const Product=sequalize.define('product',{
  id:{
    type:Sequalize.INTEGER,
    autoincrement:true,
    alllownull:false,
    primarykey:true
  },
  title: Sequalize.STRING,
  price:{
    type:Sequalize.DOUBLE,
    alllownull:false,
  },
  imageUrl: {
    
    type:Sequalize.STRING,
  alllownull:false
},
description:{
  type:Sequalize.STRING,
  alllownull:false
}
})

module.exports=Product;



// const db=require('../util/database')

// module.exports = class Product {
//   constructor(id, title, imageurl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imageurl = imageurl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     return db.execute('insert into products (title, price,imageUrl,description) values (?,?,?,?)',
//       [this.title,this.price,this.imageurl,this.description]
//     )
//   }

//   static deleteById(id) {
    
//   }

//   static fetchAll(cb) {
//    return db.execute('select *from products') ;
//   }

//   static findById(id) {
//     return db.execute('select *from products where products.id =?',[id]);
// };
// }

// // const { json } = require("body-parser");
// // const fs = require("fs");
// // const path = require("path");

// // // const cart = require("./cart");
// // let products = [];
// // const Cart = require("./cart");
// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   "data",
// //   "product.json"
// // );
// // const getproductfromfile = (cb) => {
// //   const p = path.join(
// //     path.dirname(require.main.filename),
// //     "data",
// //     "product.json"
// //   );

// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       return cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //     // catch (e) {
// //     // If JSON parsing fails, return an empty array
// //     //   return cb([]);
// //   });
// // };

// // module.exports = class Product {
// //   constructor(id, title, _imageurl, price, description) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageurl = this.imageurl;
// //     this.price = price;

// //     this.description = description;
// //   }

// //   save() {
// //     getproductfromfile((products) => {
// //       if (this.id) {
// //         const existingProductindex = products.findIndex(
// //           (prod) => prod.id === this.id
// //         );
// //         const updatedProduct = [...products];
// //         updatedProduct[existingProductindex] = this;
// //         fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// //           console.log(err);
// //         });
// //       } else {
// //         this.id = Math.random().toString();

// //         products.push(this);
// //         fs.writeFile(p, JSON.stringify(products), (err) => {
// //           console.log(err);
// //         });
// //       }
// //     });
// //   }

// //   static deletebyid(id) {
// //     getproductfromfile((products) => {
// //       const product = products.find((prod) => prod.id === id);
// //       const updatedProduct = products.findIndex((p) => p.id === id);
// //       fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// //         if (!err) {
// //           Cart.deleteproduct(id, product.price);
// //         }
// //       });
// //     });
// //   }

// //   static fetchAll(cb) {
// //     getproductfromfile(cb);
// //   }

// //   static findbyid(id, cb) {
// //     getproductfromfile((products) => {
// //       const product = products.find((p) => p.id === id);
// //       cb(product);
// //     });
// //   }
// // };

// // // const products = [];
// // const { json } = require("body-parser");
// // const fs = require("fs");
// // const path = require("path");

// // module.exports = class Product {
// //   constructor(t) {
// //     this.title = t;
// //   }

// //   save() {
// //     // products.push(this);

// //     const p = path.join(
// //       path.dirname(require.main.filename),
// //       "data",
// //       "product.json"
// //     );
// //     fs.readFile(p, (err, fileContent) => {
// //       let products = [];
// //       if (!err) {
// //         products = JSON.parse(fileContent);
// //       }
// //       products.push(this);
// //       fs.writeFile(p, JSON.stringify(products), (err) => {
// //         console.log(err);
// //       });
// //       //   console.log(fileContent);
// //     });
// //   }

// //   static fetchAll(cb) {
// //     const p = path.join(
// //       path.dirname(require.main.filename),
// //       "data",
// //       "product.json"
// //     );
// //     fs.readFile(p, (err, fileContent) => {
// //       if (err) {
// //         cb([]);
// //         return;
// //       }
// //       try {
// //         cb(JSON.parse(fileContent));
// //       } catch (e) {
// //         cb([]);
// //       }
// //     });
// //   }
// // };
