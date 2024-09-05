/* eslint-disable eol-last */
import bodyParser from 'body-parser'
import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/log/logger'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
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

// cors access handler
const allowedOrigins = ['http://localhost:4000', 'http://localhost:3000', 'https://express-js-tau-three.vercel.app']
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      'script-src': ['http://localhost:4000', 'http://localhost:3000', 'https://express-js-tau-three.vercel.app'],
      'style-src': ['http://localhost:4000', 'http://localhost:3000', 'https://express-js-tau-three.vercel.app']
    }
  },
  crossOriginEmbedderPolicy: { policy: 'require-corp' },
  xXssProtection: false,
  noSniff: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true
})
)

// Rate limitting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.use(mongoSanitize())

routes(app)

app.listen(port, () => logger.info(`Server is listening on port ${port}`))