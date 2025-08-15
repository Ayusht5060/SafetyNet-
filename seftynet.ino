#include <Wire.h>
#include "MAX30105.h"  
#include "heartRate.h" 
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
 
#define BUTTON_PIN 2
 
SoftwareSerial gpsSerial(4, 3);  
TinyGPSPlus gps;
 
MAX30105 particleSensor;
 
bool emergencyDetected = false;
 
void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);

  pinMode(BUTTON_PIN, INPUT_PULLUP);
 
  if (!particleSensor.begin(Wire, I2C_SPEED_STANDARD)) {
    Serial.println("MAX30102 not found. Please check wiring.");
    while (1);
  }
  
  particleSensor.setup();  
  particleSensor.setPulseAmplitudeRed(0x0A);  
  particleSensor.setPulseAmplitudeGreen(0);  
  
  Serial.println("SafeGuard System Started");
}

void loop() {
  checkHeartRate();
  checkButton();
  readGPS();

  if (emergencyDetected) {
    triggerAlert();
    emergencyDetected = false; 
  }
}
 
void checkHeartRate() {
  long irValue = particleSensor.getIR();
  
  if (checkForBeat(irValue)) {
    float bpm = getHeartRate();
    Serial.print("Heart Rate: ");
    Serial.println(bpm);
 
    if (bpm > 140 || bpm < 50) { 
      Serial.println("⚠ Emergency detected from heart rate!");
      emergencyDetected = true;
    }
  }
}
 
void checkButton() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    Serial.println("🚨 Manual alert button pressed!");
    emergencyDetected = true;
  }
}
 
void readGPS() {
  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }

  if (gps.location.isUpdated()) {
    Serial.print("Lat: "); Serial.println(gps.location.lat(), 6);
    Serial.print("Lng: "); Serial.println(gps.location.lng(), 6);
  }
}
 
void triggerAlert() {
  Serial.println("=== ALERT TRIGGERED ===");
  if (gps.location.isValid()) {
    Serial.print("Location: ");
    Serial.print(gps.location.lat(), 6);
    Serial.print(", ");
    Serial.println(gps.location.lng(), 6);
  } else {
    Serial.println("GPS not ready");
  }
 
}
 
float getHeartRate() {
  static int beats[5];
  static int index = 0;
  static float avgBPM = 0;

  beats[index++] = (int)beatAvg;
  if (index > 4) index = 0;

  int sum = 0;
  for (int i = 0; i < 5; i++) sum += beats[i];
  avgBPM = sum / 5.0;

  return avgBPM;
}
