// Notes Backend Server
// Receives HTTP requests and RESPONDS


const app = express()
const logger = require("./utils/logger")
const config = require('./utils/config')

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})