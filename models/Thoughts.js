const mongoose = require('mongoose');
const { ObjectId } = require('mongodb')
const { getDB } = require('../database/mongodb') 

const thoughts = class thoughts{
    static findAll(userId){
        const db = getDB();
        return db.collection('thoughts').findOne({userId: userId}).then(quotes => {
            return quotes;
        })
    }

    static getOne(user, ind){
        const db = getDB();
        const userId = user._id;
        return db.collection('thoughts').findOne({userId: userId}).then(userData => {
            const quotes = {...userData.quotes}
            const keys = Object.keys(quotes);
            // console.log('inside getone');
            // console.log(keys[ind]);
            return keys[ind];
        })
    }

    static add(userId, quote){
        const db = getDB();
        return db.collection('thoughts').findOne({userId: userId}).then(userdata => {
            let allquotes = {};
            console.log('user data');
            console.log(userdata);
            if(!userdata){
                //first quote by this user
                allquotes[quote] = true;
                const quotes = {
                    userId: userId,
                    quotes: allquotes
                }
                return db.collection('thoughts').insertOne(quotes);
            }else{
                //already some quotes present by this user
                //present is userdata.Quote
                allquotes = userdata.quotes;
                allquotes[quote] = true;
                console.log('allquotes');
                console.log(allquotes);
                return db.collection('thoughts').updateOne({_id: new ObjectId(userdata._id)}, {$set: {quotes: allquotes}});
            }
        })
    }

    static update(user, ind, task){
        const db = getDB();
        return db.collection('thoughts').findOne({userId: new ObjectId(user._id)}).then(userData => {
            const quotes = {...userData.quotes};
            const keys = Object.keys(quotes);
            console.log(task);
            quotes[task] = false;
            delete quotes[keys[ind]];
            console.log(quotes);
            return db.collection('thoughts').updateOne({_id: new ObjectId(userData._id)}, {$set: {quotes: quotes}});
        })
    }

    static delete(userId, ind){
        const db = getDB();
        return db.collection('thoughts').findOne({userId: userId}).then(userObject => {
            let allquotes = {...userObject.quotes};
            const keys = Object.keys(allquotes);
            delete allquotes[keys[ind]];
            return db.collection('thoughts').updateOne({_id: userObject._id}, {$set: {quotes: allquotes}})
        })
    }
}

module.exports = thoughts;