import express from 'express';
import bodyParser from 'body-parser';
import mqtt from 'mqtt';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mqttClient = mqtt.connect('mqtt://82.66.182.144:1883');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('test/sensor/data');
});

mqttClient.on('message', async (topic, message) => {
    if (topic === 'test/sensor/data') {
      const data = JSON.parse(message.toString());
      
      // Afficher les données reçues dans la console
      console.log('Data received from MQTT:', data);
      
      // Vérifier si toutes les données requises sont présentes
//       if (data.hiveId && data.temp && data.hum && data.weight && data.inclination !== undefined) {
//         try {
//           // Envoyer les données à l'application via une requête POST
//           const response = await axios.post('http://url-de-votre-application/api/hives/data', data);
//           console.log('Data sent to application:', response.data);
//         } catch (error) {
//           console.error('Error sending data to application:', error.message);
//         }
//       } else {
//         console.log('Incomplete data received:', data);
//       }
    }
  });

app.get('/', (req, res) => {
    res.send('Hello from the bridge server!');
  });