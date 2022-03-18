import * as mqtt from "async-mqtt"
import {AsyncMqttClient, IClientOptions} from "async-mqtt";

interface MqttConnection {
  client: AsyncMqttClient | null,
  promise: Promise<AsyncMqttClient> | null
}

// TODO: Fix ts error
let cachedConnection = global.mqtt

if (!cachedConnection) {
  cachedConnection = global.mqtt = {client: null, promise: null}
}

export const getMqttConnection = async (): Promise<AsyncMqttClient> => {
  if (cachedConnection.client && cachedConnection.client.connected) {
    return cachedConnection.client;
  }

  if (!cachedConnection.promise) {
    const opts: IClientOptions = {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      hostname: process.env.MQTT_HOSTNAME,
      port: parseInt(process.env.MQTT_PORT ?? "1883"),
      protocol: "mqtt"
    }

    cachedConnection.promise = Promise.race([mqtt.connectAsync("/", opts), getTimeoutPromise()])
      .then((client) => {
        return client;
      }, (err) => {
        return null
      })
  }

  cachedConnection.client = await cachedConnection.promise
  cachedConnection.promise = null
  return cachedConnection.client
}

const getTimeoutPromise = async () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Connection timed out')), 5000);
  });
}