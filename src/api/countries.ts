export interface Country {
  cca3: string
  name: { common: string; official: string }
  capital?: string[]
  region: string
  subregion?: string
  population: number
  area: number
  flags: { svg: string; alt?: string }
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol?: string }>
  borders?: string[]
}

const BASE = 'https://restcountries.com/v3.1'
const FIELDS = 'cca3,name,capital,region,subregion,population,area,flags,languages,currencies,borders'

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`Error ${res.status} al consultar la API`)
  return res.json() as Promise<T>
}

export const fetchAllCountries = () => request<Country[]>(`/all?fields=${FIELDS}`)
export const fetchCountry = (code: string) => request<Country>(`/alpha/${code}?fields=${FIELDS}`)
