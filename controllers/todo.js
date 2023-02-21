const Todo = require('../models/Todo')
const url = require('url');


const getAllTasks = async(req, res, next) => {
    try{
        if(!req.session){
            res.send('Not Authorized')
        }
        const user = req.session.user;
        const alltasks = await Todo.getAll(user);
        console.log('inside controllers')
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        console.log(query);
        // console.log(ind);
        if(!query.delete && !query.move){  
            //for getting task
            let tasks = null
            if(alltasks)
                tasks = alltasks.tasks;
                // console.log(tasks.tasks)
            res.render('functionalities/todo', {
                pageTitle: 'To-Do',
                tasks: tasks
            })
        }else if(query.delete){        
            const ind = query.delete;
            console.log('inside deletetas');
            console.log(ind);
            const task = await Todo.delete(user, ind);
            res.redirect('/todo');
        }else{
            //for moving
            const ind = query.move;
            const task = await Todo.move(user, ind);
            res.redirect('/todo')
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
        const task = await Todo.add(user, req.body.name);
            
        // getAllTasks();
        res.redirect('/todo');
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
        console.log(query);
        const ind = query.id;        
        const user = req.session.user;
        const task = await Todo.getOne(user, ind);
        console.log(task);
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
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        console.log(query);
        const ind = query.id;      
        console.log(req.body);
        const task = await Todo.update(user, ind, req.body.name);
        console.log(task);
        res.redirect('/todo');
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}

const deleteTask = async(req, res, next) => {
    try{
        console.log('inside deletetas');
        var header = req.header;
        console.log(
            'heree'
        )
        const parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.delete;
        console.log(ind);
        // console.log(req.body);
        const user = req.session.user;
        const task = await Todo.delete(user, req.body);
        console.log('again inside controllers')
        res.redirect('/todo');
    }catch(err){
        console.log(err);
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