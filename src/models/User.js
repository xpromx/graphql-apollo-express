import Model from '../helpers/Model'
import bcrypt from 'bcrypt'

class User extends Model {
  static tableName = 'users'

  static validation = {
    first_name: 'required',
    last_name: 'required',
    email: 'required|email|unique:users',
    password: 'required|min:6|max:30'
  }

  async beforeInsert (context) {
    const salt = 10
    this.password = await bcrypt.hash(this.password, salt)
    this.token = await bcrypt.hash(this.email + Math.random(), salt)
  }

  async beforeUpdate (context) {
    if ('password' in this) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  static async Authenticate (token = false) {
    if (!token) {
      return null
    }

    const user = User.query().where('token', token).first()
    if (!user) throw new AuthenticationError('you must be logged in')
    return user
  }
}

export default User
