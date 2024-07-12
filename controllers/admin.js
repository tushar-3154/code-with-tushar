const Product = require("../models/products");
const product = require("../models/products");

exports.getaddproduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pagetitle: "Add products",
    path: "admin/add-product",
    editing: false,
  });
};

exports.postAddproduct = (req, res, next) => {
  const title = req.body.title;
  const imageurl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product=new Product()
  req.user.createProduct({
    title: title,
    price: price,
    imageurl: imageurl,
    description: description,
    // userid:req.user.id
  })
  .then(result => {
    console.log('created  products')
    res.redirect('/admin/products')
    // console.log(result);
  }).catch(err => {
    console.log(err);
  })
};

exports.geteditproduct = (req, res, next) => {
  const editmode = req.query.edit;
  if (!editmode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  req.user
  .getproducts({ where: {id:prodId}})

  // Product.findbyid(prodId)
    .then(products => {

      const product=products[0];
      // if (!product) {
      //   return res.redirect("/");
      // }
      res.render("admin/edit-product", {
        pagetitle: "Edit products",
        path: "admin/edit-product",
        editing: editmode,
        product: product,
      });
    })
    .catch(err => console.log(err))



  exports.posteditproduct = (req, res, next) => {
    const prodId = req.body.productId;
    // const proid = req.body.productId;
    const updatetitle = req.body.title;
    const updatepric = req.body.price;
    const updateimageUrl = req.body.imageUrl;
    const updatedescription = req.body.description;
    product.findById(prodId)
      .then(product => {
        product.title = updatetitle;
        product.price = updatepric;
        product.description = updatedescription;
        product.imageUrl = updateimageUrl;
        return product.save();

      })
      .then(result =>{
        console.log('updated product!');
        res.redirect('/admin/products')

      })
      .catch(err => console.log(err));

  };

  exports.getproducts = (req, res, next) => {
    // product.findAll()
    req.user.getaddproduct()
      .then(products => {
        res.render("admin/products", {
          prods: products,
          pagetitle: "Admin Products",
          path: "/admin/products",
        });
      })
      .catch(err => console.log(err))
  };

  exports.postdeleteproduct = (req, res, next) => {
    const proid = req.body.productId;
    // product.deletebyid(proid);
    product.findById()
    .then(product =>{
      return product.destroy();
    })
    .then(result =>{
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch()
    res.redirect("/admin/products");
  };
}