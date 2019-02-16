const path = require('path')
module.exports = (z, x, y) => {
  return `${path.dirname(module.filename)}/2-${x >> (z - 2)}-${y >> (z - 2)}.osm.pbf`
}

