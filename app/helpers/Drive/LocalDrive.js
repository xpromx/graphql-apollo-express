import BaseDrive from './BaseDrive'
import fs from 'fs'
export default class LocalDrive extends BaseDrive {
  constructor (config) {
    super()
    this.config = config
  }
  upload = (path, stream) => {
    let folders = this.config.path + '/' + path
    folders = folders.split('/')
    if (folders.length > 1) {
      delete folders[folders.length - 1]
      folders = folders.join('/')
    }
    fs.mkdir(folders, { recursive: true }, (err) => {
      if (err) throw err

      fs.writeFile(this.config.path + '/' + path, stream, function (err, data) {
        if (err) console.log(err)
        console.log('Successfully Written to File.')
      })
    })
  }
}
