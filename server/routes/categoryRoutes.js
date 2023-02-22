const express = require('express')
const router = express.Router()
const { getAllCategorys, createNewCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const verifyJWT = require('../middleware/verifyJWT')

//router.use(verifyJWT)

router.route('/')
    .get(getAllCategorys)
    .post(createNewCategory)
    .patch(updateCategory)
    .delete(deleteCategory)

module.exports = router