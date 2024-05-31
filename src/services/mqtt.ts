import mqtt from 'mqtt';
import dotenv from 'dotenv';


dotenv.config();

export const setupMQTT = () => {
  // Se connecter au broker MQTT
  const mqttClient = mqtt.connect('mqtt://82.66.182.144:1883');

  // Gérer l'événement de connexion au broker MQTT
  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    // S'abonner au topic 'sensor/data' pour recevoir les données des capteurs
    mqttClient.subscribe('sensor/data');
  });

  // Gérer l'événement de réception d'un message MQTT
  mqttClient.on('message', async (topic, message) => {
    // Vérifier si le message provient du topic 'sensor/data'
    if (topic === 'sensor/data') {
      // Parser les données JSON reçues
      const data = JSON.parse(message.toString());

      // Créer l'objet de données à envoyer à l'application
      const hiveData = {
        hiveId: data.hive_id,
        time: data.data.timestamp,
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
      console.log('hiveData:', hiveData);

      try {
        // Envoyer les données à l'application via une requête POST en utilisant fetch
        const response = await fetch(`${process.env.APP_URL}/hives/data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hiveData),
        });

        // Vérifier si la réponse est OK (code de statut 200)
        if (response.ok) {
          const data = await response.json();
          console.log('Data sent to application:', data);
        } else {
          console.error('Error sending data to application:');
          console.error('Status code:', response.status);
          console.error('Response data:', await response.text());
        }
      } catch (error) {
        console.error('Error sending data to application:', error);
      }
    }
  });
};