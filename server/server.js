const express = require("express");
const hbs = require("hbs");
var path = require("path");
const fs = require('fs');
var app = express();
//default directory is views if want to change use next statement
app.set('views', path.join(__dirname, './../myviews'));
// use to set partials folder for app
hbs.registerPartials(__dirname+'./..//myviews/partials/');
app.set("view engine","hbs");
app.use(express.static(__dirname+'./../public'));
//midleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    fs.appendFile('app.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to write into file');
        }
    });
    next();
});

app.get('/',(req,res)=>{
    res.render('index.hbs',{
        pageTitle:'Node Web Server Example Home Page',
        heading:'Home Page',
        pageBody:'Some Text Body here',
        year:new Date().getFullYear()
    });
});
 
app.listen(5000,()=>{
    console.log('Server running at 5000');
});