const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenicatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenicatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenicatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenicatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(isAuthenicatedUser, createProductReview);
router
  .route("/reviews")
  .get(isAuthenicatedUser, getProductReviews)
  .delete(isAuthenicatedUser, deleteProductReviews);
router.route("/admin/products").get(isAuthenicatedUser,authorizeRoles("admin"),getAdminProducts);

module.exports = router;
