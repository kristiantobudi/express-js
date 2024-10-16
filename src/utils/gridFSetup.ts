import mongoose from 'mongoose'
import { GridFSBucket } from 'mongodb'

let gridfsBucket: GridFSBucket

export const initGridFS = (conn: mongoose.Connection) => {
  gridfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
}

export { gridfsBucket }
