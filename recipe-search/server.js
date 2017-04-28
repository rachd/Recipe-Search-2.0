const express = require('express'),
      bodyParser = require('body-parser'),
      router = require('./server/routes/api'),
      app = express(),
      path = require('path'),
      database = require('./lib/database'),
      port = process.env.PORT || '3000';

class Server {
  constructor() {
    this.initExpressMiddleware();
    this.initCustomMiddleware();
    this.initDatabase();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(port, (err) => {
      console.log(`${process.env.NODE_ENV} Listening on http://localhost:${port}`);
    });
  }

  initExpressMiddleware() {
    app.use(express.static(__dirname + '/dist'));
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());

    process.on('uncaughtException', (err) => {
        if (err) console.log(err, err.stack);
    });
  }

  initCustomMiddleware() {
    process.on('SIGINT', () => {
        console.log('SIGINT: Closing MongoDB connection');
        database.close();
    });
  }

  initDatabase() {
    database.open(() => {

    });
  }

  initRoutes() {
    router.load(app, './controllers');
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
  }
}

var server = new Server();
