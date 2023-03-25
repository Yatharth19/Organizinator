const Queue = require('../models/Queue')
const url = require('url');


const getAllTasks = async(req, res, next) => {
    try{
        if(!req.session){
            res.send('Not Authorized')
        }
        const user = req.session.user;
        const allqueue = await Queue.getAll(user);
        //console.log('inside controllers')
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;

        if(!query.delete && !query.move){  
            //for getting task
            let tasks = null
            if(allqueue)
            tasks = allqueue.tasks;
            res.render('functionalities/queue', {
                pageTitle: 'Queue',
                tasks: tasks
            })
        }else if(query.delete){        
            //For delete functionality
            const ind = query.delete;
            const task = await Queue.delete(user, ind);
            res.redirect('/queue');
        }else{
            //for move functionality
            const ind = query.move;
            const task = await Queue.move(user, ind);
            res.redirect('/queue');
        }
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}

const addTask = async(req, res, next) => {
    try{
        const user = req.session.user;
        console.log(req.body);
        const task = await Queue.add(user, req.body.name);
            
        // getAllTasks();
        res.redirect('/queue');
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}

const getTask = async(req, res, next) => {
    try{
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.id;        
        const user = req.session.user;
        const task = await Queue.getOne(user, ind);
        res.render('functionalities/edit', {
            pageTitle: 'Edit',
            task: task
        });
    }catch(err){
        res.send('Some error occured');
    }
}

const updateTask = async(req, res, next) => {
    try{
        const user = req.session.user;
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.id;      
        const task = await Queue.update(user, ind, req.body.name);
        res.redirect('/queue');
    }catch(err){
        res.send('Some error occured');
    }
}

const deleteTask = async(req, res, next) => {
    try{
        var header = req.header;
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const ind = query.delete;
        const user = req.session.user;
        const task = await Queue.delete(user, req.body);
        res.redirect('/queue');
    }catch(err){
        res.send('Some Error Occured')
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    updateTask,
    deleteTask
}