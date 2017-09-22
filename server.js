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

   socket.on('iniciarinc', function(lecturaCliente){
   console.log(lecturaCliente);
   port.write(lecturaCliente);
   
  });

});

port.on('error', function(err) {
  console.log('Error al conectar con el ARDUINO: ', err.message);
});

port.on('open', function(){
   console.log('El ARDUINO está disponible.');
});

parser.on('data', function(lectura){
  // var lect = lectura.toString();
  // console.log("Lectura: "+lect);
  var cadena = lectura.split(",");
  var temp= cadena[0];
  var hum= cadena[1];
  var time=cadena[2];

  console.log("La temperatura Actual es: "+temp);
  console.log("La humedad Actual es: "+hum);
  console.log("El tiempo actual es: "+time);

  io.sockets.emit('Temperatura', temp);
  // io.sockets.emit('Humedad', hum);
  // io.sockets.emit('tiempo', time);
});
app.use(express.static("public"));

app.get('/',function(req,res){
  res.sendfile(__dirname+'/public/index.html');
});

server.listen(8000,function(){
  console.log("Alguien se conecto al servidor.");
});
