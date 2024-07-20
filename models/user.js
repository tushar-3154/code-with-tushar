const mongoose = require('mongoose');
const products = require('./products');
const Schema = mongoose.Schema;

const userschema = new Schema({

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resettoken: String,
    resettokenexpiration: Date,
    cart: {
        items: [
            {
                productid: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

userschema.methods.addtocart = function (product) {
    const cartproductindex = this.cart.items.findIndex(cp => {
        return cp.productId.tostring() === product._id.tostring();
    });
    let newquantity = 1;
    const updatecartitem = [...this.cart.items];


    if (cartproductindex >= 0) {
        newquantity = this.cart.items[cartproductindex].quantity + 1;
        updatecartitem[cartproductindex].quantity = newquantity;
    }
    else {
        updatecartitem.push({
            productId: product._id,
            quantity: newquantity
        })
    }
    const updatecart = { items: updatecartitem };
    return this.save();
};
userschema.methods.removefromcart = function (productId) {
    const updatecartitem = this.cart.items.filter(item => {
        return item.productId.tostring() !== productId.tostring();

    });
    this.cart.items = updatecartitem;
    return this.save();
};

userschema.methods.clearcart = function () {
    this.cart = { items: [] };
    return this.save();
}
// thiscart=updatedx
module.exports = mongoose.model('User', userschema);

// const mongodb = require('mongodb')
// const getdb = require('../util/database').getdb;
// const ObjectId = mongodb.ObjectId;

// class User {

//     constructor (username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }
//     save() {
//         const db = getdb();
//         db.collection('users').insertOne(this);
//     }
//     addtocart(product) {
//         const cartproductindex = this.cart.items.findIndex(cp => {
//             return cp.productId.tostring() === product._id.tostring();
//         });
//         let newquantity = 1;
//         const updatecartitem = [...this.cart.items];


//         if (cartproductindex >= 0) {
//             newquantity = this.cart.items[cartproductindex].quantity + 1;
//             updatecartitem[cartproductindex].quantity = newquantity;
//         }
//         else {
//             updatecartitem.push({
//                 productId: new ObjectId(product._id),
//                 quantity: newquantity
//             })
//         }
//         const updatecart = { items: updatecartitem };
//         const db = getdb();
//         return db
//             .collection('users').updateOne({ _id: new ObjectId.createFromHexString(this._id) },
//                 { $set: { cart: updatecart } }
//             );
//     }

//     getcart() {
//         const db = getdb();
//         const productids = this.cart.items.map(i => {
//             return i.productId;
//         })

//         return db.collection('products').find({ _id: { $in: productids } })
//             .toArray()
//             .then((products) => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productids.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 })
//             }).catch((err) => {

//             });
//     }


//     deleteitemfromcart(productId) {
//         const updatecartitems = this.cart.items.filter(item => {
//             return item.productId.tostring() !== productId.tostring();

//         });
//         const updatecart = { items: updatecartitems };
//         const db = getdb();
//         return db
//             .collection('users').updateOne({ _id: new ObjectId.createFromHexString(this._id) },
//                 { $set: { cart: updatecartitems } }
//             );
//     }

//     addorder() {
//         const db = getdb();
//         return this.getcart().then(products => {
//             const order = {
//                 items: products,
//                 user: {
//                     _id: new ObjectId.createFromHexString(this._id),
//                     name: this.name
//                 }
//             }
//             return db
//             .collection('orders')
//             .insertOne(this.cart)
//         })
//         .then((result) => {
//                 this.cart = { items: [] };
//                 return db
//                     .collection('users')
//                     .updateOne(
//                         { _id: new ObjectId.createFromHexString(this._id) },
//                         { $set: { cart: { items: [] } } }

//                     )

//             });
//     }

//     getorder() {
//         const db=getdb();
//         return db
//         .collection('orders')
//         .find({ 'user._id':new ObjectId.createFromHexString(this._id)})
//         .toarray();
//     }
//     static findById(userId) {
//         const db = getdb();
//         return db.collection('users').findOne({ _id: new ObjectId('6694b4081895f8627b4a8f02') })
//             .then((user) => {
//                 req.user=user;
//                 console.log(user);
// return user;
//             }).catch((err) => {
//                 console.log(err);
//                 throw err;
//             });;

//     }
// }
// module.exports = User;