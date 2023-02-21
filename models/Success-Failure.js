const mongoose = require('mongoose')


const SF = class SF{
    static getAll(userId){
        const db = getDB();
        userId = userId._id;
        
    }
}





const successFailureSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, 'Date is Mandatory']
    },
    name: {
        type: String,
        required: [true, 'Please enter a string'],
        maxlength: [100, 'Only 100 characters allowed']
    }
})

module.exports = mongoose.model('successFailure', successFailureSchema);