const config = require('config')
const { spawn } = require('child_process')
const tilebelt = require('@mapbox/tilebelt')

const produce = (z, x, y) => {
  return new Promise((resolve, result) => {
    const bbox = tilebelt.tileToBBOX([x, y, 2])
    const tmpPath = `pbf/part-2-${x}-${y}.osm.pbf`
    const dstPath = `pbf/2-${x}-${y}.osm.pbf`
    spawn('osmium', [
      'extract', '--bbox', bbox.join(','),
      '--strategy=smart', '--overwrite', '--progress',
      '--verbose', '--output', tmpPath,
      config.get('src')
    ], { stdio: 'inherit' })
    .on('exit', code => {
      if (code === 0) {
        fs.renameSync(tmpPath, dstPath)
      } else {
        fs.unlink(tmpPath)
      }
      resolve(null)
    })
  })
}

const main = async () => {
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      await produce(2, x, y)
    }
  }
}

main()
