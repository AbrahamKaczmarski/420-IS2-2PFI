const blog = []

const welcome = (req, res) => {
  res.send('Welcome to api')
}

const writeText = (req, res) => {
  return res.send(`text: ${req.params.text}`)
}

const addBlog = (req, res) => {
  blog.push(req.body)
  return res.status(201).send('Post added')
}

const showBlog = (req, res) => {
  return res.send(blog)
}

module.exports = { welcome, writeText, addBlog, showBlog }
