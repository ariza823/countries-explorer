// Genera public/data/countries.json a partir del paquete `world-countries`
// (los mismos datos que usaba REST Countries). Se corre antes de dev y build.
import { mkdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const countries = require('world-countries')

const data = countries.map((c) => ({
  cca2: c.cca2,
  cca3: c.cca3,
  name: {
    common: c.translations?.spa?.common ?? c.name.common,
    official: c.translations?.spa?.official ?? c.name.official,
  },
  capital: c.capital,
  region: c.region,
  subregion: c.subregion || undefined,
  area: c.area,
  languages: c.languages,
  currencies: c.currencies,
  borders: c.borders,
}))

mkdirSync('public/data', { recursive: true })
writeFileSync('public/data/countries.json', JSON.stringify(data))
console.log(`countries.json generado con ${data.length} países`)
