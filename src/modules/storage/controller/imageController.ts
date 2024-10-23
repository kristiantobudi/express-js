import { Request, Response, NextFunction } from 'express'
import Image from '../../../models/strorageModel/image/imageModels'

// POST image controller using async/await
export const processImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate input
    if (!req.file) {
      return res.status(400).json({
        status: 'Error',
        message: 'Please upload an Image'
      })
    }

    // Create image
    const uploadImage = new Image({
      img: req.file.buffer.toString('base64')
    })

    await uploadImage.save()

    const response = {
      message: 'File uploaded successfully',
      imageUrl: `/get_image/${uploadImage._id}`,
      details: {
        fileName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    }

    return res.status(200).json(response)
  } catch (error: any) {
    next(error)
  }
}

// GET image controller using async/await
export const getImage = async (req: Request, res: Response) => {
  try {
    const image = await Image.findById(req.params.id)
    if (!image) {
      return res.status(404).json({ error: 'Image not found' })
    }

    const response = {
      message: 'Image found successfully',
      image
    }

    return res.status(200).json(response)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
