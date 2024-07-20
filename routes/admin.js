const path = require("path");
const express = require("express");
const router = express.Router();

const admincontroller = require("../controllers/admin");
const isAuth = require('../middleware/is-auth');
const { check, body } = require('express-validator');

// /admin/add-product => GET
router.get("/add-product", isAuth, admincontroller.getaddproduct);

// // /admin/products =>GET
router.get("/products", isAuth, admincontroller.getproducts);

// // /admin/add-product =>POST
router.post("/add-product", [
    body('title')
        .isString()
        .isLength({ min: 3 })

        .trim(),

    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim(),
], isAuth, admincontroller.postAddproduct);

router.get("/edit-product/:productId", isAuth, admincontroller.geteditproduct);

router.post("/edit-product", [
    body('title')
        .isAlphanumeric()
        .isLength({ min: 3 })

        .trim(),
    body('imageUrl')
        .isURL(),
    body('price').isFloat(),
    body('description')
        .isLength({ min: 5, max: 400 })
        .trim(),
], isAuth, admincontroller.posteditproduct);

router.delete("/product/:productId", isAuth, admincontroller.deleteproduct);
module.exports = router;
