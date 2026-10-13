import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchCountry, flagUrl } from '../api/countries'
import { regionLabel } from '../regions'

const fmt = new Intl.NumberFormat('es-CO')

export function CountryPage() {
  const { code = '' } = useParams()
  const navigate = useNavigate()
  const { data: c, isPending, isError } = useQuery({
    queryKey: ['country', code],
    queryFn: () => fetchCountry(code),
  })

  if (isPending) return <p className="py-20 text-center text-slate-500">Cargando…</p>
  if (isError || !c)
    return (
      <p role="alert" className="py-20 text-center text-red-600">
        No se pudo cargar el país. <Link to="/" className="underline">Volver</Link>
      </p>
    )

  const rows: [string, string][] = [
    ['Nombre oficial', c.name.official],
    ['Capital', c.capital?.join(', ') ?? '—'],
    ['Región', `${regionLabel(c.region)}${c.subregion ? ` · ${c.subregion}` : ''}`],
    ['Área', `${fmt.format(c.area)} km²`],
    ['Idiomas', Object.values(c.languages ?? {}).join(', ') || '—'],
    ['Monedas', Object.values(c.currencies ?? {}).map((m) => m.name).join(', ') || '—'],
  ]

  return (
    <article className="space-y-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded-lg bg-white px-4 py-2 text-sm shadow-sm ring-1 ring-slate-200"
      >
        ← Volver
      </button>
      <div className="grid items-start gap-10 md:grid-cols-2">
        <img src={flagUrl(c)} alt={`Bandera de ${c.name.common}`} className="w-full rounded-xl shadow" />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{c.name.common}</h1>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-slate-500">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {c.borders && c.borders.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-medium">Fronteras</h2>
              <div className="flex flex-wrap gap-2">
                {c.borders.map((b) => (
                  <Link key={b} to={`/country/${b}`} className="rounded-md bg-white px-3 py-1 text-xs shadow-sm ring-1 ring-slate-200 hover:ring-indigo-400">
                    {b}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
