import { Model } from 'objection'
import moment from 'moment'

class BaseModel extends Model {
  static idColumn = 'id'
  static validation = {}

  static hello () {
    console.log('hello')
  }

  static getValidation (context) {
    let rules = Object.assign({}, context.rules)

    Object.keys(rules).map((field) => {
      if (rules[field].includes('unique')) {
        rules[field] = rules[field] + ',' + context.args.id
      }

      // update edirective
      if ('directive' in context && context.directive == 'update') {
        if (rules[field].includes('required')) {
          rules[field] = rules[field]
            .replace('required|', '')
            .replace('required', '')
        }
      }

      // remove empty rules
      if (rules[field].length == 0) {
        delete rules[field]
      }
    })

    return rules
  }

  async $beforeInsert (context) {
    this.created_at = moment().format('Y-M-D HH:mm:ss')
    this.updated_at = moment().format('Y-M-D HH:mm:ss')

    if ('beforeInsert' in this) {
      await this.beforeInsert(context)
    }
  }

  async $beforeUpdate (context) {
    this.updated_at = moment().format('Y-M-D HH:mm:ss')

    if ('beforeUpdate' in this) {
      await this.beforeUpdate(context)
    }
  }
}

export default BaseModel
