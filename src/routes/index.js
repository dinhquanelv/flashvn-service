const siteRouter = require('./site.routes');
const authRouter = require('./auth.routes');

const routes = (app) => {
  app.use('/api/v1/auth', authRouter);
  app.use('/', siteRouter);
};

module.exports = routes;
