const PORT = require('../CONFIG.js').PORT
require('dotenv').config()

const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const HTTPS_CERT_PATH = `/etc/letsencrypt/live/klogserver.westus2.cloudapp.azure.com/cert.pem`;
const HTTPS_KEY_PATH = `/etc/letsencrypt/live/klogserver.westus2.cloudapp.azure.com/privkey.pem`;

const startWsS = require('./websocket.js')

const STATIC_FOLDER = 'dist';

const httpsServer = () => {
  const HTTP_CREDETIENS = {
    cert: fs.readFileSync(HTTPS_CERT_PATH),
    key: fs.readFileSync(HTTPS_KEY_PATH),
  };
  
  const httpsApp = express();
  httpsApp.use(bodyParser.json());
  httpsApp.use(bodyParser.urlencoded({ extended: false }));

  httpsApp.use(express.static(path.join(__dirname, '../', STATIC_FOLDER)));
  httpsApp.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../', STATIC_FOLDER, 'index.html'));
  });

  const port = PORT;  // Both http and wss on PORT
  const server = https.createServer(HTTP_CREDETIENS, httpsApp).listen(port, () => {console.log(`HTTP listening port ${port}...`)});
  startWsS({server});
}

// Delete it if https runs fine
const httpServer = () => {
  const httpApp = express();
  httpApp.use(bodyParser.json());
  httpApp.use(bodyParser.urlencoded({ extended: false }));

  httpApp.use(express.static(path.join(__dirname, '../', STATIC_FOLDER)));
  httpApp.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../', STATIC_FOLDER, 'index.html'));
  });

  const port = PORT;  // Both http and wss on PORT
  const server = http.createServer(httpApp).listen(port, () => {console.log(`HTTP listening port ${port}...`)});
  startWsS({server});
}

httpsServer();
// httpServer()
