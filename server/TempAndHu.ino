#include <Arduino.h>
#include <dht_nonblocking.h>
#define DHT_SENSOR_TYPE DHT_TYPE_11
#define BLU 5
#define GREEN 6
#define RED 7

static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );


void setup( ) {
  pinMode(BLU, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(RED, OUTPUT);
  Serial.begin(9600);
}

static bool measure_environment( float *temperature, float *humidity ) {
  static unsigned long measurement_timestamp = millis( );

  /* Measure once every four seconds. */
  if( millis( ) - measurement_timestamp > 3000ul )
  {
    if( dht_sensor.measure( temperature, humidity ) == true )
    {
      measurement_timestamp = millis( );
      return( true );
    }
  }

  return( false );
}


void loop( ) {
  float temperature;
  float humidity;

  if( measure_environment( &temperature, &humidity ) == true ) {

    Serial.print(temperature);
    Serial.print(":");
    Serial.print(humidity);
    Serial.println();

    digitalWrite(RED, LOW);
    digitalWrite(BLU, LOW);
    digitalWrite(GREEN, LOW);

    if(temperature > 25) {
      digitalWrite(RED, HIGH);   
    } else if(temperature < 18) {
      digitalWrite(BLU, HIGH);
    } else {
      digitalWrite(GREEN, HIGH);
    }
  }
}
