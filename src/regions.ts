export const REGION_LABELS: Record<string, string> = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Antarctic: 'Antártida',
}

export const regionLabel = (region: string) => REGION_LABELS[region] ?? region
