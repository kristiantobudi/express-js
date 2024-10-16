import { Request, Response } from 'express'
import { gridfsBucket } from '../../../utils/gridFSetup'
import { ObjectId } from 'mongodb'

export const uploadFile = (req: Request, res: Response) => {
  try {
    const { file } = req

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }
    return res.status(200).json({
      message: 'File uploaded successfully',
      file: {
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path
      }
    })
  } catch (error) {
    console.error('File upload error:', error)
    return res.status(500).json({
      message: 'File upload failed',
      error: error || 'An unexpected error occurred'
    })
  }
}

export const getFile = async (req: Request, res: Response) => {
  try {
    if (!gridfsBucket) {
      return res.status(500).json({ message: 'File system not initialized' })
    }

    const filename = req.params.filename
    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' })
    }

    const file = await gridfsBucket.find({ filename }).toArray()

    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'No file exists' })
    }

    const contentType = file[0].contentType
    if (!contentType || typeof contentType !== 'string') {
      return res.status(400).json({ message: 'Invalid file content type' })
    }

    const allowedTypes = ['image/jpeg', 'image/png']
    if (allowedTypes.includes(contentType)) {
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
