import axios from 'axios'
import moment from 'moment'
import s3 from './S3Drive'
import local from './LocalDrive'

export default class Drive {
  constructor (config) {
    this.config = config
    this.drivers = { s3, local }
    this.disks = {}
    this.loadDisks()
  }
  loadDisks = () => {
    Object.keys(this.config).map((disk) => {
      const config = this.config[disk]
      const Driver = this.drivers[config.driver]
      this.disks[disk] = new Driver(config)
    })
  }
  disk = (key = 'default') => {
    return this.disks[key]
  }
}
