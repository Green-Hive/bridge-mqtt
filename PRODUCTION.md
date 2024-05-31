Voici le contenu du fichier `PRODUCTION.md` au format Markdown, prêt à être copié et collé :

```markdown
# Déploiement en production sur Debian 12

Ce guide vous explique comment déployer le serveur MQTT Bridge en production sur un serveur Debian 12.

## Prérequis
- Accès SSH à votre serveur Debian 12
- Node.js (version 18 ou supérieure)
- Yarn
- PM2

## Installation
1. Connectez-vous à votre serveur Debian 12 via SSH.
2. Installez Node.js et Yarn :
   ```
   sudo apt update
   sudo apt install nodejs yarn
   ```
3. Installez PM2 globalement :
   ```
   yarn global add pm2
   ```
4. Clonez le dépôt du projet dans le répertoire de votre choix :
   ```
   git clone https://github.com/votre-repo/mqtt-bridge-server.git
   ```
5. Accédez au dossier du projet :
   ```
   cd mqtt-bridge-server
   ```
6. Installez les dépendances :
   ```
   yarn install
   ```

## Configuration
1. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires (voir le README principal pour plus de détails).
2. Assurez-vous que les configurations dans le dossier `src/config` correspondent à votre environnement de production.

## Démarrage du serveur
1. Compilez le code TypeScript :
   ```
   yarn build
   ```
2. Démarrez le serveur avec PM2 :
   ```
   pm2 start dist/app.js --name mqtt-bridge-server
   ```

## Gestion du serveur avec PM2
- Afficher les logs en temps réel :
   ```
   pm2 logs mqtt-bridge-server
   ```
- Vérifier l'état du serveur :
   ```
   pm2 list
   ```
- Redémarrer le serveur :
   ```
   pm2 restart mqtt-bridge-server
   ```
- Arrêter le serveur :
   ```
   pm2 stop mqtt-bridge-server
   ```
- Supprimer le serveur de la gestion de PM2 :
   ```
   pm2 delete mqtt-bridge-server
   ```

## Démarrage automatique au démarrage du système
Pour configurer le démarrage automatique du serveur au démarrage du système, exécutez la commande suivante :
```
pm2 startup
```
PM2 générera une commande de démarrage automatique spécifique à votre système. Copiez et exécutez la commande générée pour configurer le démarrage automatique.

## Mise à jour du serveur
Pour mettre à jour le serveur avec une nouvelle version du code :
1. Arrêtez le serveur :
   ```
   pm2 stop mqtt-bridge-server
   ```
2. Faites un pull des dernières modifications depuis le dépôt Git :
   ```
   git pull
   ```
3. Installez les nouvelles dépendances si nécessaire :
   ```
   yarn install
   ```
4. Compilez le code TypeScript :
   ```
   yarn build
   ```
5. Redémarrez le serveur :
   ```
   pm2 restart mqtt-bridge-server
   ```
```

Vous pouvez maintenant copier ce contenu et le coller directement dans votre fichier `PRODUCTION.md`.