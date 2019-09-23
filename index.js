const http = require('http');

const express = require('express');

const app = express();

const path = require('path');

const server=require('http').createServer(app);

const bodyParser = require('body-parser');

const request = require('request');

//---------------------------------------------------- Configuracion del Servidor-----------------------------
const hostname='127.0.0.1';
const port=3000;

const hostnameVS = 'https://localhost';
const portVS = 5001;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));


app.get("/",function(solictud,respuesta){
    respuesta.sendFile(path.join(__dirname + '/public/Pages/login.html'));
});

//----------------------------------------------- Pagina donde se escogera la dificultad -------------------------
app.get("/dificultad", function(req, res){
    res.sendFile(path.join(__dirname + '/public/Pages/dificultad.html'));
});

//----------------------------------------------- Pagina para principiantes -----------------------------------------
app.get("/principiante", function(req, res){
    res.sendFile(path.join(__dirname + '/public/Pages/principiante.html'));
});

//----------------------------------------------- Pagina para intermedio ---------------------------------------------
app.get("/intermedio",function(req,res){
    res.sendFile(path.join(__dirname + '/public/Pages/intermedio.html'));
});

app.get("/avanzado",function(req,res){
    res.sendFile(path.join(__dirname + '/public/Pages/avanzado.html'));
});


app.post("/sendLup", function(req,res){
    let lup = req.body.cuerpo;
    var retorno = {
        "cuerpo" : "error"
    };

    let cuerpo = {};
    let codigo = 'codigo';
    cuerpo[codigo] = lup;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    request({
        "headers" : {
            'Content-Type': 'application/json; charset=utf-8',
            'json' : true
        },
        "uri" : hostnameVS + ":" + portVS + "/api/LenguajeLup",
        "method" : "POST",
        "json" : cuerpo
    },(err,ress,body) =>{
        if(!err)retorno["cuerpo"] = body
        else console.error(err);
        res.json(retorno);
    });
    
});

function getResultLogin(cuerpo){
    
}


//--------------------------------------- Pagina de error-------------------------------------------
app.get('*',function(solictud,respuesta){
    respuesta.send("Error 404");
});

//------------------------------------------------- Configuracion de IP Y PUERTO -------------------------------------------------
server.listen(port,hostname,()=>{
  console.log("Cliente Iniciado");
});