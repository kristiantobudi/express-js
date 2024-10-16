import { Router } from 'express'
import { getFile, deleteFile, uploadFile } from '../../modules/storage/controller/storageFileController'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export const FileRouter: Router = Router()

FileRouter.post('/v1/files', upload.single('file'), uploadFile)
FileRouter.get('/v1/files/:filename', getFile)
FileRouter.delete('/v1/files/:id', deleteFile)
