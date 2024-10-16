/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express'
import { File } from 'multer'

declare module 'express-serve-static-core' {
  interface Request {
    file?: File
  }
}
