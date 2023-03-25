const mongoose = require('mongoose')
const { getDB } = require('../database/mongodb')
const { ObjectId } = require('mongodb') //to get the _id

const roadMap = class roadMap{
    static find(userId){
        const db = getDB();
        userId = userId._id;

        // return true
        return db.collection('roadMap').findOne({userId: (userId)}).then(road => {
            return road;
        })
        // return roadmap;
    }
    
    static getOne(user, ind){
        const db = getDB();
        const userId = user._id;
        return db.collection('roadMap').findOne({userId: userId}).then(userData => {
            const roadMap = {...userData.roadmap}
            const keys = Object.keys(roadMap);
            return keys[ind];
        })
    }
    static add(userId, task){
        //for every document, we have a userid and an object as its fields
        //Add a new task 'task' for the user 'userId'
        const db = getDB();
        userId = userId._id;
        return db.collection('roadMap').findOne({userId: new ObjectId(userId)}).then(userData => {
            let roadmap = {};
            if(!userData){
                //first roadMap for this user
                roadmap[task] = false;//by default not done

                const document = {
                    userId: new ObjectId(userId),
                    roadmap: roadmap
                };
                return db.collection('roadMap').insertOne(document);
            }else{
                //already some roadMap exists for this user
                roadmap = {...userData.roadmap};//using spread operator
                roadmap[task] = false;

                return db.collection('roadMap').updateOne({_id: new ObjectId(userData._id)}, {$set: {roadmap: roadmap}});
            }
        }).catch(err => console.log(err));
    }
    
    static update(user, ind, task){
        const db = getDB();
        return db.collection('roadMap').findOne({userId: new ObjectId(user._id)}).then(userData => {
            const roadmap = {...userData.roadmap};
            const keys = Object.keys(roadmap);
            roadmap[task] = true;
            delete roadmap[keys[ind]]
            return db.collection('roadMap').updateOne({_id: new ObjectId(userData._id)}, {$set: {roadmap: roadmap}});
        })
    }

    static delete(user, ind){
        const db = getDB();
        return db.collection('roadMap').findOne({userId: new ObjectId(user._id)}).then(userData => {
            const roadmap = {...userData.roadmap};
            const keys = Object.keys(roadmap);
            delete roadmap[keys[ind]];
            return db.collection('roadMap').updateOne({_id: new ObjectId(userData._id)}, {$set: {roadmap: roadmap}});
        })
    }
    // static updateroadMap()
}

module.exports = roadMap;