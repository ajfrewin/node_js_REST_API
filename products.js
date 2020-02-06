// Responses for products

const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')

const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date(Date.now()) + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || filemimetype ==='image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage, 
  limits: {
    filesize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


// get request for url
router.get('/', ProductsController.products_get_all);

// post request
router.post('/', checkAuth, upload.single('productImage'),  ProductsController.products_create_product);

// Get by ID request
router.get('/:productId', ProductsController.products_get_product);

// patch requests
router.patch('/:productId', checkAuth, ProductsController.products_edit_product);

// delete requests
router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;
