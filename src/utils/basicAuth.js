import auth from 'basic-auth'

const basicAuth = req => {
  const user = auth(req)
  return (
    user &&
    user.name.toLowerCase() === process.env.BA_USERNAME &&
    user.pass === process.env.BA_PASSWORD
  )
}

export default basicAuth
