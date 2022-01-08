import basicAuth from '../utils/basicAuth'
import tokenAuth from '../utils/tokenAuth'

const combinedAuth = async (req, res, next) => {
  if (basicAuth(req) || tokenAuth(req)) {
    return next()
  }
  return res.status(401).end('Access denied')
}

export default combinedAuth
