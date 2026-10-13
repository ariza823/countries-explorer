import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { CountryPage } from './pages/CountryPage'
import { HomePage } from './pages/HomePage'

// HashRouter para que funcione en GitHub Pages sin configurar rewrites.
export default function App() {
  return (
    <HashRouter>
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link to="/" className="text-lg font-bold">🌎 Countries Explorer</Link>
          <span className="text-xs text-slate-500">Datos: world-countries · banderas: flagcdn</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryPage />} />
        </Routes>
      </main>
    </HashRouter>
  )
}
