module.exports = {
    name: 'x-forwarded-host',
    handler: conditionConfig => req => {
        if(req.headers.hasOwnProperty('x-forwarded-host')){
            req.headers.host = req.headers['x-forwarded-host']
            delete req.headers['x-forwarded-host']
            return true
        }
        return false
    }
  };