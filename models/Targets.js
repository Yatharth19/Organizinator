const mongoose = require('mongoose')

const targetsSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Please enter the date']
    },
    name: {
        type: String,
        required: [true, 'Please enter the target'],
        maxlength: [3, 'Only 100 characters required']
    }
})

module.exports = mongoose.model('targets', targetsSchema);