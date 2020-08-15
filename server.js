const express = require('express')

require('dotenv').config() //Manter as variáveis sensíveis seguras

const helmet = require('helmet') //Previnir que os headers fiquem seguros
const bodyParser = require('body-parser')
const cors = require('cors') //Permitir cross comunicação em sites (front-end e back-end em camadas distintas)
const morgan = require('morgan') //Logs dos requests

var db = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '123456',
        database: 'teste'
    },
})

const main = require('./controllers/main')
const app = express()

const whitelist = ['http://localhost:3001']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Não permitido pelo CORS'))
        }
    },
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined'))

//Rotas
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.selectDados(req, res, db))
app.post('/crud2', (req, res) => main.insertDados(req, res, db))
app.put('/crud2', (req, res) => main.updateDados(req, res, db))
app.delete('/crud2', (req, res) => main.deleteDados(req, res, db))

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT || 3000}`)
})