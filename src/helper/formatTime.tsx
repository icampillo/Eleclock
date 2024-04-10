export function formatTimeHHMM(horodatage: Date) {
    const date = new Date(horodatage);
    const heures = ("0" + date.getHours()).slice(-2); // Ajoute un zéro en tête si nécessaire pour le format hh
    const minutes = ("0" + date.getMinutes()).slice(-2); // Ajoute un zéro en tête si nécessaire pour le format mm
    return heures + ":" + minutes;
  }