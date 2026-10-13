export interface Country {
  cca2: string
  cca3: string
  name: { common: string; official: string }
  capital?: string[]
  region: string
  subregion?: string
  area: number
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol?: string }>
  borders?: string[]
}

// Los datos se sirven como JSON estático junto a la app (ver scripts/build-data.mjs).
// La capa de "API" sigue siendo asíncrona, así que cambiar a un backend real
// solo implica tocar este archivo.
const DATA_URL = `${import.meta.env.BASE_URL}data/countries.json`

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch(DATA_URL)
  if (!res.ok) throw new Error(`Error ${res.status} al cargar los países`)
  return res.json() as Promise<Country[]>
}

export async function fetchCountry(code: string): Promise<Country> {
  const all = await fetchAllCountries()
  const country = all.find((c) => c.cca3 === code.toUpperCase())
  if (!country) throw new Error(`No existe un país con código ${code}`)
  return country
}

export const flagUrl = (c: Pick<Country, 'cca2'>) => `https://flagcdn.com/${c.cca2.toLowerCase()}.svg`
