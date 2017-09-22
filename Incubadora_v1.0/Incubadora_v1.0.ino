#include <Servo.h>                    // Incluir la librería Servo 
#include <LiquidCrystal.h> //Libreria para el LCD
#include<Wire.h> //Libreria para el LCD
#include <LiquidCrystal_I2C.h> //Libreria para el LCD
#include <DHT.h> //cargamos la librería DHT.
#define DHTPIN 2  //Seleccionamos el pin 2 digital en el que se conectará el sensor.
#define DHTTYPE DHT22 //Se selecciona el DHT22.
DHT dht(DHTPIN, DHTTYPE); //Se inicia una variable que será usada por Arduino para comunicarse con el sensor.
//DECLARAMOS VARIABLES.
int temperatura, humedad;
int hora, minuto, segundo;
int dia=0;//Declaramos la variable dia que es la que indica dia de inicio.
int bombillo1= 28; //Declaramos pin 28DIG, de las bombillas
int bombillo2= 29; //Declaramos pin 29DIG, de las bombillas
int ventilador1=30; //Declaramos pin 30DIG, para controlar el ventilador 1
int ventilador2=31; //Declaramos pin 31DIG, para controlar el ventilador 2
int d;
int h;
int m;
int s;
int posicion=0;//Declaramos una variable para indicar los grados del servo.
int comandosEntrada;
int validacion;


Servo servo1; //Se inicia una variable que será usada por Arduino para comunicarse con el servo.
LiquidCrystal_I2C lcd(0x3F,16,2); //Se inicia una variable que será usada por Arduino para comunicarse con la pantalla LCD. 

void setup(){
  Serial.begin(9600);
  dht.begin();//Lectura del sensor.
  pinMode(bombillo1, OUTPUT);//Declaramos el pin del bombillo1 como salida.
  pinMode(bombillo2, OUTPUT);//Declaramos el pin del bombillo2 como salida.
  pinMode(ventilador1, OUTPUT);//Declaramos el pin del ventilador1 como salida.
  pinMode(ventilador2,OUTPUT);//Declaramos el pin del ventilador2 como salida.
  Wire.begin();//Lectura del I2C.
  lcd.begin(16,2);//Lectura de la pantalla LCD.
  lcd.clear();//Limpiamos pantalla.
  lcd.backlight();//Prendemos la luz de fondo del LCD. 
  servo1.attach(9); //Declaramos el pin 9 digital para el servo.
}


void procedimiento()
{
       for(d=dia+1;d<=21;d++){//Ciclo para recorrer los días.
        hora=0;
        if(d>=19){//Instrucciones para los días de nacimiento que van desde el dia 19 hasta el 21, para para los motores de rotacion.
           posicion=90;
           servo1.write(posicion);              

              if(temperatura< 37){
                  digitalWrite(bombillo1,HIGH);
                  digitalWrite(bombillo2,HIGH);
                }else{
                  digitalWrite(bombillo1,LOW);
                  digitalWrite(bombillo1,LOW);
                }
              
              if (humedad < 60){
                digitalWrite(ventilador1, LOW);
                digitalWrite(ventilador2,LOW);
                }else{
                digitalWrite(ventilador1, HIGH);
                digitalWrite(ventilador2,HIGH);
                }
        }
        
        for(h=hora;h<=23;h++){
            minuto=0;
            
            for(m=minuto;m<=59;m++){//CAMBIAR A 59
                segundo=0;
                for(s=segundo;s<=59;s++){//CAMBIAR A 59
                      temperatura = dht.readTemperature();
                      humedad = dht.readHumidity();
                      String R="";

  Serial.print(temperatura);
  Serial.print(",");
  Serial.print(humedad);
  Serial.print(",");
  R+=d;
  R+=":";
  R+=h;
  R+=":";
  R+=m;
  R+=":";
  R+=s;
  Serial.print(R);
  Serial.println();
                      if ( temperatura < 37 ){
                        digitalWrite(bombillo1, HIGH);
                        digitalWrite(bombillo2, HIGH);
                      }else if(temperatura > 37){
                         digitalWrite(bombillo1, LOW);
                         digitalWrite(bombillo2, LOW);
                      }
                    
                      if (humedad > 75){
                          digitalWrite(ventilador1, LOW);
                          digitalWrite(ventilador2,LOW);
                      }else{
                          digitalWrite(ventilador1, HIGH);
                          digitalWrite(ventilador2,HIGH);
                      }
                      
                     lcd.setCursor(0,0);
                     lcd.print("Temp:");
                     lcd.print(temperatura);                     
                     lcd.print(" Dia:");
                     lcd.setCursor(0,1);
                     lcd.print("Hum:");
                     lcd.print(humedad);
                     lcd.print("%   ");//--CAMBIAR "  "                     
                     lcd.print(d);

                     if(h==0 || h==1 || h==4 || h==5 || h==8 || h==9 || h==12 || h==13 || h==16 || h==17 || h==20 || h==21 && d<19){
               posicion=135;
               servo1.write(posicion);
            }else{
               posicion=45;
               servo1.write(posicion);
                        }
                     
                     delay(1000);//CAMBIAR A 1000
                  }
              }
          }
      }  
}
void loop(){
  
  if(Serial.available()>0)
  {
      comandosEntrada=Serial.read();
      if(comandosEntrada=='1')
      {
        validacion=1;  
      }   
  }
  
  if(validacion==1)
  {
    procedimiento();
    
  }else
  {
    lcd.clear();
    lcd.setCursor(0,0);
    lcd.print("Esperando");
    lcd.setCursor(0,1);
    lcd.print("Inicio...");
    delay(2000);
    posicion=90;
    servo1.write(posicion);
    digitalWrite(bombillo1, HIGH);
    digitalWrite(bombillo2, HIGH);
    
  }
    
}
