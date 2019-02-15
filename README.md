# m16
1/16 modules from planet.osm.pbf

# background
I need to acccelerate production of vector tiles by dividing planet.osm.pbf into 16 (z=2) modules.

This requires planet.osm.pbf and osmium-tool.

# install
```
git clone git@github.com:hfu/m16
cd m16
vi config/default.hjson
node produce.js
```

# use
```javascript
const m16 = require('../m16')

m16.path(6, 37, 32) => '../m16/pbf/2-2-2.pbf'
```
