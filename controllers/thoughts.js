const Thoughts = require('../models/Thoughts');
const url = require('url')

const getAllThoughts = async (req, res, next) => {
    try{
        if(!req.session){
            res.send('Not authorized!');
        }
        const userId = req.session.user._id;
        const allThoughts = await Thoughts.findAll(userId);
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        if(!query.delete){
            let thoughts = null;
            if(allThoughts)
                thoughts = allThoughts.quotes;
            res.render('functionalities/thoughts', {
                pageTitle: 'Thoughts',
                thoughts: thoughts
            })
        }else{
            const ind = query.delete;
            const thought = await Thoughts.delete(userId, ind);
            res.redirect('/thoughts')
        }
    }catch(err){
        console.log(err);
        res.send('Some Error Occured')
    }
    
}

const addThought = async (req, res, next) => {
    try{
        if(!req.session){
            res.send('Not Authorized');
        }
    
        const userId = req.session.user._id;
        const addThought = await Thoughts.add(userId, req.body.name);
        res.redirect('/thoughts')
    }catch(err){
        console.log(err);
        res.send('Some error Occured');
    }
}

// const deleteThought = async (req, res, next) => {
//     try{
//         if(!req.session){
//             res.send('NOt Authorized');
//         }
        
//         const userId = req.session.user._id;
//         const allThoughts = await Thoughts.delete(userId, req.body);
//         res.redirect('/thoughts');
//     }catch(err){
//         console.log(err);
//         res.send('Some Error Occured');
//     }
// }


const getThought = async(req, res, next) => {
    try{
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.id;        
        const user = req.session.user;
        const thought = await Thoughts.getOne(user, ind);
        
        res.render('functionalities/edit', {
            pageTitle: 'Thoughts',
            task: thought
        });
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}


const updateThought = async(req, res, next) => {
    try{
        const user = req.session.user;
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.id;  
        const thought = await Thoughts.update(user, ind, req.body.name);
        // console.log(task);
        res.redirect('/thoughts');
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}


module.exports = {
    getAllThoughts,
    addThought,
    updateThought,
    getThought
}