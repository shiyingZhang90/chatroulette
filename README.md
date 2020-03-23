# chatroulette

> Chatroulette is a place where you can interact with new people over text-chat, webcam and mic.

## Project setup
```
npm install
```

### Run locally

Run the front end devserver with hot-reload
```
npm run fe  # on a random port - see the command line message
```

Run the node express server
```
npm run build  # compile fe code
npm run be  # run the express server, port defined in `CONFIG.js`.
```

See `src/router` to find all the available routes.

### Prod
```
npm install 
npm run stop  # stop the server
sudo npm run build  # compile all front end code.
npm run prod  # run express server on forever.js, port defined in `CONFIG.js`.
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
