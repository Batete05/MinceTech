/*
 *  Created by TheCircuit
*/

#define SS_PIN 4  //D2
#define RST_PIN 5 //D1

#include <SPI.h>
#include <MFRC522.h>

MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
int statuss = 0;
int out = 0;
void setup() 
{
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
}
void loop() 
{
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  Serial.println();
  Serial.print(" UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  Serial.println();
  if (content.substring(1) == "8E 39 32 50") //change UID of the card that you want to give access
  {
    Serial.println(" Access Granted ");
    Serial.println(" Welcome Mr.Circuit ");
    delay(1000);
    Serial.println(" Have FUN ");
    Serial.println();
    statuss = 1;
  }
  
  else   {
    Serial.println(" Access Denied ");
    delay(3000);
  }
} 



// #include <SPI.h>
// #include <MFRC522.h>
// #include <ESP8266WiFi.h>
// #include <ESP8266HTTPClient.h>
// #include <WiFiClient.h>

// #define SS_PIN  15 // GPIO15 corresponds to D8 on NodeMCU
// #define RST_PIN  4 // GPIO4 corresponds to D2 on NodeMCU

// MFRC522 rfid(SS_PIN, RST_PIN);
// const char* ssid = "RCA";
// const char* password = "@RcaNyabihu2023";

// String serverName = "https://jsonplaceholder.typicode.com/posts";

// void setup() {
//   Serial.begin(9600);
//   SPI.begin(); // init SPI bus
//   rfid.PCD_Init(); // init MFRC522

//   Serial.println("Tap an RFID/NFC tag on the RFID-RC522 reader");
//   WiFi.begin(ssid, password);
//   Serial.println("Connecting");
//   while(WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("");
//   Serial.print("Connected to WiFi network");
// }

// void send_notification() {
//   if(WiFi.status()== WL_CONNECTED){
//       WiFiClient client;
//       HTTPClient http;

//       // Your Domain name with URL path or IP address with path
//       http.begin(client, serverName);

//       // If you need Node-RED/server authentication, insert user and password below
//       //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
//       http.addHeader("Content-Type", "application/json; charset=UTF-8");
//       int httpResponseCode = http.POST("{\"api_key\":\"tPmAT5Ab3j7F9\"}");

//       Serial.print("HTTP Response code: ");
//       Serial.println(httpResponseCode);

//       // Free resources
//       http.end();
//     }
//     else {
//       Serial.println("WiFi Disconnected");
//     }
// }

// void loop() {
//   // send_notification();
//   // delay(2000);
//   if (rfid.PICC_IsNewCardPresent()) { // new tag is available
//     if (rfid.PICC_ReadCardSerial()) { // NUID has been readed
//       MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
//       Serial.print("RFID/NFC Tag Type: ");
//       Serial.println(rfid.PICC_GetTypeName(piccType));

//       // print UID in Serial Monitor in the hex format
//       Serial.print("UID:");
//       for (int i = 0; i < rfid.uid.size; i++) {
//         Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
//         Serial.print(rfid.uid.uidByte[i], HEX);
//       }
//       Serial.println();

//       rfid.PICC_HaltA(); // halt PICC
//       rfid.PCD_StopCrypto1(); // stop encryption on PCD
//     }
//   }
// }