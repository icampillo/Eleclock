
export function formatDate(timestamp: Date) {
  return timestamp.toLocaleString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}