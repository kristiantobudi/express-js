import { GridFSBucket } from 'mongodb'
import { Connection } from 'mongoose'

let gfs: GridFSBucket

export const initGridFS = (connection: Connection) => {
  gfs = new GridFSBucket(connection.db, {
    bucketName: 'uploads' // This will create a bucket named 'uploads' in MongoDB
  })
  console.log('GridFS Initialized')
}

export const getGridFSBucket = () => gfs
