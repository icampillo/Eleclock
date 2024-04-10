# Eleclock

Le projet Eleclock est une horloge avec gestion d'alarme. Elle prermet aussi aux utilisateurs de calculer : 
- le temps écoulé depuis leur date de naissance 
- le nombre d'heures passées à dormir 
- le nombre d'heures éveillées.

# Fonctionnalités

- Programmer une alarme
- Calcul temps de vie

## application Electron :

Frontend : typescript / react <br/>
Server : electron / SQLite

# Capture d'écran

<img width="797" alt="image" src="https://github.com/icampillo/Eleclock/assets/25935434/dd2ec5ef-bfce-4be5-9163-6d0003ac7207">

# Installation

Pour utiliser l'application localement, suivez ces étapes :

- Clonez ce dépôt sur votre machine locale en utilisant ``` git clone ```
- Installer les dependances du projet ``` npm install ```
- Build le projet ``` npm run build && tsc ```
- Lancer le projet ``` npm run electron-start ```

# Technologies utilisées

- Electron x TypesScript (back)
- Sqlite
- React typesScript (front)

# Fonctionnement

1. choisir une heure et enregistrer l'alarme.
2. des que l'alarme se declanche une modal apparait avec l'heure de l'alarme et un bouton desactiver.
3. possible de desactiver/activer/supprimer les alarmes à sa guise.

# Ameliorations

- A ce jour les alarmes ne prennent en compte que les heures. Il faudrait rajouter un ou des jours ou l'alarmes doit s'activer.
- Ajouter un systeme de repetition comme avec l'iphone.
- Ajouter une selection de plusieurs sonneries
- Ajouter un onglet avec les heures des plus grandes villes du monde (NY, Tokyo, Carnoux-en-Provence, etc..) 

# Auteur

Ilan Campillo
