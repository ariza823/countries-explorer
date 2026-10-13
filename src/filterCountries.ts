import type { Country } from './api/countries'

export type SortOption = 'name' | 'area'

export interface CountryFilters {
  search: string
  region: string
  sort: SortOption
}

// Quita tildes para que "peru" encuentre "Perú".
const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

// Función pura: fácil de testear sin React ni red.
export function filterCountries(countries: Country[], { search, region, sort }: CountryFilters) {
  const q = normalize(search.trim())
  return countries
    .filter((c) => (region === '' || c.region === region) && normalize(c.name.common).includes(q))
    .sort((a, b) => (sort === 'name' ? a.name.common.localeCompare(b.name.common, 'es') : b.area - a.area))
}
