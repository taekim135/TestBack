// Notes Backend Server
// npm run dev & server starts
// Receives HTTP requests and RESPONDS



const logger = require("./utils/logger")
const config = require('./utils/config')
const app = require("./app")

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})