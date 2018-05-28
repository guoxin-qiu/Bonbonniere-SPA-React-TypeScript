const express = require('express');
const app = express();
const fs = require('fs');

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    setTimeout(() => {
      next();
    }, Math.random() * 1000);
  }
});

app.get('/test', (req, res) => {
  fs.readFile(__dirname + '/' + 'test.json', 'utf-8', (err, data) => {
    res.end(data);
  });
});

const server = app.listen(8081, () => {
  const port = server.address().port;
  console.log('server is running at port:%s', port);
});
