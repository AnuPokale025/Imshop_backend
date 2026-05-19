const express = require('express');
const router = express.Router();
const verifytoken = require("../auth/VerifyToken")
const ProductController = require('../controller/ProductController');
const CartController = require('../controller/CartController');
const CategoryController = require('../controller/CategoryController');
const SubcategoryController = require('../controller/SubCategoryController');
const WishlistController = require('../controller/WishlistController');
const LoginController = require('../auth/LoginController');
const RegisterController = require('../auth/RegisterController');
const OrderController = require('../controller/OrderController');
const ResetPasswordController = require('../auth/ResetPasswordController');
const ForgetPasswordController = require('../auth/ForgetPasswordController')
const FeedbackController = require('../controller/FeedbackController')
const PaymentController = require('../controller/PaymentController');
const WebhookController = require('../controller/WebhookController');
const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage()
});


// Product Routes
router.get('/product', ProductController.getAllProducts);
router.get('/product/:productId', ProductController.getProductById);
router.delete('/product/:productId', ProductController.deleteProduct);
router.post('/product/:categoryId/:subcategoryId',upload.single('image'),ProductController.addProduct
);

// Cart Routes
router.get('/cart', verifytoken, CartController.getCartItems);
router.get('/cart/:cartId', verifytoken, CartController.getCartItemsById);
router.post('/cart/userId/:userId/productId/:productId', verifytoken, CartController.addCartItem);
router.delete('/cart/:cartId', verifytoken, CartController.deleteCartItem);

// Category Routes
router.get('/category', CategoryController.getAllCategories);
router.get('/category/:categoryId', CategoryController.getCategoryById);
router.post('/category/:vendorId', CategoryController.addCategory);
router.delete('/category/:categoryId', CategoryController.deleteCategory);

// Subcategory Routes
router.get('/subcategory', SubcategoryController.getAllSubcategories);
router.get('/subcategory/:subcategoryId', SubcategoryController.getSubcategoryById);
router.post('/subcategory/category/:categoryId/vendor/:vendorId', SubcategoryController.addSubcategory);
router.delete('/subcategory/:subcategoryId', SubcategoryController.deleteSubcategory);

// Auth Routes (FIXED)
router.post('/login', LoginController.login);
router.post('/register', RegisterController.register);
router.post('/reset-password', ResetPasswordController.reset);
router.post('/forget-password', ForgetPasswordController.forget);

// Wishlist Routes
router.get('/wishlist', verifytoken, WishlistController.getWishlist);
router.get('/wishlist/:wishlistId', verifytoken, WishlistController.getWishlistItemById);
router.post('/wishlist/user/:userId/product/:productId', verifytoken, WishlistController.addWishlistItem);
router.delete('/wishlist/:wishlistId',verifytoken, WishlistController.deleteWishlist );

//Order Routes
router.get('/order', verifytoken, OrderController.getAllOrders );
router.get('/order/:orderId', verifytoken, OrderController.getOrderById);
router.post('/order/:productId/:userId', verifytoken, OrderController.addOrder);
router.delete('/order/:orderId', verifytoken, OrderController.deleteOrder);


//Feedback
router.get('/feedback', verifytoken, FeedbackController.getfeedback);
router.post('/feedback/:useId/:productId',verifytoken,FeedbackController.addFeedback);

///payment verified
router.post('/verify-payment/:userId/:orderId', verifytoken, PaymentController.verifyPayment);
router.post('/webhook/:userId/:orderId' , verifytoken, WebhookController.webhookController); 

module.exports = router;