const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    res.send('App is UP and Running...')
  } catch (error) {
    return next(error)
  }
})

module.exports = router
