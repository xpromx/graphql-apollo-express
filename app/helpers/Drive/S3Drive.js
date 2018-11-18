import BaseDrive from './BaseDrive'
import AWS from 'aws-sdk'

export default class S3Drive extends BaseDrive {
  constructor (config) {
    super()
    AWS.config.update({
      accessKeyId: config.key,
      secretAccessKey: config.secret
    })
    this.connection = new AWS.S3()

    this.state = {
      basePath: 'path' in config ? config.path + '/' : '',
      bucket: config.bucket,
      url: 'url' in config ? config.url : ''
    }
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

  getUrl = (path) => {
    return this.state.url + path
  }
}
