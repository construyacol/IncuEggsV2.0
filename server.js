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



  socket.on('diaX', function(x){

   var dia=x;
   

   // console.log(dia+" "+hora);
   // var enviarDia = dia.toString();
   // console.log("Enviando día: "+dia);
   port.write(dia);
   port.write('4');
   // port.write(hora);

   
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
  var bombillo=cadena[2];
  var servo=cadena[3];

  // console.log("dia: "+temp);

  console.log("La temperatura Actual es: "+temp);
  console.log("La humedad Actual es: "+hum);
  console.log("El bombillo esta: "+bombillo);
  console.log("Inclinación servo: "+servo);

  io.sockets.emit('Temperatura', temp);
  io.sockets.emit('Humedad', hum);
  io.sockets.emit('bombillo', bombillo);
  io.sockets.emit('servo', servo);

});
app.use(express.static("public"));

app.get('/',function(req,res){
  res.sendfile(__dirname+'/public/index.html');
});

server.listen(8000,function(){
  console.log("Alguien se conecto al servidor.");
});
