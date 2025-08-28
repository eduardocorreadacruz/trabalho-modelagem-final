const express = require('express')
const app = express()

const hostname = 'localhost'
const port = 3000

require('dotenv').config()
const cors = require('cors')
const conn = require('./db/conn.js')

const produtoController = require('./controller/produto.controller.js')
const compraController = require('./controller/compra.controller.js')
const usuarioController = require('./controller/usuario.controller.js')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// Rotas para Compra
app.post('/compra', compraController.cadastrar)
app.get('/compra', compraController.listar)
app.get('/compra/:id', compraController.buscarPorId)
app.put('/compra/:id', compraController.atualizar)
app.delete('/compra/:id', compraController.apagar)

// Rotas para Produto
app.post('/produto', produtoController.cadastrar)
app.get('/produto', produtoController.listar)
app.get('/produto/:id', produtoController.buscarPorId)
app.put('/produto/:id', produtoController.atualizar)
app.delete('/produto/:id', produtoController.apagar)

// Rotas para Usuário
app.post('/usuario', usuarioController.cadastrar)
app.get('/usuario', usuarioController.listar)
app.get('/usuario/:id', usuarioController.buscarPorId)
app.put('/usuario/:id', usuarioController.atualizar)
app.delete('/usuario/:id', usuarioController.apagar)


app.get('/', (req, res) => {
    res.status(200).json({message: 'aplicação rodando!'})
})

conn.sync()
    .then(() => {
        app.listen(port, hostname, () => {
            console.log(`servidor rodando em http://${hostname}:${port}`)
        })
    })
    .catch((err) => {
        console.error('não foi possivel rodar o servidor!', err)
    })