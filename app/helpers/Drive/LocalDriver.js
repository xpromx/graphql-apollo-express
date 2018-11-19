import BaseDriver from './BaseDriver'
import fs from 'fs'
import _path from 'path'

export default class LocalDriver extends BaseDriver {
  constructor (config) {
    super()
    this.config = config
  }
  upload = (path, stream) => {
    const filePath = this.config.path + '/' + path
    const folders = _path.resolve(_path.dirname(filePath))
    return new Promise((resolve, reject) => {
      return fs.mkdir(folders, { recursive: true }, (err) => {
        if (err) throw err
        return fs.writeFile(filePath, stream, (err, data) => {
          if (err) throw err
          return resolve(data)
        })
      })
    })
  }

  remove = (path) => {
    return new Promise((resolve, reject) => {
      return fs.unlink(this.config.path + '/' + path, (err) => {
        if (err) throw err
        return resolve(true)
      })
    })
  }
}
