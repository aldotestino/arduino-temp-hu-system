#include <dht_nonblocking.h>
#include <LiquidCrystal.h>
#define DHT_SENSOR_TYPE DHT_TYPE_11

static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );
LiquidCrystal lcd(7,8,9,10,11,12);


/*
 * Initialize the serial port.
 */
void setup( )
{
  lcd.begin(16,2);
  Serial.begin(9600);
}



/*
 * Poll for a measurement, keeping the state machine alive.  Returns
 * true if a measurement is available.
 */
static bool measure_environment( float *temperature, float *humidity )
{
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



/*
 * Main program loop.
 */
void loop( )
{
  float temperature;
  float humidity;

  /* Measure temperature and humidity.  If the functions returns
     true, then a measurement is available. */
  if( measure_environment( &temperature, &humidity ) == true )
  {
    lcd.setCursor(0,0);
    lcd.print("Temp         C  ");
    lcd.setCursor(6, 0);
    lcd.print(temperature);
    
    lcd.setCursor(0,1);
    lcd.print("Hu         %  ");
    lcd.setCursor(4, 1);
    lcd.print(humidity);


    Serial.print(temperature);
    Serial.print(":");
    Serial.print(humidity);
    Serial.println();
  }
}
