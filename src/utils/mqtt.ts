import * as mqtt from 'mqtt/dist/mqtt.min';
import type { IClientOptions, MqttClient } from "mqtt";
import { errorToast, successToast } from "./toastUtil";

interface MqttConnection {
  client: MqttClient | null,
  promise: Promise<MqttClient> | null
}

let cachedConnection: MqttConnection = { client: undefined, promise: undefined }

export const connectAsync = (brokerURL, opts, allowRetries = true) => {
    const client = mqtt.connect(brokerURL, opts);

    return new Promise<MqttClient>((resolve, reject) => {
      // Listeners added to client to trigger promise resolution
      const promiseResolutionListeners = {
        connect: (connack) => {
          removePromiseResolutionListeners();
          resolve(client);   // Resolve on connect
        },
        end: () => {
          removePromiseResolutionListeners();
          resolve(client);   // Resolve on end
        },
        error: (err) => {
          removePromiseResolutionListeners();
          client.end();
          reject(err);            // Reject on error
        }
      };

      // TODO: Fix
      // If retries are not allowed, reject on close
      // if (false === allowRetries) {
      //   promiseResolutionListeners.close = () => {
      //     promiseResolutionListeners.error('Couldn\'t connect to server');
      //   }
      // }

      // Remove listeners added to client by this promise
      function removePromiseResolutionListeners () {
        Object.keys(promiseResolutionListeners).forEach((eventName) => {
          client.removeListener(eventName, promiseResolutionListeners[eventName]);
        });
      }

      // Add listeners to client
      Object.keys(promiseResolutionListeners).forEach((eventName) => {
        client.on(eventName, promiseResolutionListeners[eventName]);
      });
    });
}

export const getMqttConnection = async () => {
  if (cachedConnection && cachedConnection.client && cachedConnection.client.connected) {
    return cachedConnection.client;
  }

  if (!cachedConnection.promise) {
    const opts: IClientOptions = {
      username: import.meta.env.VITE_MQTT_USERNAME,
      password: import.meta.env.VITE_MQTT_PASSWORD,
      hostname: import.meta.env.VITE_MQTT_HOSTNAME,
      port: parseInt(import.meta.env.MQTT_PORT ?? "9001"),
      protocol: import.meta.env.VITE_MQTT_PROTOCOL ?? "ws"
    }

    cachedConnection.promise = Promise.race([connectAsync("/", opts), getTimeoutPromise()])
      .then((client) => {
        return client;
      }, (err) => {
        return null
      })
  }

  cachedConnection.client = await cachedConnection.promise
  cachedConnection.promise = undefined
  return cachedConnection.client
}

const getTimeoutPromise = async () => {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('Connection timed out')), 5000);
  });
}

export const sendRequest = async (action: string) => {
  const mqttClient = await getMqttConnection()

  try {
    mqttClient.publish("potatoes", action)
  } catch (err) {
    console.log(err);
    errorToast("Error sending request")
  }
}