    
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

              switcher1();
              servoInclinacion();
              verTemperatura();


}

function switcher1(){

if ($("#switcher1").hasClass("off")) {
              $("#switcher1").addClass("on");
              $("#switcher1").removeClass("off");


              $("#textSwitch1").html("");
              $("#textSwitch1").html("ON");

              $("#switcher1").css("background", "black");
              $("#switch1").css("background", "#A3D900");	
          }else{
          	   $("#switcher1").addClass("off");
              $("#switcher1").removeClass("on");


              $("#textSwitch1").html("");
              $("#textSwitch1").html("OFF");

              $("#switcher1").css("background", "transparent");
              $("#switch1").css("background", "transparent");	
          }




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
              $("#imgservo").css("transform", "rotate(-30deg)");	
}

function verHumedad(){
              $(".btn").removeClass("btnActivo");
              $("#btn2").addClass("btnActivo");
}

function verTemperatura(tempe){
              $(".btn").removeClass("btnActivo");
              $("#btn1").addClass("btnActivo");

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");	

actual = tempe.substr(0,2);
// alert(tempe.substr(0,2));

$("#temp").html("");
$("#temp").html(actual+"°");

// temperatura=((360/8)-45)+actual;

function renderTime(){
	
temperatura=actual*8;

	grado=Math.PI/180;
	Xinicio=137;
	Yinicio=115;
	RadioCirculo=90;


	Ai=grado*0;
	Af=grado*temperatura;

	ctx.beginPath();
	ctx.arc(Xinicio,Yinicio, RadioCirculo, Ai, Af);
	ctx.lineWidth=5;
	ctx.strokeStyle="#A3D900";
	ctx.shadowBlur = 2;
	ctx.shadowColor = '#A3D900';
	ctx.stroke();
	while(actual>360){
		actual=360;
	}
}

setInterval(renderTime,40);

}