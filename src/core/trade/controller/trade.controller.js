const router = require('express').Router(),
  service = require('../service/trade.service')

router.post('/', async (req, res, next) => {
  try {
    const response = await service.addTrade(req.body)
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

router.patch('/', async (req, res, next) => {
  try {
    const response = await service.updateTrade(req.body)
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const response = await service.deleteTrade(req.body)
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const response = await service.fetchTrades()
    res.send(response)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
