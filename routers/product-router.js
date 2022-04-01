const express = require('express')
const { getAllProducts, getSingleProduct, addProduct } = require('../controllers/product-controllers')
const router = express.Router()

router.route("/").get(getAllProducts).post(addProduct)

router.route("/:id").get(getSingleProduct)

module.exports = router