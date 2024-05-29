import express from 'express';
import { serverConfig } from './config/server';
import { setupMiddlewares } from './middlewares';
import routes from './routes';
import { setupMQTT } from './services/mqtt';

const app = express();

setupMiddlewares(app);
app.use('/', routes);
setupMQTT();

app.listen(serverConfig.port, () => {
  console.log(`Server is running on port ${serverConfig.port}`);
});