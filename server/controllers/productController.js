const Note = require('../models/Note')
const User = require('../models/User')
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
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)
}


const deleteProduct = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}