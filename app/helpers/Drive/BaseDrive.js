import axios from 'axios'
import sharp from 'sharp'
import moment from 'moment'
import _path from 'path'

export default class BaseDrive {
  constructor () {}
  upload = (path, stream, bucket = null) => {}
  uploadFromUrl = async (path, url, bucket = null) => {
    const res = await axios(url, {
      responseType: 'arraybuffer'
    })

    return this.upload(path, res.data)
  }
  resize = async (path, stream, w, h) => {
    const data = await sharp(stream).resize(w, h).toBuffer()
    return this.upload(path, data)
  }

  resizeFromUrl = async (path, url, w, h) => {
    const res = await axios(url, {
      responseType: 'arraybuffer'
    })
    return this.resize(path, res.data, w, h)
  }

  getPath = (filename, date = null) => {
    const dateFormat = date ? moment(date) : moment()
    const year = dateFormat.format('Y')
    const month = dateFormat.format('MM')

    return `${year}\/${month}\/${filename}`
  }

  getFileExt = (filename) => {
    return _path.extname(filename)
  }

  upload = (path, stream, bucket = null) => {}
}
