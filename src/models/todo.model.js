const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
        trim: true,
        unique: true,
    },
    description: String,
    status: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not a valid status. Allowed values are active and inactive.'
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todo', todoSchema)