import 'dotenv/config'
import AWS from 'aws-sdk'
import axios from 'axios'
import moment from 'moment'

class Drive {
  constructor () {
    AWS.config.update({
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET
    })
    this.connection = new AWS.S3()

    this.state = {
      basePath: process.env.S3_PATH ? process.env.S3_PATH + '/' : '',
      bucket: process.env.S3_BUCKET
    }
  }

  uploadFromUrl = async (path, url, bucket = null) => {
    const res = await axios(url, {
      responseType: 'arraybuffer'
    })

    return this.upload(path, res.data)
  }

  upload = (path, stream, bucket = null) => {
    const params = {
      Bucket: bucket || this.state.bucket,
      Body: stream,
      Key: this.state.basePath + path
    }

    return this.connection.upload(params, function (error, data) {
      if (error) {
        throw new Error(error)
      }

      if (data) {
        return data.Location
      }
    })
  }

  getPath = (filename, date = null) => {
    const dateFormat = date ? moment(date) : moment()
    const year = dateFormat.format('Y')
    const month = dateFormat.format('MM')

    return `${year}\/${month}\/${filename}`
  }

  getFileExt = (filename) => {
    const parts = filename.split('.')
    return parts[parts.length - 1].toLowerCase()
  }

  static getUrl = (path) => {
    return process.env.S3_URL + path
  }
}

const S3 = new Drive()

export default S3
