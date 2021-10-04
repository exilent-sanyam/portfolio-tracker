const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  tradeRoutes = require('./src/core/trade/controller/trade.controller'),
  portfolioRoutes = require('./src/core/portfolio/controller/portfolio.controller'),
  { handleError } = require('./src/core/utils/errors.utils'),
  { connectDB } = require('./src/database/db'),
  { logger } = require('./src/infrastructure/logger')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/trade', tradeRoutes)
app.use('/portfolio', portfolioRoutes)

app.use((err, req, res, next) => {
  return res.send(handleError(err, req, res))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  await connectDB()
  logger.info(`App listening on port: ${PORT}`)
})
