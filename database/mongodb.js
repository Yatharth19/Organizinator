const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', true);

let _db = null; 
const connectDB = callback => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(client => {
        _db = mongoose.connection;
        console.log('Connected to DB!')
        // console.log(_db)
        callback();
    }).catch((error) => {
        // console.log(url)
        console.log(error);
    });
}

const getDB = () => {
    if(_db)
        return _db;
        throw new Error('Database Connection Failed!!')
}

module.exports = {
    connectDB: connectDB,
    getDB: getDB
}