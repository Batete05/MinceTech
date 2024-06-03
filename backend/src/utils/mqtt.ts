import { createVerification } from "@/services/verification-services";
import { notifyVerification, sendVerificationNotification } from "@/utils/pusher";
import mqtt from "mqtt";

const options: mqtt.IClientOptions = {
  host: process.env.MQTT_BROKER,
  port: 8883,
  protocol: "mqtts",
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 8883,
};

export function setupMqtt() {
  console.log("Initialize mqtt...");

  const client = mqtt.connect(options);

  client.on("connect", function () {
    console.log("Connected");
  });

  client.on("offline", () => {
    console.log("Client is offline");
  });

  client.on("reconnect", () => {
    console.log("Reconnecting to MQTT broker");
  });

  client.on("end", () => {
    console.log("Connection to MQTT broker ended");
  });

  client.on("message", async (topic, message) => {
    try {
      console.log(`Received message on topic ${topic}: ${message}`);
      if (topic === "iot/uid") {
        const data = JSON.parse(message.toString()) as { uid: string };
        if (data.uid) {
          const currentDate = new Date();
          const expiryDate = new Date(currentDate.getTime() + 5 * 60 * 1000);

          const res = await createVerification({
            uid: data.uid,
            expiresAt: expiryDate,
          });
          console.log("created verification", res[0]?.id);
          if (res.length > 0 && res[0]) {
            await sendVerificationNotification(res[0]);
            await notifyVerification(res[0])
            console.log("verification notification sent", res[0]?.id);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  });

  client.on("error", (err) => {
    console.error("Error connecting to MQTT broker:", err.message);
  });

  client.subscribe("iot/uid");
}
