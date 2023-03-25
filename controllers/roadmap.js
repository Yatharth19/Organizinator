const express = require('express')
const roadmap = require('../models/Roadmap')
const url = require('url')

const getRoadMap = async (req, res, next) => {
    try{
        if(!req.session){
            res.send('Not Authorized');
        }
        const user = req.session.user;
        const userId = user._id;
        
        const allroadMap = await roadmap.find(userId);

        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        if(!query.delete){
            let roadMap = null;
            if(allroadMap)
                roadMap = allroadMap.roadmap;
            res.render('functionalities/roadmap', {
                pageTitle: 'RoadMap',
                roadmap: roadMap
            })
        }else{
            const ind = query.delete;
            const road = await roadmap.delete(user, ind);
            res.redirect('/roadmap')
        }
    }catch(err){
        res.send('Some Error Occured');
    }
}

const postRoadMap = async (req, res, next) => {
    try{
        if(!req.session){
            res.send('Not authorized');
        }
        const user = req.session.user;
        const roadMap = await roadmap.add(user, req.body.name);
        // getAllTasks();
        res.redirect('/roadmap');
    }catch(err){
        res.send('Some error occured');
    }
}

const getOneRoadMap = async (req, res, next) => {
    try{
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;
        const ind = query.id;        
        const user = req.session.user;
        const roadMap = await roadmap.getOne(user, ind);
        res.render('functionalities/edit', {
            pageTitle: 'Edit',
            task: roadMap
        });
    }catch(err){
        // console.log(err);
        res.send('Some error occured');
    }
}

const updateRoadMap = async (req, res, next) => {
    try{
        const user = req.session.user;
        const parsedUrl = url.parse(req.url, true);
        // console.log(parsedUrl);
        const query = parsedUrl.query;
        const ind = query.id;    
        const roadMap = await roadmap.update(user, ind, req.body.name);
        res.redirect('/roadmap');
    }catch(err){
        console.log(err);
        res.send('Some error occured');
    }
}


module.exports = {
    getRoadMap, 
    postRoadMap,
    getOneRoadMap,
    updateRoadMap
}