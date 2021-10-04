const { logger } = require('../infrastructure/logger')
const mongoose = require('mongoose')

const connectDB = async () => {
  main()
    .then(() => logger.info('DB Connection established'))
    .catch(err => {
      logger.error(err)
      process.exit(1)
    })

  async function main() {
    await mongoose.connect('mongodb://localhost:27017/portfolio-tracker-temp')
  }
}
module.exports = { connectDB }
