const express = require('express');
const app = express();
const morgan = require('morgan');
const downloadRoutes = require("./api/routes/download");
const storageRoutes = require("./api/routes/storage");
const mongoose = require("mongoose");
const videoRoutes = require("./api/routes/videos");
const playlistRoutes = require("./api/routes/playlists");

const bodyParser = require("body-parser");

//morgan sert a avoir des logs dans le terminal
app.use(morgan('dev'));
//body-parser permet de faire req.body.name
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://teddy:GOULAGTV@cluster0-2heou.mongodb.net/goulagtv?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

//Anticiper les erreurs de CORS
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
        return res.status(200).json({});
    }
    next();
});


app.use('/download', downloadRoutes);
app.use('/storage', storageRoutes);

// Routes which should handle requests
app.use("/videos", videoRoutes);
app.use("/playlists", playlistRoutes);

//Prendre en charge les erreurs de requetes
app.use( (req,res,next) => {
    const error = new Error("Not Found !");
    error.status = 404;
    next(error);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
});

module.exports = app;