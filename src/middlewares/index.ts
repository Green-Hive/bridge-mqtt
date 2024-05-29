import bodyParser from 'body-parser';

export const setupMiddlewares = (app: any) => {
  app.use(bodyParser.json());
  // Ajoutez d'autres middlewares ici si nécessaire
};