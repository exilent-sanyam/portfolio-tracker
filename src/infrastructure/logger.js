const { createLogger, transports, format } = require('winston')
const { combine, timestamp, prettyPrint } = format

const formatter = () => {
  const defaultFormatters = [timestamp()]
  return combine(...[...defaultFormatters, prettyPrint()])
}

const logger = createLogger({
  level: 'info',
  format: formatter(),
  transports: [new transports.Console()],
  defaultMeta: {
    context: 'portfolio-tracking-api::Core',
  },
})

module.exports = { logger }
