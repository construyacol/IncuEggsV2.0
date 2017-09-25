#include <Servo.h>                    // Incluir la librería Servo 
#include <LiquidCrystal.h> //Libreria para el LCD
#include<Wire.h> //Libreria para el LCD
#include <LiquidCrystal_I2C.h> //Libreria para el LCD
#include <DHT.h> //cargamos la librería DHT.
#define DHTPIN 2  //Seleccionamos el pin 2 digital en el que se conectará el sensor.
#define DHTTYPE DHT22 //Se selecciona el DHT22.
DHT dht(DHTPIN, DHTTYPE); //Se inicia una variable que será usada por Arduino para comunicarse con el sensor.
//DECLARAMOS VARIABLES.

int bombillo1= 28; //Declaramos pin 28DIG, de las bombillas
int bombillo2= 29; //Declaramos pin 29DIG, de las bombillas
int ventilador1=32; //Declaramos pin 30DIG, para controlar el ventilador 1
int ventilador2=33; //Declaramos pin 31DIG, para controlar el ventilador 2
int comandosEntrada;

Servo servo1; //Se inicia una variable que será usada por Arduino para comunicarse con el servo.
LiquidCrystal_I2C lcd(0x3F,16,2); //Se inicia una variable que será usada por Arduino para comunicarse con la pantalla LCD. 





void setup() {
  // put your setup code here, to run once:
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
  int grados=45;
  int intervalitos=0;
  
void loop() {
  int temperatura = dht.readTemperature();
  int humedad = dht.readHumidity();

 
 

    
  char switch1 = Serial.read();

  if(switch1>3){

  switch1=0;
  
  while(Serial.available()==0){
    
      tempe();
      humedad1();
      autoCalefaccion();
      moverServo18();
      //autoExtractor();
      mostrarLCD();
      Serial.println();
      delay(1000);
      switch1=switch1+4;      
    };

   char switch2 = Serial.read();
  switch(switch2){
    case '1':
    //Serial.println("Prendido");
    calefacciON(); 
    break;

    case '2':
    //Serial.println("Apagado");
    calefacciOFF();
    break;

    case '3':
    break;
    case 'x':
    //Ultimos 3Dias;
    intervalitos = 10;
    moverServo18();

    
    break;
    
  }


}

 
}

int  moverServo18(){
  
  //grados = grados + 0.0125;
 
  if(intervalitos == 2){
    
    if(grados<136){
      grados = grados + 15;
      servo1.write(grados); 
      
    }else{
      grados=45;
      servo1.write(grados);
    }

    
    intervalitos=0;
    }else if(intervalitos>9){
      grados=90;
      servo1.write(grados);
    };
    Serial.print(grados);
    
    intervalitos++;
    

  }

int  autoExtractor(){
     int humedad = dht.readHumidity();
     if(humedad<50){
       extractON();
      }else{
      extractOFF();
      }
  
  }

int autoCalefaccion(){
   int temperatura = dht.readTemperature();
    if(temperatura<38){
    calefacciON(); 
    }else{
      calefacciOFF();
      }
  
  }




int tempe(){
 int temperatura = dht.readTemperature();
 
  Serial.print(temperatura);
  Serial.print(",");
 
  }




void humedad1(){
int  humedad = dht.readHumidity();

  Serial.print(humedad);
  Serial.print(",");
  
  }



void calefacciON(){
  //Prender bombillos
  Serial.print("BON");
   Serial.print(",");
  digitalWrite(bombillo1,HIGH);
  digitalWrite(bombillo2,HIGH);
  }




void calefacciOFF(){
  //Apagar bombillos
  Serial.print("BOFF");
    Serial.print(",");
   digitalWrite(bombillo1,LOW);
   digitalWrite(bombillo2,LOW);
  }


void extractON(){
  //Prender bombillos
  //Serial.print("EON");
  // Serial.print(",");
  digitalWrite(ventilador1,HIGH);
  digitalWrite(ventilador2,HIGH);
  }




void extractOFF(){
  //Apagar bombillos
   //Serial.print("EOFF");
    //Serial.print(",");
   digitalWrite(ventilador1,LOW);
   digitalWrite(ventilador2,LOW);
  }

int mostrarLCD(){
  int temperatura = dht.readTemperature();
  int humedad = dht.readHumidity();
    lcd.setCursor(0,0);
    lcd.print("Temperatura:");
    lcd.print(temperatura);
  
    lcd.setCursor(0,1);
    lcd.print("Humedad:");
    lcd.print(humedad);
    lcd.print("%   ");//--CAMBIAR "  " 
  }

