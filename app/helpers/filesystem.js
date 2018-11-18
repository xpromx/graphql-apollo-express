import 'dotenv/config'
import Drive from './Drive/Drive'

const config = {
  default: {
    driver: 'local',
    path: './storage'
  },
  s3: {
    driver: 's3',
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    path: process.env.S3_PATH,
    url: process.env.S3_URL
  }
}

const DriveInstance = new Drive(config)

export default DriveInstance
