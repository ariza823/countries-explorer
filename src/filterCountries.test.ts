import { describe, expect, it } from 'vitest'
import type { Country } from './api/countries'
import { filterCountries } from './filterCountries'

const make = (name: string, region: string, population: number, area = 1): Country => ({
  cca3: name.slice(0, 3).toUpperCase(),
  name: { common: name, official: name },
  region,
  population,
  area,
  flags: { svg: '' },
})

const data = [make('Colombia', 'Americas', 52), make('España', 'Europe', 48), make('Chile', 'Americas', 19)]

describe('filterCountries', () => {
  it('filtra por región', () => {
    const r = filterCountries(data, { search: '', region: 'Americas', sort: 'name' })
    expect(r.map((c) => c.name.common)).toEqual(['Chile', 'Colombia'])
  })

  it('busca sin importar mayúsculas', () => {
    expect(filterCountries(data, { search: 'COL', region: '', sort: 'name' })).toHaveLength(1)
  })

  it('ordena por población de mayor a menor', () => {
    const r = filterCountries(data, { search: '', region: '', sort: 'population' })
    expect(r[0].name.common).toBe('Colombia')
  })

  it('no muta el arreglo original', () => {
    const copy = [...data]
    filterCountries(data, { search: '', region: '', sort: 'population' })
    expect(data).toEqual(copy)
  })
})
