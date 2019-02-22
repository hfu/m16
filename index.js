const config = require('config')
const path = require('path')
const fs = require('fs')

const _modulePath = (z, x, y, Z) => {
  return `${path.dirname(module.filename)}/pbf/` + 
    `${Z}-${x >> (z - Z)}-${y >> (z - Z)}.osm.pbf`
}

module.exports = (z, x, y) => {
  for (Z = 4; Z >= 2; Z = Z - 2) {
    const modulePath = _modulePath(z, x, y, Z)
    if (fs.existsSync(modulePath)) return modulePath
  }
  return config.get('src')
}

