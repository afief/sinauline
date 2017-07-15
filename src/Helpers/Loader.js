const _ = require('lodash')
const path = require('path')

const loader = function (name, params = []) {
  const parsed = name.trim().split('@')
  const func = require(path.join('../Http/', parsed[0]))
  if (parsed[1]) {
    if (_.endsWith(parsed[1], '()')) {
      return func[parsed[1]](...params)
    } else {
      return func[parsed[1]]
    }
  }
  return func
}

module.exports = loader
