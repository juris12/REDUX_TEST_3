const express = require('express')
const router = express.Router()
const { getAllProducts, createNewProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(getAllProducts)
    .post(createNewProduct)
    .patch(updateProduct)
    .delete(deleteProduct)

module.exports = router