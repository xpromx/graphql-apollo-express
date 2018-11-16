import { validate } from 'indicative'
import bcrypt from 'bcrypt'

const rules = {
  email: 'required|email|exists:users',
  password: 'required|min:6|max:30'
}

const Authenticate = (_, args, { models }) => {
  const { User } = models
  const data = Object.assign({}, args)

  return validate(data, rules)
    .then(async () => {
      const user = await User.query().where('email', data.email)
      const valid = await bcrypt.compare(args.password, user[0].password)

      if (valid) {
        return user[0]
      }
      throw "password doesn't match"
    })
    .catch((errors) => {
      throw new Error(errors[0].message || errors)
    })
}

export default Authenticate
