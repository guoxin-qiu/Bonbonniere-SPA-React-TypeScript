const jsonServer = require('json-server');
const server = jsonServer.create();
const dbJson = require('./db.json');
const router = jsonServer.router(dbJson);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(() => {
    if (isAuthorized(req)) {
      next();
    } else {
      res.sendStatus(401);
    }
  }, Math.random() * 1000);
});

server.use('/api',router).listen(8081, () => console.log('JSON Server is running...'));

function isAuthorized(request) {
  return true;
}
