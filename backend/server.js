const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/user-routes');
const HttpError = require("./modals/http-error");

const app = express();
const fs = require('fs');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Access, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places',placesRoutes);

app.use('/api/users', userRoutes);

app.use((req, res, next)=>{
    const error = new HttpError("Could not find this route");
    throw error;
})

app.use((error, req, res ,next)=>{

    if(req.file){
        fs.unlink(req.file.path, err => console.log(error));
    }

    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured"});
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

const url = 'mongodb://van_astrea:abcdefgh@cluster0-shard-00-00.x7qxv.mongodb.net:27017,cluster0-shard-00-01.x7qxv.mongodb.net:27017,cluster0-shard-00-02.x7qxv.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-4xumi5-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(url).then(()=>{
    app.listen(5000);
}).catch((err)=>{
    console.log(err);
})