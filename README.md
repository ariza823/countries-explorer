# Countries Explorer

Buscador de países que consume la API pública de [REST Countries](https://restcountries.com).

**Demo:** https://ariza823.github.io/countries-explorer/

## Qué tiene

- Búsqueda con debounce, filtro por región y orden por nombre, población o área
- Filtros y página guardados en la URL (se pueden compartir y funcionan con el botón atrás)
- Vista de detalle con navegación entre países fronterizos
- Caché de peticiones con TanStack Query, estados de carga, error y reintento
- Tests de la lógica de filtrado y del componente de tarjeta

## Stack

React 19 · TypeScript · TanStack Query · React Router 7 · Tailwind CSS v4 · Vite · Vitest · Testing Library

## Decisiones

- La lógica de filtrado es una función pura (`filterCountries`) separada de React: se testea sin montar componentes ni simular red.
- La lista completa se pide una sola vez con `staleTime` de una hora; filtrar y paginar se hace en el cliente.
- Se usa `HashRouter` para que el deploy en GitHub Pages funcione sin configurar redirecciones.

## Correr local

```bash
npm install
npm run dev
npm test
```
