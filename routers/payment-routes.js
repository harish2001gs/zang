const express = require('express');
const { createOrder, payOrder, listOrders } = require('../controllers/payment-controller');

const router = express.Router()

router.route("/create-order", createOrder)
router.route("/pay-order", payOrder)
router.route("/list-orders", listOrders)
router.route("/get-razorpay-key", listOrders)

module.exports = router