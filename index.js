const path = require('path')
module.exports = (z, x, y) => {
  return `${path.dirname(module.filename)}`
}

