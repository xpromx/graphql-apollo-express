import axios from 'axios'
import sharp from 'sharp'
import moment from 'moment'

export default class BaseDrive {
  constructor () {}
  upload = (path, stream, bucket = null) => {}
  uploadFromUrl = async (path, url, bucket = null) => {
    const res = await axios(url, {
      responseType: 'arraybuffer'
    })

    return this.upload(path, res.data)
  }
  makeThumb = async (path, stream, w, h) => {
    const data = await sharp(stream).resize(w, h).toBuffer()
    return this.upload(path, data)
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

  upload = (path, stream, bucket = null) => {}
}
