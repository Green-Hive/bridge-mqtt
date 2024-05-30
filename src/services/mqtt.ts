import mqtt from 'mqtt';
import axios, { AxiosError } from 'axios';

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

      // Créer l'objet de données à envoyer à l'application
      const hiveData = {
        hiveId: data.hive_id,
        time: Date.now(),
        tempBottomLeft: data.data.tempBottomLeft,
        tempTopRight: data.data.tempTopRight,
        tempOutside: data.data.tempOutside,
        pressure: data.data.pressure,
        humidityBottomLeft: data.data.humidityBottomLeft,
        humidityTopRight: data.data.humidityTopRight,
        humidityOutside: data.data.humidityOutside,
        weight: data.data.weight,
        magnetic_x: data.data.magnetic_x,
        magnetic_y: data.data.magnetic_y,
        magnetic_z: data.data.magnetic_z,
      };

      try {
        // Envoyer les données à l'application via une requête POST
        const response = await axios.post(`${process.env.APP_URL}/api/hives/data`, hiveData);
        console.log('Data sent to application:', response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Error sending data to application:', axiosError.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    }
  });
};