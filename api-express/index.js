const keys = require('./keys')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { Pool } = require('pg')
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})

pgClient.on('error', () => console.log('Lost PG connection'))

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
  .catch(err => console.log(err))

const app = express()
app.use(bodyParser.json())
app.use(cors())

const redis = require('redis')
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})
const redisPublisher = redisClient.duplicate()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.send(values)
  })
})

app.get('/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * from values')
  res.send(values.rows)
})

app.post('/values', (req, res) => {
  const index = req.body.index
  if (parseInt(index) > 40) {
    return res.status(422).send('Index too high')
  } else if (!index) {
    return res.status(422).send('No index supplied')
  }

  redisClient.hset('values', index, 'Nothing yet!')
  redisPublisher.publish('insert', index)
  pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

  res.send({ working: true })
})

app.listen(5000, (err) => {
  console.log('Listening on port 5000')
})
