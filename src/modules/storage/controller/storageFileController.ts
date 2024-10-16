import { Request, Response } from 'express'
import { gridfsBucket } from '../../../utils/gridFSetup'
import { ObjectId } from 'mongodb'

export const uploadFile = (req: Request, res: Response) => {
  try {
    const { file } = req
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' })
    }
    return res.status(200).json({ file })
  } catch (error) {
    return res.status(500).json({ message: 'File upload failed', error })
  }
}

export const getFile = async (req: Request, res: Response) => {
  try {
    if (!gridfsBucket) {
      return res.status(500).json({ message: 'File system not initialized' })
    }

    const file = await gridfsBucket.find({ filename: req.params.filename }).toArray()
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'No file exists' })
    }

    if (file[0].contentType === 'image/jpeg' || file[0].contentType === 'image/png') {
      const readstream = gridfsBucket.openDownloadStream(file[0]._id)
      readstream.pipe(res)
    } else {
      return res.status(400).json({ message: 'File is not an image' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving file', error })
  }
}

export const deleteFile = async (req: Request, res: Response) => {
  try {
    if (!gridfsBucket) {
      return res.status(500).json({ message: 'File system not initialized' })
    }

    const fileId = new ObjectId(req.params.id) // Use ObjectId from mongodb
    await gridfsBucket.delete(fileId)

    return res.status(200).json({ message: 'File deleted successfully' })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'FileNotFound') {
        return res.status(404).json({ message: 'File not found' })
      }
      return res.status(500).json({ message: 'File deletion failed', error: error.message })
    }
    return res.status(500).json({ message: 'Unknown error occurred' })
  }
}
