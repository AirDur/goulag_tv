const express = require('express');
const app = express();
const morgan = require('morgan');
const downloadRoutes = require("./api/routes/download");
const storageRoutes = require("./api/routes/storage");
const bodyParser = require("body-parser");

//morgan sert a avoir des logs dans le terminal
app.use(morgan('dev'));
//body-parser permet de faire req.body.name
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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