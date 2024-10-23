import { Router } from 'express'
import { processImage, getImage } from '../../modules/storage/controller/imageController'
import upload from '../../utils/multer' // Multer setup

export const ImageRouter: Router = Router()

ImageRouter.post('/upload', upload.single('file'), processImage)

ImageRouter.get('/get-image/:id', getImage)
