const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');
const cardRouter = require('./card.routes');
const bingoRouter = require('./bingo.routes');

const routes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/card', cardRouter);
  app.use('/api/v1/bingo', bingoRouter);
  app.use('/', siteRouter);
};

module.exports = routes;
