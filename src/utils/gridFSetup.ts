import mongoose from 'mongoose'
import { GridFSBucket } from 'mongodb'

let gridfsBucket: GridFSBucket

// Initialize GridFS and bucket
export const initGridFS = (conn: mongoose.Connection) => {
  gridfsBucket = new GridFSBucket(conn.db, {
    bucketName: 'uploads'
  })
}

export { gridfsBucket }
