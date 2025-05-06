const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const cardRouter = require('./card.routes');
const bingoRouter = require('./bingo.routes');
const futureTellerRouter = require('./futureTeller.routes');
const raceRouter = require('./race.routes');

const apiVersion = 'v1';

const routes = (app) => {
  app.use(`/api/${apiVersion}/auth`, authRouter);
  app.use(`/api/${apiVersion}/users`, userRouter);
  app.use(`/api/${apiVersion}/card`, cardRouter);
  app.use(`/api/${apiVersion}/bingo`, bingoRouter);
  app.use(`/api/${apiVersion}/future-teller`, futureTellerRouter);
  app.use(`/api/${apiVersion}/race`, raceRouter);
  app.use(`/`, siteRouter);
};

module.exports = routes;
