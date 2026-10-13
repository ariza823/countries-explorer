import type { Country } from './api/countries'

export type SortOption = 'name' | 'population' | 'area'

export interface CountryFilters {
  search: string
  region: string
  sort: SortOption
}

// Función pura: fácil de testear sin React ni red.
export function filterCountries(countries: Country[], { search, region, sort }: CountryFilters) {
  const q = search.trim().toLowerCase()
  return countries
    .filter((c) => (region === '' || c.region === region) && c.name.common.toLowerCase().includes(q))
    .sort((a, b) =>
      sort === 'name' ? a.name.common.localeCompare(b.name.common, 'es') : b[sort] - a[sort],
    )
}
