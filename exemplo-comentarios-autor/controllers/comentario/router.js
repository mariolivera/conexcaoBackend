const express = require('express')
const route = express.Router();

const comentario = require("./comentario")

route.get('/comentario/:produtoId', async (req, res) => {
    res.send(await comentario.listar(req.params.produtoId))
})
route.get('/comentario', async(req, res) => {
    if (!req.query.produtoId) {
        res.status(400)
        res.send("nao enviou o produtoID")
    }
    
    res.send(await comentario.listarAutor(req.query.produtoId, req.query.autor))
})

route.get('/comentarioAutorProduto', async(req, res) => {
    res.send(await comentario.listarAutorProduto(req.query.autor))
})
module.exports = route;