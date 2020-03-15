require('dotenv').config()
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const STATIC_FOLDER = 'dist';

const httpServer = () => {
  const httpApp = express();
  httpApp.use(bodyParser.json());
  httpApp.use(bodyParser.urlencoded({ extended: false }));

  httpApp.use(express.static(path.join(__dirname, '../', STATIC_FOLDER)));
  httpApp.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../', STATIC_FOLDER, 'index.html'));
  });

  const port = process.env.PORT;
  http.createServer(httpApp).listen(port, () => {console.log(`HTTP listening port ${port}...`)});
}

httpServer();
