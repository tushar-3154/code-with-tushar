const path = require("path");
const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin");

// /admin/add-product => GET
router.get("/add-product", admincontroller.getaddproduct);

// /admin/products =>GET
router.get("/products", admincontroller.getproducts);

// /admin/add-product =>POST
router.post("/add-product", admincontroller.postAddproduct);

router.get("/edit-product/:productId", admincontroller.geteditproduct);

router.post("/edit-product", admincontroller.posteditproduct);

router.post("/delete-product", admincontroller.postdeleteproduct);
module.exports = router;
