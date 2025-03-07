const express = require('express');

const { checkout, paymentverification } = require("../controllers/paymentController");

const router = express.Router()

router.route('/checkout').post(checkout);
router.route('/paymentverification').post(paymentverification);

module.exports = router;
