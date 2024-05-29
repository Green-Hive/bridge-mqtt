import mqtt from 'mqtt';
import axios from 'axios';

export const setupMQTT = () => {
  const mqttClient = mqtt.connect('mqtt://82.66.182.144:1883');

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('test/sensor/data');
  });

  mqttClient.on('message', async (topic, message) => {
    if (topic === 'test/sensor/data') {
      const data = JSON.parse(message.toString());
      console.log('Data received from MQTT:', data);
      // Ajoutez ici la logique pour envoyer les données à votre application
    }
  });
};