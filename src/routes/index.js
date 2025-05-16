const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const cardRouter = require('./card.routes');
const bingoRouter = require('./bingo.routes');
const futureTellerRouter = require('./futureTeller.routes');
const raceRouter = require('./race.routes');
const trustOrSelfRouter = require('./trustOrSelf.routes');

const routes = (app) => {
  app.use(`/api/auth`, authRouter);
  app.use(`/api/users`, userRouter);
  app.use(`/api/card`, cardRouter);
  app.use(`/api/bingo`, bingoRouter);
  app.use(`/api/future-teller`, futureTellerRouter);
  app.use(`/api/race`, raceRouter);
  app.use(`/api/trust-or-self`, trustOrSelfRouter);
  app.use(`/`, siteRouter);
};

module.exports = routes;
