const mongoose = require('mongoose')
const { getDB } = require('../database/mongodb')
const { ObjectId } = require('mongodb') //to get the _id

const Todo = class Todo{
    static getAll(userId){
        const db = getDB();
        userId = userId._id;
        console.log('id is ')
        console.log(userId);

        // return true
        const tasks = db.collection('todo').findOne({userId: (userId)});
        return tasks;
    }
    
    static getOne(user, ind){
        const db = getDB();
        const userId = user._id;
        return db.collection('todo').findOne({userId: userId}).then(userData => {
            const tasks = {...userData.tasks}
            const keys = Object.keys(tasks);
            console.log('inside getone');
            console.log(keys[ind]);
            return keys[ind];
        })
    }

    static add(userId, task){
        //for every document, we have a userid and an object as its fields
        //Add a new task 'task' for the user 'userId'
        const db = getDB();
        userId = userId._id;
        console.log('insdie add')
        return db.collection('todo').findOne({userId: new ObjectId(userId)}).then(userData => {
            let tasks = {};
            if(!userData){
                //first todo for this user
                tasks[task] = false;//by default not done

                const document = {
                    userId: new ObjectId(userId),
                    tasks: tasks
                };
                console.log('inserted')
                return db.collection('todo').insertOne(document);
            }else{
                //already some todo exists for this user
                tasks = {...userData.tasks};//using spread operator
                tasks[task] = false;

                return db.collection('todo').updateOne({_id: new ObjectId(userData._id)}, {$set: {tasks: tasks}});
            }
        }).catch(err => console.log(err));
    }
    
    static update(user, ind, task){
        const db = getDB();
        return db.collection('todo').findOne({userId: new ObjectId(user._id)}).then(userData => {
            const tasks = {...userData.tasks};
            const keys = Object.keys(tasks);
            tasks[task] = false;
            delete tasks[keys[ind]];
            console.log(tasks);
            return db.collection('todo').updateOne({_id: new ObjectId(userData._id)}, {$set: {tasks: tasks}});
        })
    }

    static delete(user, ind){
        const db = getDB();
        console.log('inside dlete')
        // console.log(userId);
        return db.collection('todo').findOne({userId: (user._id)}).then(userData => {
            const tasks = {...userData.tasks};
            const keys = Object.keys(tasks);
            //task is an object and we need to delete ind index of task
            delete tasks[keys[ind]];
            console.log(tasks);
            return db.collection('todo').updateOne({_id: new ObjectId(userData._id)}, {$set: {tasks: tasks}});
        })
    }

    
    static move(user, ind){
        const db = getDB();
        return db.collection('todo').findOne({userId: new ObjectId(user._id)}).then(userData => {
            const tasks = {...userData.tasks};
            const keys = Object.keys(tasks);
            //delete from todo
            const task = keys[ind];
            delete tasks[keys[ind]];
            db.collection('todo').updateOne({userId: new ObjectId(user._id)}, {$set: {tasks: tasks}});
            //Add to queue
            let userId = user._id;
            return db.collection('queue').findOne({userId: new ObjectId(userId)}).then(userData => {
                let tasks = {};
                if(!userData){
                    //first queue for this user
                    tasks[task] = false;//by default not done
                    const document = {
                        userId: new ObjectId(userId),
                        tasks: tasks
                    };
                    console.log('inserted')
                    return db.collection('queue').insertOne(document);
                }else{
                    //already some queue exists for this user
                    tasks = {...userData.tasks};//using spread operator
                    tasks[task] = false;
    
                    return db.collection('queue').updateOne({_id: new ObjectId(userData._id)}, {$set: {tasks: tasks}});
                }
            }).catch(err => console.log(err));
        
        })
    }
    // static updateTodo()
}

module.exports = Todo;