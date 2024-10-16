/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'multer-gridfs-storage' {
  import { Request } from 'express'
  import { GridFSBucketWriteStream } from 'mongodb'
  import { FileFilterCallback } from 'multer'

  interface MulterGridFSStorageOptions {
    url: string
    file?: (req: Request, file: Express.Multer.File) => Promise<{
      filename: string
      bucketName: string
    }>
  }

  class GridFsStorage {
    constructor (opts: MulterGridFSStorageOptions)
  }

  export = GridFsStorage
}
