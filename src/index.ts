/* eslint-disable eol-last */
import bodyParser from 'body-parser'
import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/log/logger'
import cors from 'cors'
import helmet from 'helmet'

// connect DB
import './utils/connectDB'

// deserializedUser
import { deserializedUser } from './middleware/deserializedToken'

const app: Application = express()
const port: Number = 4000

app.use(deserializedUser)

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set security HTTP headers
app.use(helmet())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.listen(port, () => logger.info(`Server is listening on port ${port}`))