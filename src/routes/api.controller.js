var o2x = require('object-to-xml');
var {query} = require('../db/db');

const welcome = (req, res) => {
  res.send('Welcome to api')
}

const writeText = (req, res) => {
  return res.send(`text: ${req.params.text}`);
}

const addBlog = (req, res) => {
  blog.push(req.body);
  return res.status(201).send('Post added');
}

const showBlog = (req, res) => {
  return res.send(blog);
}

const test = (req,res) => {
  
  const message = {
    title: 'This is an object',
    from: 'Abraham',
    to: ['Marek', 'Łukasz']
  }
  
  const requestedType = req.headers['accept']
  
  if(requestedType === 'application/json') {
    // send json
    return res.json(message);
  }
  if(requestedType === 'application/xml') {
    // send xml
    return res.send(o2x({message: message}));
  }
  // send error
  res.status(501).send('not implemented');
  return res.send('format: undefined');
  
}

const gladiators = (req, res) => {
  query('SELECT * FROM glad')
  return res.send();
}



module.exports = { welcome,writeText,addBlog,showBlog,test,gladiators }
