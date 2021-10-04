const { fetchTrades } = require('../../trade/service/trade.service')

const fetchPortfolio = async () => {
  const allSecurities = await fetchTrades()
  if (!allSecurities) {
    return {}
  }

  const resultMap = {}
  for (const [key, value] of Object.entries(allSecurities)) {
    resultMap[key] = {
      shares: value.noOfShares,
      averageBuyPrice: calculateAverageBuyPrice(value.trades),
    }
  }
  return resultMap
}

const fetchReturns = async () => {
  const allSecurities = await fetchTrades()
  if (!allSecurities) {
    return {}
  }

  let _returns = 0
  for (const [_, value] of Object.entries(allSecurities)) {
    _returns += calculateReturns(value.trades, value.noOfShares)
  }
  return { totalReturns: _returns }
}

const calculateAverageBuyPrice = trades => {
  let currentShares = 0
  let currentAverageBuyPrice = 0

  trades.forEach(trade => {
    if (trade.type === 'BUY') {
      currentAverageBuyPrice =
        (currentAverageBuyPrice * currentShares + trade.quantity * trade.price) / (currentShares + trade.quantity)
      currentShares += trade.quantity
    } else {
      currentShares -= trade.quantity
    }
  })
  return currentAverageBuyPrice
}

const calculateReturns = (trades, noOfShares) => {
  const currentPrice = 100
  return (currentPrice - calculateAverageBuyPrice(trades)) * noOfShares
}

module.exports = { fetchPortfolio, fetchReturns }
