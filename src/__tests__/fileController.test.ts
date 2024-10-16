import request from 'supertest'
import app from '../index' // Adjust the path as needed
import mongoose from 'mongoose'
import path from 'path'

const mongoUrl = process.env.DB
if (mongoUrl === undefined) {
  throw new Error('Database URL is not defined in the environment variables.')
}

beforeAll(async () => {
  await mongoose.connect(mongoUrl)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('File Upload and Management', () => {
  let uploadedFileId: string

  it('should upload a file', async () => {
    const filePath = path.join(__dirname, 'test-image.jpg') // Make sure this file exists in the specified directory
    const response = await request(app)
      .post('/upload')
      .attach('file', filePath)

    expect(response.status).toBe(200)
    expect(response.body.file).toBeDefined()
    expect(response.body.file.filename).toBeDefined()
    uploadedFileId = response.body.file._id
  })

  it('should retrieve the uploaded file', async () => {
    const response = await request(app).get(`/files/${uploadedFileId}`)

    expect(response.status).toBe(200)
    expect(response.header['content-type']).toMatch(/image/)
  })

  it('should delete the uploaded file', async () => {
    const response = await request(app).delete(`/files/${uploadedFileId}`)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('File deleted successfully')
  })

  it('should return 404 when retrieving a non-existent file', async () => {
    const response = await request(app).get('/files/non-existent-id')

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('No file exists')
  })

  it('should return 400 when trying to upload without a file', async () => {
    const response = await request(app)
      .post('/upload') // No file attached

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('No file uploaded')
  })

  it('should return 400 when trying to retrieve a file without a filename', async () => {
    const response = await request(app).get('/files/') // Invalid endpoint

    expect(response.status).toBe(404) // Adjust if your routing responds differently
  })

  it('should return 400 when trying to retrieve a file with an invalid ID format', async () => {
    const response = await request(app).get('/files/invalid-id')

    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined() // Check for specific error message if applicable
  })
})
