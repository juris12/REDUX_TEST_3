const Product = require('../models/Product')
const Category = require('../models/Category')

const getAllProducts = async (req, res) => {
    const product = await Product.find().lean()
    const productWithCatName = await Promise.all(product.map(async (prod) => {
        const category = await Category.findById(prod.category).lean().exec()
        return { ...prod, category_name: category?.title }
    }))
    if (!product?.length) {
        return res.status(400).json({ message: 'Nav atrasta neviens produkts' })
    }
    res.json(productWithCatName)
}


const createNewProduct = async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({ message: 'Nosaukums ir nepieciešmas' })
    }
    const duplicate = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: `produkts ar nosaukumu ${title} jau eksistē` })
    }
    const product = await Product.create(req.body)
    if (product) { // Created 
        return res.status(201).json({ message: 'Jauns produkts ir izveidots' })
    } else {
        return res.status(400).json({ message: 'Saņemti nepareizi dati' })
    }

}


const updateProduct = async (req, res) => {
    const { id, quantity, title, price, minoder, description, disabled } = req.body
    if ([id, quantity, title, price, minoder, disabled, description, typeof disabled !== 'boolean'].every(Boolean)) {
        return res.status(400).json({ message: 'Jāizpilda visi lauki' })
    }
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Prece nav atrasta' })
    }

    const duplicate = await Product.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Prece ar šādu nosaukumu jau eksistē' })
    }

    product.price = price
    product.title = title
    product.description = description
    product.minoder = minoder
    product.quantity = quantity
    product.disabled = disabled

    const updatedProduct = await product.save()

    res.json(`'${updatedProduct.title}' rediģēts`)
}


const deleteProduct = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Ir vajadzīga id' })
    }
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Prece nav atrasta' })
    }
    const result = await product.deleteOne()
    const reply = `Prece '${result.title}' ar ID ${result._id} ir izdzēsta`
    res.json(reply)
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}