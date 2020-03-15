const PORT = require('./CONFIG.js').PORT
const startWsS = require('./server/websocket.js')

// Run a websocket server locally for dev.
startWsS({
  port: PORT,
  clientTracking: true
})

module.exports = {
  productionSourceMap: false
}
