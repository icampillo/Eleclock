export function formatTimeHHMM(horodatage: Date) {
    // Créer un objet Date
    const date = new Date(horodatage);
    // Extraire les heures et les minutes de l'objet Date
    const heures = ("0" + date.getHours()).slice(-2); // Ajoute un zéro en tête si nécessaire pour le format hh
    const minutes = ("0" + date.getMinutes()).slice(-2); // Ajoute un zéro en tête si nécessaire pour le format mm
    return heures + ":" + minutes;
  }