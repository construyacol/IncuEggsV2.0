#include <DHT.h>
#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

float h;
float t;

void setup(){
    Serial.begin(9600);
    dht.begin();
  }

void loop(){
    h=dht.readHumidity();
    t=dht.readTemperature();

    Serial.println(h);
     Serial.println(t);
    //Serial.println();
    delay(1000);
  }


