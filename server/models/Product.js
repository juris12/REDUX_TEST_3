const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        minoder: {
            type: Number,
            default: false
        },
        size: {
            hight: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            },
            depth: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            }
        },
        imgurls: {
            type: [String]
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


module.exports = mongoose.model('Product', noteSchema)