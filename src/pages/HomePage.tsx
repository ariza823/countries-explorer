import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchAllCountries } from '../api/countries'
import { CountryCard } from '../components/CountryCard'
import { Pagination } from '../components/Pagination'
import { filterCountries, type SortOption } from '../filterCountries'
import { useDebounce } from '../hooks/useDebounce'

const PAGE_SIZE = 12
const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export function HomePage() {
  // Los filtros viven en la URL: se pueden compartir y sobreviven al botón "atrás".
  const [params, setParams] = useSearchParams()
  const search = params.get('q') ?? ''
  const region = params.get('region') ?? ''
  const sort = (params.get('sort') as SortOption) ?? 'name'
  const page = Number(params.get('page') ?? 1)

  const debouncedSearch = useDebounce(search)
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchAllCountries,
    staleTime: 1000 * 60 * 60,
  })

  const filtered = useMemo(
    () => filterCountries(data ?? [], { search: debouncedSearch, region, sort }),
    [data, debouncedSearch, region, sort],
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next, { replace: key === 'q' })
  }

  const field = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          aria-label="Buscar país"
          placeholder="Buscar país…"
          value={search}
          onChange={(e) => update('q', e.target.value)}
          className={`${field} min-w-60 flex-1`}
        />
        <select aria-label="Región" value={region} onChange={(e) => update('region', e.target.value)} className={field}>
          <option value="">Todas las regiones</option>
          {REGIONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
        <select aria-label="Ordenar" value={sort} onChange={(e) => update('sort', e.target.value)} className={field}>
          <option value="name">Nombre (A-Z)</option>
          <option value="population">Población</option>
          <option value="area">Área</option>
        </select>
      </div>

      {isPending && <p className="py-20 text-center text-slate-500">Cargando países…</p>}

      {isError && (
        <div role="alert" className="rounded-xl bg-red-50 p-6 text-center text-red-700">
          <p>{error.message}</p>
          <button className="mt-3 underline" onClick={() => refetch()}>
            Reintentar
          </button>
        </div>
      )}

      {data && (
        <>
          <p className="text-sm text-slate-500">{filtered.length} países</p>
          {visible.length === 0 ? (
            <p className="py-20 text-center text-slate-500">Ningún país coincide con la búsqueda.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((c) => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onChange={(p) => update('page', String(p))} />
        </>
      )}
    </div>
  )
}
