require('dotenv').config()
const { getDB } = require('../database/mongodb')
const { ObjectId } = require('mongodb') //for the unique _id identifier
const bcrypt = require('bcryptjs')

const User = class User{
    constructor(name, email, password){
        this.name = name;
        this.email = email;
        this.password = password;
        // this.todo = todo? todo: {};
        // this.roadmap = roadmap? roadmap: {};
        // this.sf = sf? sf: {};
        // this.targets = targets? targets: {};
        // this.thoughts = thoughts? thoughts: {};
    };

    save(){
        const db = getDB().client.db();
        // console.log(this)
        return db.collection('users').insertOne(this);
    }

    static findUser = async(email, password) => {
        const db = getDB().client.db();
        // console.log(db);
        const query = await db.collection('users').findOne({
            email: email
        })
        // console.log(query);
        if(query && query.password === password)
            return query;
        return null;
    }
}

module.exports = User