// const { products } = require("../routes/admin");

// const products = [];
// const products = require("../models/products");
// const products = require("../models/products");
const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const ITEMS_PER_PAGE = 2;

const products = require("../models/products");
const Product = require("../models/products");
const user = require("../models/user");
const User = require("../models/user");
const Order = require('../models/order')

// const product = require("../models/products");
// const cart = require("../models/cart");
// const Cart = require("../models/cart");
// const order = require('../models/order')
// const { where } = require("sequelize");

exports.getaddproduct = (req, res, next) => {
  res.render("admin/add-product", {
    pagetitle: "Add Product",
    path: "/admin/add-product",
    fromCSS: true,
    productCSS: true,
    activeAddProduct: true,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postaddproduct = (req, res, next) => {
  // products.push({ title: req.body.title });
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getproducts = (req, res, next) => {

  const page = +req.query.page || 1;
  let totalitems;

  Product.find().countDocuments().then(numproducts => {
    totalitems = numproducts;
    return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
  }).then(products => {
    res.render('shop/product-list', {
      prod: products,
      pagetitle: 'products',
      path: '/products',
      currentPage: page,
      // totalproducts: totalitems,
      hashNextPage: ITEMS_PER_PAGE * page < totalitems,
      hashpreviouspage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalitems / ITEMS_PER_PAGE)
      // isAuthenticated: req.session.isLoggedIn,
      // csrfToken: req.csrfToken()

    });
  })


    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

}



exports.getproduct = (req, res, next) => {
  const proid = req.params.productId;

  Product.findById(proid)
    .then((product) => {
      console.log(product);
      res.render('shop/product-detail', {
        product: product,
        pagetitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn

      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getindex = (req, res, next) => {
  const page = +req.query.page || 1;
  let totalitems;

  Product.find().countDocuments().then(numproducts => {
    totalitems = numproducts;
    return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
  }).then(products => {
    res.render('shop/index', {
      prod: products,
      pagetitle: 'shop',
      path: '/',
      currentPage: page,
      // totalproducts: totalitems,
      hashNextPage: ITEMS_PER_PAGE * page < totalitems,
      hashpreviouspage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalitems / ITEMS_PER_PAGE)
      // isAuthenticated: req.session.isLoggedIn,
      // csrfToken: req.csrfToken()

    });
  })

    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.getcart = (req, res, next) => {
  req.user
    .populate('cart.items.productid')
    .execPopulate()
    .then(user => {
      // console.log(user.cart.items);
      const products = user.cart.items;
      // console.log(user)
      res.render('shop/cart', {
        path: '/cart',
        pagetitle: 'your cart',
        products: products,

      });


    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      console.log(error);
      console.log(err);
      return next(error);
    })
}

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


exports.postcart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addtocart(product);
      res.redirect('/cart')
    }).then((result) => {
      console.log(result)
      res.redirect('/cart')

    }).catch(err => {
      // const error = new Error(err);
      // error.httpStatusCode = 500;
      // console.log(error);
      console.log(err);
      // return next(error);
    });
};

exports.postcartdeleteproduct = (req, res, next) => {
  const proid = req.body.productId;
  req.session.user
    .removefromcart(proid)
    .then(cart => {
      return cart.getproducts({ where: { id: proid } });
    })
    .then(products => {
      const product = products[0];
      return product.cartitem.destroy();
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      // console.log(err);
      // console.lo
      return next(error);
    })
};

exports.getcheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pagetitle: 'checkout',
    products: products
  })
}

exports.getorders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(order => {
      res.render("shop/order", {
        path: "/order",
        pagetitle: "your Orders",
        orders: order,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    })
};

exports.postorder = (req, res, next) => {

  req.user
    .populate('cart.items.productID')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userid: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      req.user.clearcart();

    })
    .then(() => {
      req.redirect('/orders')
    })

    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}


exports.getcheckout = (req, res, next) => {
  req.user
    .populate('cart.items.productid')
    .execPopulate()
    .then(user => {
      // console.log(user.cart.items);
      const products = user.cart.items;
      let total = 0;
      products.forEach(p => {
        total += p.quantity * p.productId.price;
      });
      // console.log(user)
      res.render('shop/checkout', {
        path: '/checkout',
        pagetitle: 'checkout',
        products: products,
        totalsum: total
      })



    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      console.log(error);
      console.log(err);
      return next(error);
    })
};

exports.getinvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId).then((order) => {
    if (!order) {
      return next(new Error('no order found'));
    }
    if (order.user.userid.toString() !== req.user._id.tostring()) {

      return next(new Error('Unauthorized'));

    }
    const invoicename = 'invoice-' + orderId + '.pdf';
    const invoicepath = path.join('data', 'invoices', invoicename);

    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition',
      'inline; filename"' + invoicename + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicepath));
    pdfDoc.pipe(res);

    pdfDoc.fontSize(26).text('Invoice', {
      underline: true
    })

    pdfDoc.text('-------------------------');

    let totalPrice = 0;

    order.products.forEach(prod => {
      totalPrice += prod.quntity * prod.product.price;

      pdfDoc.fontSize(14).text(prod.product.title + '  - ' + prod.quntity + ' X ' + ' $ ' + prod.product.price);
    }
    );
    pdfDoc.fontSize(20).text('total price: $' + totalPrice);

    pdfDoc.end();

    // fs.readFile(invoicepath, (err, data) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.setHeader('Content-Type', 'application/pdf');
    //   res.setHeader('Content-Disposition', 'inline; filename"' + invoicename + '"');

    //   res.send(data);
    // })

    const file = fs.createReadStream(invoicepath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition',
      'inline; filename"' + invoicename + '"');
    file.pipe(res);
  }).catch((err) => {
    next(err);
  });


}