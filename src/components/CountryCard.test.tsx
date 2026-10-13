import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CountryCard } from './CountryCard'

describe('CountryCard', () => {
  it('muestra nombre, capital y enlaza al detalle', () => {
    render(
      <MemoryRouter>
        <CountryCard
          country={{
            cca3: 'COL',
            name: { common: 'Colombia', official: 'República de Colombia' },
            capital: ['Bogotá'],
            region: 'Americas',
            population: 50882884,
            area: 1141748,
            flags: { svg: 'flag.svg', alt: 'Bandera de Colombia' },
          }}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Colombia' })).toBeInTheDocument()
    expect(screen.getByText('Bogotá')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/country/COL')
  })
})
