const http = require('http');

const express = require('express');

const app = express();

const path = require('path');

const server=require('http').createServer(app);


//---------------------------------------------------- Configuracion del Servidor-----------------------------
const hostname='127.0.0.1';
const port=3000;



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

//--------------------------------------- Pagina de error-------------------------------------------
app.get('*',function(solictud,respuesta){
    respuesta.send("Error 404");
});

//------------------------------------------------- Configuracion de IP Y PUERTO -------------------------------------------------
server.listen(port,hostname,()=>{
  console.log("Cliente Iniciado");
});