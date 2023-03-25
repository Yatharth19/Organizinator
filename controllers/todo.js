const Todo = require('../models/Todo')
const url = require('url');


const getAllTasks = async(req, res, next) => {
    try{
        if(!req.session){
            res.send('Not Authorized')
        }
        const user = req.session.user;
        const alltasks = await Todo.getAll(user);
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        if(!query.delete && !query.move){  
            //for getting task
            let tasks = null
            if(alltasks)
                tasks = alltasks.tasks;
            res.render('functionalities/todo', {
                pageTitle: 'To-Do',
                tasks: tasks
            })
        }else if(query.delete){        
            const ind = query.delete;
            const task = await Todo.delete(user, ind);
            res.redirect('/todo');
        }else{
            //for moving
            const ind = query.move;
            const task = await Todo.move(user, ind);
            res.redirect('/todo')
        }
    }catch(err){
        res.send('Some error occured');
    }
}

const addTask = async(req, res, next) => {
    try{
        const user = req.session.user;
        const task = await Todo.add(user, req.body.name);
            
        // getAllTasks();
        res.redirect('/todo');
    }catch(err){
        res.send('Some error occured');
    }
}

const getTask = async(req, res, next) => {
    try{
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const ind = query.id;        
        const user = req.session.user;
        const task = await Todo.getOne(user, ind);
        res.render('functionalities/edit', {
            pageTitle: 'Edit',
            task: task
        });
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}


const updateTask = async(req, res, next) => {
    try{
        const user = req.session.user;
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const ind = query.id;      
        const task = await Todo.update(user, ind, req.body.name);
        res.redirect('/todo');
    }catch(err){
        console.log(err);
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
        const task = await Todo.delete(user, req.body);
        res.redirect('/todo');
    }catch(err){
        res.send('Some Error Occured')
    }
}

module.exports = {
    getAllTasks,
    addTask,
    getTask,
    updateTask,
    // deleteTask
}