const path = require("path");

const express = require("express");
const shopcontroller = require("../controllers/shop");
const router = express.Router();

router.get("/", shopcontroller.getindex);
router.get("/products", shopcontroller.getproducts);
router.get("/products/:productId", shopcontroller.getproduct);
// router.get("/products/delete");

router.get("/cart", shopcontroller.getcart);
router.post("/cart", shopcontroller.postcart);

router.post("/cart-delete-item",shopcontroller.postcartdeleteproduct)
router.get("/orders", shopcontroller.getorders);

router.get("/checkout", shopcontroller.getcheckout);

module.exports = router;
