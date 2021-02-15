const express = require('express')
const tempo = require('./tempo')

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.send("Bem vindo api tempo!");
});
 routes.get('/create', tempo.roboTempo)
 routes.get('/getTempo', tempo.getTempo)


module.exports = routes;