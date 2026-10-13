import { describe, expect, it } from 'vitest'
import type { Country } from './api/countries'
import { filterCountries } from './filterCountries'

const make = (name: string, region: string, area: number): Country => ({
  cca2: name.slice(0, 2).toUpperCase(),
  cca3: name.slice(0, 3).toUpperCase(),
  name: { common: name, official: name },
  region,
  area,
})

const data = [make('Colombia', 'Americas', 1141748), make('España', 'Europe', 505990), make('Perú', 'Americas', 1285216)]

describe('filterCountries', () => {
  it('filtra por región', () => {
    const r = filterCountries(data, { search: '', region: 'Americas', sort: 'name' })
    expect(r.map((c) => c.name.common)).toEqual(['Colombia', 'Perú'])
  })

  it('busca sin importar mayúsculas', () => {
    expect(filterCountries(data, { search: 'COL', region: '', sort: 'name' })).toHaveLength(1)
  })

  it('ordena por área de mayor a menor', () => {
    const r = filterCountries(data, { search: '', region: '', sort: 'area' })
    expect(r.map((c) => c.name.common)).toEqual(['Perú', 'Colombia', 'España'])
  })

  it('ignora tildes en la búsqueda', () => {
    expect(filterCountries(data, { search: 'peru', region: '', sort: 'name' })).toHaveLength(1)
  })

  it('no muta el arreglo original', () => {
    const copy = [...data]
    filterCountries(data, { search: '', region: '', sort: 'area' })
    expect(data).toEqual(copy)
  })
})
