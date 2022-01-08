import jwt from 'jsonwebtoken'

const tokenAuth = req => {
  const header = req.headers['authorization']
  console.log(header)
  const token = header?.split?.(' ')?.[1]

  if (!token) return false

  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(req.user)
    return true
  } catch (err) {
    return false
  }
}

export default tokenAuth
