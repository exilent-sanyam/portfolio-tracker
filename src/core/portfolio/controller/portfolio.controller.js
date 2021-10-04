const router = require('express').Router(),
  service = require('../service/portfolio.service')

router.get('/', async (req, res, next) => {
  try {
    const response = await service.fetchPortfolio()
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

router.get('/returns', async (req, res, next) => {
  try {
    const response = await service.fetchReturns()
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
