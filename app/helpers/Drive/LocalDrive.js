import BaseDrive from './BaseDrive'
import fs from 'fs'
import _path from 'path'

export default class LocalDrive extends BaseDrive {
  constructor (config) {
    super()
    this.config = config
  }
  upload = (path, stream) => {
    const filePath = this.config.path + '/' + path
    const folders = _path.dirname(filePath)

    return fs.mkdir(folders, { recursive: true }, (err) => {
      if (err) throw err
      fs.writeFile(filePath, stream, (err, data) => {
        if (err) throw err
        return data
      })
    })
  }
}
