// const mongodb = require('mongodb');
const mongoose = require('mongoose');

const filehelper = require('../util/file')

const { check, validationResult } = require('express-validator')
const Product = require("../models/products");
const products = require('../models/products');
const { file } = require('pdfkit');
// const { default: mongoose } = require('mongoose');
// const { ValidationError } = require('sequelize');
// const { use } = require("../routes/admin");
// const product = require("../models/products");
// const ObjectId = mongodb.ObjectId;

exports.getaddproduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pagetitle: "Add products",
    path: "admin/add-product",
    editing: false,
    hashError: false,
    errormessage: null,
    validationErrors: []
  });
};

exports.postAddproduct = (req, res, next) => {
  // console.log(req.user._id);
  const title = req.body.title;
  const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  // const product=new Product()
  const errors = validationResult(req);

  if (!image) {
    return res.status(422).render("admin/edit-product", {
      pagetitle: "Add products",
      path: "admin/add-product",
      editing: false,
      hashError: true,
      product: {
        title: title,
        // imageUrl: imageUrl,
        price: price,
        description: description
      },
      errormessage: 'Attached file is not in image',
      validationErrors: []
    });
  }
  if (!errors.isEmpty()) {
    res.status(422).render("admin/edit-product", {
      pagetitle: "Add products",
      path: "admin/add-product",
      editing: false,
      hashError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
      },
      errormessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  const imageUrl = image.path;

  const product = new Product(
    {
      // _id: new mongoose.Types.ObjectId('6697ab724988857c3f2f84ef'),
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userid: req.session.user
    }
  )
  product
    .save()
    .then(result => {
      console.log('created  products')
      res.redirect('/admin/products')
      // console.log(result);
    }).catch(err => {
      // res.status(500).render("admin/edit-product", {
      //   pagetitle: "Add products",
      //   path: "admin/add-product",
      //   editing: false,
      //   hashError: true,
      //   product: {
      //     title: title,
      //     imageUrl: imageUrl,
      //     price: price,
      //     description: description
      //   },
      //   errormessage: 'Database opreation failed, please try again',
      //   validationErrors: []
      // });
      // res.redirect("/500")
      // throw new Error();
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.geteditproduct = (req, res, next) => {
  const editmode = req.query.edit;
  if (!editmode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findbyid(prodId)
    .then(product => {
      // throw new Error('dummy');
      // const product=products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pagetitle: "Edit products",
        path: "admin/edit-product",
        editing: editmode,
        product: product,
        hashError: false,
        errormessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      res.redirect('/500');
    })

}

exports.posteditproduct = (req, res, next) => {
  const prodId = req.body.productId;
  // const proid = req.body.productId;
  const updatetitle = req.body.title;
  const updateprice = req.body.price;
  const image = req.file;
  const updatedescription = req.body.description;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).render("admin/edit-product", {
      pagetitle: "Edit products",
      path: "admin/edit-product",
      editing: true,
      hashError: true,
      product: {
        title: updatetitle,
        // imageUrl: updateimageUrl,
        price: updateprice,
        description: updatedescription,
        _id: prodId
      },
      errormessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userid.toString() !== req.userid._id) {
        return res.redirect('/');
      }
      product.title = updatetitle;
      product.price = updateprice;
      product.description = updatedescription;
      if (image) {
        filehelper.deletefile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save().then(result => {
        console.log('updated product!');
        res.redirect('/admin/products')

      })
    })
    .catch(err => console.log(err));

};

exports.getproducts = (req, res, next) => {
  // product.findAll()

  Product.find({ userid: req.user._id })
    // .populate('userid')
    .then(products => {
      console.log(products)
      res.render("admin/products", {
        prod: products,
        pagetitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch(err => console.log(err))
};

exports.deleteproduct = (req, res, next) => {
  const proid = req.params.productId;

  Product.findById(proid).then(product => {
    if (!product) {
      return next(new Error('product not found,'))

    }
    filehelper.deletefile(product.imageUrl);
    return Product.deleteOne({ _id: proid, userid: req.user._id });
  }).then(result => {
    console.log('DESTROYED PRODUCT');
    // res.redirect('/admin/products');
    res.status(200).json({ message: 'success' });

  })
    .catch(err => {
      // console.log(err)/
      res.status(500).json({ message: 'Deleting product failed' });
    })
  // res.redirect("/admin/products");
};
