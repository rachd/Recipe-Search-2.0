const express = require('express'),
      bodyParser = require('body-parser'),
      api = require('./server/routes/api'),
      app = express(),
      port = process.env.PORT || '3000';

class Server {
  constructor() {
    this.initExpressMiddleware();
    this.initCustomMiddleware();
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

  initRoutes() {
    app.use('/api', api);
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
  }
}

var server = new Server();






// // Get dependencies
// const express = require('express');
// const path = require('path');
// const http = require('http');
// const bodyParser = require('body-parser');

// // Get our API routes
// const api = require('./server/routes/api');

// const app = express();

// // Parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Point static path to dist
// app.use(express.static(path.join(__dirname, 'dist')));

// // Set our api routes
// app.use('/api', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// /**
//  * Get port from environment and store in Express.
//  */
// const port = process.env.PORT || '3000';
// app.set('port', port);

// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port, () => console.log(`API running on localhost:${port}`));