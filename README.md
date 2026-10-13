# Countries Explorer

Buscador de países hecho con React, TypeScript y TanStack Query.

**Demo:** https://ariza823.github.io/countries-explorer/

## Qué tiene

- Búsqueda con debounce (ignora tildes), filtro por región y orden por nombre o área
- Filtros y página guardados en la URL (se pueden compartir y funcionan con el botón atrás)
- Vista de detalle con navegación entre países fronterizos
- Caché de peticiones con TanStack Query, estados de carga, error y reintento
- Tests de la lógica de filtrado y del componente de tarjeta

## Stack

React 19 · TypeScript · TanStack Query · React Router 7 · Tailwind CSS v4 · Vite · Vitest · Testing Library

## Sobre los datos

La primera versión consumía la API v3.1 de REST Countries. En 2026 esa versión se dio de baja y la v5 exige API key, que no se puede esconder en un frontend estático. La solución fue generar un JSON en el build (`scripts/build-data.mjs`) desde el paquete [`world-countries`](https://www.npmjs.com/package/world-countries), que tiene los mismos datos, y servirlo junto a la app. Las banderas vienen de [flagcdn](https://flagcdn.com).

La capa `src/api/countries.ts` sigue siendo asíncrona y pasa por TanStack Query, así que volver a una API real es cambiar solo ese archivo.

## Decisiones

- La lógica de filtrado es una función pura (`filterCountries`) separada de React: se testea sin montar componentes ni simular red.
- La lista completa se pide una sola vez con `staleTime` de una hora; filtrar y paginar se hace en el cliente.
- Nombres en español tomados de las traducciones del dataset.
- Se usa `HashRouter` para que el deploy en GitHub Pages funcione sin configurar redirecciones.

## Correr local

```bash
npm install
npm run dev
npm test
```
