const catchAsyncError = require("../middleware/catchAsyncError");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const crypto = require("crypto");
const Payment = require("../models/paymentModels");

dotenv.config({ path: "backend/config/config.env" });

exports.processPayment = catchAsyncError(async (req, res, next) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100), // amount in the smallest currency unit
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order : order,
      });
  } catch (error) {
    res.status(500).send(error);
  }
});


exports.paymentVerification = catchAsyncError(async (req, res, next) => {
  const {
    paymentId,
    orderId,
    signature,
  } = req.body;

  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isSignatureValid = expectedSignature === signature;

  if (isSignatureValid) {
    await Payment.create({
      "razorpay_order_id":orderId,
      "razorpay_payment_id":paymentId,
      "razorpay_signature":signature,
    });

    res.status(200).json({
      success: true,
      msg: "success",
      orderId,
      paymentId,
    });
  } else {
    res.status(400).json({
      success: false,
      msg: "Payment verification failed",
    });
  }
});

exports.sendKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});
