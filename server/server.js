var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3');
const parser = new Readline();
port.pipe(parser);


io.on('connection',function(socket){
    console.log("Alguien se conecto a la pagina.");
});

port.on('error', function(err) {
  console.log('Error al conectar con el ARDUINO: ', err.message);
});

port.on('open', function(){
   console.log('El ARDUINO está disponible.');
});

parser.on('data', function(lectura){
  var cadena = lectura.split(",");
  var hum= cadena[0];
  var temp= cadena[1];
  console.log("La humedad Actual es: "+hum);
  console.log("La temperatura Actual es: "+temp);

  io.sockets.emit('Temperatura', temp);
  io.sockets.emit('Humedad', hum);

});


app.get('/',function(req,res){
  res.sendfile(__dirname+'/index.html');
});

server.listen(8080,function(){
  console.log("Alguien se conecto al servidor.");
});
