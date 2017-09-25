    
 //   $(document).ready(function(){

 //    // $(document).mouseup(function (e) {
 //    // var container = $("#datUsuarioExp");
 //    // if (!container.is(e.target) && container.has(e.target).length === 0) 
 //    // {
 //    //     $("#datUsuarioExp").css("animation", "chao .3s forwards");
 //    //      // clearTimeout(timeoutId);
 //    //   }     
 //    //  });




 // });

function actionIncu(){

              $("#action").css("clip-path", "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)");

              $("#textAction").html("");
              $("#textAction").html("DETENER");

                var accionar = $("#dato").val();
  				      socket.emit('iniciarinc', accionar); 

             
              
              mostrarTemperatura();
              dias();
              chartON();
              // diasTranscu();
              setTimeout(diasTranscu,700)


}

function diasTranscu(){
 
    var dT = $("#tasa").html();


     var d1= $("#dia span:first").html();
     var d2= $("#dia span:last").html();
     var dia = d1+""+d2;

    var allday=20-dia;

    var tran=(allday*100)/21

    var tasa = tran.toString();
    var tasac = tasa.substr(0,2);


      console.log("DIAS TRANSCURRIDOS: "+allday+" DIAS RESTANTES "+dia+"Tasa equivalente:" +tasac+"%");
      $("#tasa").html("");
      $("#tasa").html(allday);
      $("#porcent").html(tasac+"%");


      $("#progresado").css("opacity", "1");

      $("#progresado").css("width", tasac+"%");






}

function switcher1(){

if ($("#switcher1").hasClass("off")) {

                 prenderBombillo()
          }else{
                  apagarBombillo(); 
          }

}

function dias(){



  $("#contador").attr("uk-countdown","date: 2017-10-05");
  
}

function fecha(){

          // var d1= $("#dia span:first").html();
          // var d2= $("#dia span:last").html();
          // var dia = d1+""+d2;

           var seg1= $("#segundo span:first").html();
          var seg2= $("#segundo span:last").html();
          var segundo = seg1+""+seg2;

          // socket.emit('fecha', dia);

          if (segundo>1) {

          var lectura = 'x';
          // alert("hoy es el dia"+" "+lectura);
          console.log("hoy es el dia"+" "+lectura);

          socket.emit('diaX', lectura);
          mostrarHumedad();

          }else{
            // alert("hoy NO es el dia");
          }


          // }

          

                  // setTimeout(fecha, 5000);

          // setInterval(fecha,500);


}

function apagarBombillo(){

             $("#switcher1").addClass("off");
              $("#switcher1").removeClass("on");


              $("#textSwitch1").html("");
              $("#textSwitch1").html("OFF");

              $("#switcher1").css("background", "transparent");
              $("#switch1").css("background", "transparent"); 

}

function prenderBombillo(){

              $("#switcher1").addClass("on");
              $("#switcher1").removeClass("off");


              $("#textSwitch1").html("");
              $("#textSwitch1").html("ON");

              $("#switcher1").css("background", "black");
              $("#switch1").css("background", "#A3D900");

}

function switcher2(){

if ($("#switcher2").hasClass("off")) {
              $("#switcher2").addClass("on");
              $("#switcher2").removeClass("off");


              $("#textSwitch2").html("");
              $("#textSwitch2").html("ON");

              $("#switcher2").css("background", "black");
              $("#switch2").css("background", "#A3D900");	
          }else{
          	   $("#switcher2").addClass("off");
              $("#switcher2").removeClass("on");


              $("#textSwitch2").html("");
              $("#textSwitch2").html("OFF");

              $("#switcher2").css("background", "transparent");
              $("#switch2").css("background", "transparent");	
          }

}

function servoInclinacion(){
              $("#imgservo").css("transform", "rotate(-"+20+"deg)");	
              // console.log('inclinación llego: 'servos);
              // $("#imgservo").css("transform", "rotate("+servo+"deg)");  
}




function Humedad(lect){



var canvas = document.getElementById("canvas2");

var actual = lect;
// alert(tempe.substr(0,2));

$("#Hum").html("");
$("#Hum").html(actual+"°");

// temperatura=((360/8)-45)+actual;
var lectura=actual*4.5;

setInterval(renderTime(lectura, actual, canvas),40);

}

function mostrarHumedad(){

  $("#temperatura").css("display", "none"); 
  $("#humedad").css("display", "initial"); 

  $(".btn").removeClass("btnActivo");
  $("#btn2").addClass("btnActivo");
}

function mostrarTemperatura(){

  $("#humedad").css("display", "none"); 
  $("#temperatura").css("display", "initial"); 

  $(".btn").removeClass("btnActivo");
  $("#btn1").addClass("btnActivo");
}

function Temperatura(lect){



var canvas = document.getElementById("canvas");
var actual = lect;
// alert(tempe.substr(0,2));

$("#temp").html("");
$("#temp").html(actual+"°");

// temperatura=((360/8)-45)+actual;

var lectura=actual*8;

setInterval(renderTime(lectura, actual, canvas),40);


}

function renderTime(lectura, actual, canvas){

  var ctx = canvas.getContext("2d");  


  grado=Math.PI/180;
  Xinicio=137;
  Yinicio=115;
  RadioCirculo=90;


  Ai=grado*0;
  Af=grado*lectura;

  ctx.beginPath();
  ctx.arc(Xinicio,Yinicio, RadioCirculo, Ai, Af);
  ctx.lineWidth=5;
  ctx.strokeStyle="#A3D900";
  ctx.shadowBlur = 2;
  ctx.shadowColor = '#A3D900';
  ctx.stroke();
  while(actual>360){
    actual=350;
  }
}