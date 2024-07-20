const path = require("path");

const express = require("express");
const shopcontroller = require("../controllers/shop");
const isAuth = require('../middleware/is-auth')
const router = express.Router();

router.get("/", shopcontroller.getindex);
router.get("/products", shopcontroller.getproducts);
router.get("/products/:productId", shopcontroller.getproduct);
// // // router.get("/products/delete");

router.get("/cart", isAuth, shopcontroller.getcart);
router.post("/cart", isAuth, shopcontroller.postcart);

router.post("/cart-delete-item", isAuth, shopcontroller.postcartdeleteproduct);

router.get('/checkout', isAuth, shopcontroller.getcheckout)

router.post('/cart-order', isAuth, shopcontroller.postorder);

router.get("/orders", isAuth, shopcontroller.getorders);

router.get('/orders/:orderId', isAuth, shopcontroller.getinvoice);

// router.get("/checkout", shopcontroller.getcheckout);

module.exports = router;
