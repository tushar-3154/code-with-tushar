// const { products } = require("../routes/admin");

const products = [];
const product = require("../models/products");

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
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getproduct = (req, res, next) => {
  product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pagetitle: "Shop",
      path: "/",
      hasproducts: products.length > 0,
      activeshop: true,
      productCSS: true,
    });
  });
};
