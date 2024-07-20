const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productSchema=new Schema({
  title:{
    type:String,
    required:true
  },
  price: {
    type:Number,
    required:true
  },
  description: {
    type:String,
    required:true
  },
  imageUrl: {
    type:String,
    required:true
  },
  userid:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});
module.exports=mongoose.model('Product',productSchema)



// // import { ObjectId } from 'mongodb';
// const mongodb=require('mongodb');
// const user = require('./user');
// class Product{
//   constructor(title,price,description,imageUrl,id,userid){
//     this.title=title;
//     this.price=price;
//     this.description=description;
//     this.imageUrl=imageUrl;
//     this._id= id ? new mongodb.ObjectId(id):null;
//     this.userid=userid;


//   }

//   save(){
//     const db=getdb();
//     let dbop;
//     if(this._id){
//       dbop=db
//       .collection('products')
//       .updateOne({_id :this._id},{$set:this});

//     }
//     else{
//       dbop=db.collection('products').insertOne(this);
//     }
//     return dbop
//     .then(result =>{
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

  // static fetchall(){
  //   const db=getdb();
  //   return db.collection('products')
  //   .find()
  //   .toArray()
  //   .then((products) => {
  //     console.log(products)
  //     return products;
      
  //   }).catch((err) => {
  //     console.log(err)
      
  //   });
  // }


// static findById(proId){
//   const db=getdb();
//   return db.collection('products')
//   .find({_id:new  mongodb.ObjectId(proId)})
//   .next()
//   .then((product) => {
//     console.log(product);
//     return product;
    
//   }).catch((err) => {
//     console.log(err);
    
//   });
// }
// static deletebyid(proid){
//   const db=getdb();
//   return db
//   .collection('products')
//   .deleteOne({_id: new mongodb.ObjectId(proid)})
//   .then((result) => {
//     console.log('Deleted') 
//   }).catch((err) => {
//     console.log(err)
//   });
// }
// }

// module.exports=Product;



// // const db=require('../util/database')

// // module.exports = class Product {
// //   constructor(id, title, imageurl, price, description) {
// //     this.id = id;
// //     this.title = title;
// //     this.imageurl = imageurl;
// //     this.price = price;
// //     this.description = description;
// //   }

// //   save() {
// //     return db.execute('insert into products (title, price,imageUrl,description) values (?,?,?,?)',
// //       [this.title,this.price,this.imageurl,this.description]
// //     )
// //   }

// //   static deleteById(id) {
    
// //   }

// //   static fetchAll(cb) {
// //    return db.execute('select *from products') ;
// //   }

// //   static findById(id) {
// //     return db.execute('select *from products where products.id =?',[id]);
// // };
// // }

// // // const { json } = require("body-parser");
// // // const fs = require("fs");
// // // const path = require("path");

// // // // const cart = require("./cart");
// // // let products = [];
// // // const Cart = require("./cart");
// // // const p = path.join(
// // //   path.dirname(require.main.filename),
// // //   "data",
// // //   "product.json"
// // // );
// // // const getproductfromfile = (cb) => {
// // //   const p = path.join(
// // //     path.dirname(require.main.filename),
// // //     "data",
// // //     "product.json"
// // //   );

// // //   fs.readFile(p, (err, fileContent) => {
// // //     if (err) {
// // //       return cb([]);
// // //     } else {
// // //       cb(JSON.parse(fileContent));
// // //     }
// // //     // catch (e) {
// // //     // If JSON parsing fails, return an empty array
// // //     //   return cb([]);
// // //   });
// // // };

// // // module.exports = class Product {
// // //   constructor(id, title, _imageurl, price, description) {
// // //     this.id = id;
// // //     this.title = title;
// // //     this.imageurl = this.imageurl;
// // //     this.price = price;

// // //     this.description = description;
// // //   }

// // //   save() {
// // //     getproductfromfile((products) => {
// // //       if (this.id) {
// // //         const existingProductindex = products.findIndex(
// // //           (prod) => prod.id === this.id
// // //         );
// // //         const updatedProduct = [...products];
// // //         updatedProduct[existingProductindex] = this;
// // //         fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// // //           console.log(err);
// // //         });
// // //       } else {
// // //         this.id = Math.random().toString();

// // //         products.push(this);
// // //         fs.writeFile(p, JSON.stringify(products), (err) => {
// // //           console.log(err);
// // //         });
// // //       }
// // //     });
// // //   }

// // //   static deletebyid(id) {
// // //     getproductfromfile((products) => {
// // //       const product = products.find((prod) => prod.id === id);
// // //       const updatedProduct = products.findIndex((p) => p.id === id);
// // //       fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
// // //         if (!err) {
// // //           Cart.deleteproduct(id, product.price);
// // //         }
// // //       });
// // //     });
// // //   }

// // //   static fetchAll(cb) {
// // //     getproductfromfile(cb);
// // //   }

// // //   static findbyid(id, cb) {
// // //     getproductfromfile((products) => {
// // //       const product = products.find((p) => p.id === id);
// // //       cb(product);
// // //     });
// // //   }
// // // };

// // // // const products = [];
// // // const { json } = require("body-parser");
// // // const fs = require("fs");
// // // const path = require("path");

// // // module.exports = class Product {
// // //   constructor(t) {
// // //     this.title = t;
// // //   }

// // //   save() {
// // //     // products.push(this);

// // //     const p = path.join(
// // //       path.dirname(require.main.filename),
// // //       "data",
// // //       "product.json"
// // //     );
// // //     fs.readFile(p, (err, fileContent) => {
// // //       let products = [];
// // //       if (!err) {
// // //         products = JSON.parse(fileContent);
// // //       }
// // //       products.push(this);
// // //       fs.writeFile(p, JSON.stringify(products), (err) => {
// // //         console.log(err);
// // //       });
// // //       //   console.log(fileContent);
// // //     });
// // //   }

// // //   static fetchAll(cb) {
// // //     const p = path.join(
// // //       path.dirname(require.main.filename),
// // //       "data",
// // //       "product.json"
// // //     );
// // //     fs.readFile(p, (err, fileContent) => {
// // //       if (err) {
// // //         cb([]);
// // //         return;
// // //       }
// // //       try {
// // //         cb(JSON.parse(fileContent));
// // //       } catch (e) {
// // //         cb([]);
// // //       }
// // //     });
// // //   }
// // // };
