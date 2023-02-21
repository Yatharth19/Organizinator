const SF = require('../models/Success-Failure')


const getAllSF = async(req, res, next) => {
    const user = req.session.user;
    if(!user){
        res.send('Not Authorized');
    }
    const allSF = await getAll(user, req.body);
    res.redirect('/', )
}

const addSF = async(req, res, next) => {
    
}

const editSF = async(req, res, next) => {

}

const deleteSF = async(req, res, next) => {

}

module.exports = {
    getAllSF,
    addSF,
    editSF,
    deleteSF
}