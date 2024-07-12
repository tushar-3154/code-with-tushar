// const { products } = require("../routes/admin");

const products = [];
const Product = require("../models/products");
const product = require("../models/products");
const cart = require("../models/cart");
const Cart = require("../models/cart");
const { where } = require("sequelize");

exports.getaddproduct = (req, res, next) => {
  res.render("admin/add-product", {
    pagetitle: "Add Product",
    path: "/admin/add-product",
    fromCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postaddproduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const product = new product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getproducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prod: products,
        pagetitle: "All products",
        path: '/products'

      });
    })

    .catch(err => {
      console.log(err)
    })
  
  }
   


exports.getproduct = (req, res, next) => {
  const proid = req.params.productId;
//   product.findAll({where:{id:proid}})
//   .then(products=>{
//     res.render('shop/product-detail', {
//       product: products,
//       pagetitle: product.title,
//       path: '/products'
//   });
// })
//   .catch(err =>console.log(err));
  product.findById(proid)
    .then((product) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        pagetitle: product.title,
        path: '/products'

      });
    })
    .catch(err => console.log(err));
};

exports.getindex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/indx', {
        prod: products,
        pagetitle: 'shop',
        path: '/'

      });
    })

    .catch(err => {
      console.log(err)
    })
};

exports.getcart = (req, res, next) => {

  
  // cart.getcart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartproduct = [];
  //     for (product of products) {
  //       const cartproductdata = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartproductdata) {
  //         cartproduct.push({ productdata: data, qty: cartproductdata.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pagetitle: "your cart",
  //       products: cartproduct,
  //     });
  //   });
  // });
};

exports.postcart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postcartdeleteproduct = (req, res, next) => {
  const proid = req.body.productId;
  Product.findById(proid, (product) => {
    cart.deleteproduct(proid, product.price);
    res.redirect("/cart");
  });
};

exports.getorders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pagetitle: "your Orders",
  });
};

exports.getcheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pagetitle: "Checkout",
  });
  };