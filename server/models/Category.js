const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        imgurl: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category', noteSchema)