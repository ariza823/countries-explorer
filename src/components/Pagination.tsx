interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  const btn = 'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm disabled:opacity-40'
  return (
    <nav className="flex items-center justify-center gap-3" aria-label="Paginación">
      <button className={btn} disabled={page === 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span className="text-sm tabular-nums">
        Página {page} de {totalPages}
      </span>
      <button className={btn} disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </nav>
  )
}
