const proxy = require('express-http-proxy')

module.exports = {
  name: 'scenario-intercept',
  policy: (actionParams) => {
    const scenarioProxy = proxy('http://localhost:9090/', {
      proxyReqPathResolver: req => `/scenario${req.url}`
    })
    return (req, res, next) => {
      if(req.headers['x-scenario-id']) {
        return scenarioProxy(req, res, next)
      }
      next() 
    }
  }
}