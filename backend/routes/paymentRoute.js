const express = require("express");
const {
  processPayment,
  paymentVerification,
  sendKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenicatedUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenicatedUser, processPayment);
router.route("/payment/verification").post(paymentVerification)
router.route("/sendKey").get(isAuthenicatedUser,sendKey)

module.exports = router;