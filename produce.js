const config = require('config')
const { spawn } = require('child_process')
const tilebelt = require('@mapbox/tilebelt')
const fs = require('fs')

const produce = (z, x, y, srcPath) => {
  return new Promise((resolve, result) => {
    const bbox = tilebelt.tileToBBOX([x, y, z])
    const tmpPath = `pbf/part-${z}-${x}-${y}.osm.pbf`
    const dstPath = `pbf/${z}-${x}-${y}.osm.pbf`
    if (false && fs.existsSync(dstPath)) {
      console.log(`${dstPath} is already there.`)
      resolve(null)
    } else {
      spawn('osmium', [
        'extract', '--bbox', bbox.join(','),
        '--strategy=smart', '--overwrite', '--progress',
        '--output-format=pbf,pbf_compression=false,add_metadata=false',
        '--verbose', '--output', tmpPath, srcPath
      ], { stdio: 'inherit' })
      .on('exit', code => {
        if (code === 0) {
          fs.renameSync(tmpPath, dstPath)
        } else {
          fs.unlink(tmpPath)
        }
        resolve(null)
      })
    }
  })
}

const main = async () => {
  
  await produce(4, 9, 7, config.get('src'))
  return

  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      await produce(2, x, y, config.get('src'))
    }
  }
  for (x = 8; x < 12; x++) {
    for (y = 4; y < 8; y++) {
      await produce(4, x, y, 'pbf/2-2-1.osm.pbf')
    }
  } 
}

main()
