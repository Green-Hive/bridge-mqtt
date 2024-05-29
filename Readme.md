# MQTT Bridge Server

Ce projet est un serveur backend Node.js qui sert de pont entre un serveur MQTT Mosquitto et une application externe. Il récupère les données envoyées par un ESP32 au serveur MQTT, les traite et les envoie à l'application via une requête POST.

## Prérequis

- Node.js (version 18 ou supérieure)
- Yarn
- TypeScript

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/votre-repo/mqtt-bridge-server.git
   ```

2. Accédez au dossier du projet :
   ```
   cd mqtt-bridge-server
   ```

3. Installez les dépendances :
   ```
   yarn install
   ```

## Configuration

1. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement suivantes :
   ```
   PORT=3000
   MQTT_BROKER_URL="url du serveur mqtt "
   MQTT_TOPIC=test/sensor/data
   APP_URL=http://url-de-votre-application/api/hives/data
   ```

   Remplacez les valeurs par celles correspondant à votre environnement.

2. Si nécessaire, modifiez les configurations supplémentaires dans le dossier `src/config`.

## Utilisation

1. Démarrez le serveur :
   ```
   yarn start
   ```

   Le serveur sera accessible à l'adresse `http://localhost:3000`.

2. Le serveur se connectera automatiquement au serveur MQTT spécifié et s'abonnera au topic configuré.

3. Lorsque des données sont reçues du topic MQTT, le serveur les traitera et les enverra à l'application via une requête POST à l'URL spécifiée.

## Structure du projet

- `src/` : Dossier contenant le code source du projet.
  - `config/` : Configurations du serveur.
  - `middlewares/` : Middlewares Express.
  - `routes/` : Définition des routes Express.
  - `services/` : Services externes (MQTT, etc.).
  - `utils/` : Fonctions utilitaires.
  - `app.ts` : Point d'entrée du serveur.

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Forkez ce dépôt.
2. Créez une branche pour vos modifications (`git checkout -b feature/nouvelle-fonctionnalite`).
3. Effectuez les modifications nécessaires et committez-les (`git commit -am 'Ajouter une nouvelle fonctionnalité'`).
4. Poussez vos modifications vers votre dépôt forké (`git push origin feature/nouvelle-fonctionnalite`).
5. Ouvrez une Pull Request sur ce dépôt.

## Auteur

- Votre nom - [Votre email](mailto:votre-email@example.com)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

N'hésitez pas à personnaliser ce README en fonction des spécificités de votre projet et à ajouter d'autres sections si nécessaire (ex : Tests, Déploiement, etc.).