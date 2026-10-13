import { Link } from 'react-router-dom'
import type { Country } from '../api/countries'

const fmt = new Intl.NumberFormat('es-CO')

export function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-indigo-500"
    >
      <img
        src={country.flags.svg}
        alt={country.flags.alt ?? `Bandera de ${country.name.common}`}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="space-y-1 p-4 text-sm">
        <h2 className="text-base font-semibold group-hover:text-indigo-600">{country.name.common}</h2>
        <p><span className="text-slate-500">Población:</span> {fmt.format(country.population)}</p>
        <p><span className="text-slate-500">Región:</span> {country.region}</p>
        <p><span className="text-slate-500">Capital:</span> {country.capital?.[0] ?? '—'}</p>
      </div>
    </Link>
  )
}
