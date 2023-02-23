const Note = require('../models/Note')
const User = require('../models/User')
const Category = require('../models/Category')

const getAllCategorys = async (req, res) => {
    const category = await Category.find().lean()
    const notesWitParentName = await Promise.all(category.map(async (note) => {
        const user = await Category.findById(note.parentCategory).lean().exec()
        return { ...note, parent_name: user?.title && user?.title }
    }))
    if (!category?.length) {
        return res.status(400).json({ message: 'Nav atrasta neviena kategorija' })
    }
    res.json(notesWitParentName)
}


const createNewCategory = async (req, res) => {
    const { parentCategory, title, description, imgurl } = req.body
    if (!title) {
        return res.status(400).json({ message: 'Nosaukums ir nepieciešmas' })
    }

    const duplicate = await Category.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: `kategorija ar nosaukumu ${title} jau eksistē` })
    }
    const category = await Category.create({ parentCategory, title, description, imgurl })

    if (category) { // Created 
        return res.status(201).json({ message: 'Jauna kategorija ir izveidota' })
    } else {
        return res.status(400).json({ message: 'Saņemti nepareizi dati' })
    }

}


const updateCategory = async (req, res) => {
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


const deleteCategory = async (req, res) => {
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
    getAllCategorys,
    createNewCategory,
    updateCategory,
    deleteCategory
}