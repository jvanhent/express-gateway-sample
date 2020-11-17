const proxy = require('express-http-proxy')

module.exports = {
  name: 'scenario-intercept',
  policy: (actionParams) => {
    const scenarioProxy = proxy('http://localhost:8080', {preserveHostHdr: true})
    return (req, res, next) => {
      if(req.headers['x-scenario-id']) {
        console.info('scenario-intercept found x-scenario-id header => proxy to Gateway with host "scenario"')
        req.headers.host = 'scenario'
        return scenarioProxy(req, res, next)
      }
      next() 
    }
  }
}