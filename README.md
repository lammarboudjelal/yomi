# Yomi

Yomi est une application mobile de gestion de lectures développée avec React Native et Expo dans le cadre d’un projet informatique individuel (ENSC - S9).

L’application permet de constituer une bibliothèque personnelle de livres, suivre leur état de lecture et accéder rapidement aux informations associées à chaque ouvrage.

---

# Sommaire

- [Aperçu de l'application](#aperçu-de-lapplication)
- [Documentation](#documentation)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation du projet](#installation-du-projet)
- [Structure du projet](#structure-du-projet)
- [Gestion des versions](#gestion-des-versions)
- [Auteur](#auteur)

---

# Aperçu de l'application

<img src="./assets/capture_ecran_bibliotheque.png" alt="Écran Bibliothèque" height="500" />
<img src="./assets/capture_ecran_fiche_livre.png" alt="Fiche détail d'un livre" height="500" />
<img src="./assets/capture_ecran_formulaire_ajout.png" alt="Formulaire d'ajout de livre" height="500" />

---

# Documentation

- [Maquettes]()
- [Spécification fonctionnelle]()
- [Planning]()

---

# Fonctionnalités

### Gestion de la bibliothèque

- visualiser l’ensemble des livres enregistrés
- affichage sous forme de cartes avec couverture
- statistiques rapides (nombre total, livres lus, à lire)

### Fiche détaillée d’un livre

- affichage des informations complètes
- modification des informations
- suppression d’un livre
- modification rapide de l’état de lecture

### Ajout de livre

- formulaire d’ajout d’un nouveau livre
- choix d’une couverture
- stockage dans la base de données locale

### Suivi de lecture

- gestion de l’état de lecture (à lire, en cours, lu)

### Feedback utilisateur

- affichage de notifications (toast) après :
  - ajout
  - modification
  - suppression

---

# Technologies utilisées

### React Native

Framework utilisé pour développer l'application. Il permet de créer une application compatible iOS et Android à partir d’un même code source.

### Expo

Outil facilitant le développement React Native. Expo simplifie la configuration du projet, la gestion des dépendances et l'accès à certaines fonctionnalités natives du téléphone.

### TypeScript

Langage typé (surcouche de Javascript) permettant de réduire les erreurs et de rendre le code plus maintenable.

### SQLite

Base de données locale utilisée pour stocker les livres de la bibliothèque directement sur le téléphone. Cela permet à l’application de fonctionner sans connexion internet.

### React Navigation

Bibliothèque utilisée pour gérer la navigation entre les différents écrans de l’application.

### Prettier

Outil de formatage automatique du code utilisé pour garantir une mise en forme cohérente dans tout le projet.

---

# Installation du projet

> Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- Node.js
- npm ou yarn
- [Android Studio](https://docs.expo.dev/get-started/set-up-your-environment/?mode=expo-go&platform=android&device=simulated) (pour simulateur Android)
- [Xcode](https://docs.expo.dev/get-started/set-up-your-environment/?mode=expo-go&platform=ios&device=simulated) (pour simulateur iOS - macOS uniquement)

_Remarque : Sur macOS et Linux, il est possible d'utiliser [Homebrew](https://brew.sh/) pour installer facilement certaines dépendances comme Node.js ou Android Studio._

> Cloner le projet

```sh
git clone https://github.com/lammarboudjelal/yomi.git
cd yomi
```

> Installer les dépendances

```sh
npm install
```

> Générer les fichiers natifs (Expo Prebuild)

Le projet utilise certaines bibliothèques nécessitant des modules natifs, comme par exemple l'extraction de couleurs d'une image ([react-native-image-colors](https://www.npmjs.com/package/react-native-image-colors)). Dans ce cas, Expo doit générer les projets iOS et Android natifs.

```sh
npx expo prebuild
```

Cette commande génère les dossiers ios/ et android/ nécessaires au fonctionnement des modules natifs.

> Lancer l'application

**iOS**

```sh
npx expo run:ios
```

Cette commande compile l'application et la lance sur le simulateur iOS.

**Android**

```sh
npx expo run:android
```

Cette commande compile l'application et la lance sur le simulateur Android.

---

# Structure du projet

```
src/
 ├── components
 │
 ├── screens
 │
 ├── services
 │
 ├── data
 │
 ├── navigation
 │
 ├── utils
 │
 ├── models
 |
 └── App.tsx
```

Organisation générale :

- components : composants réutilisables
- screens : écrans principaux de l'application
- services : logique métier et accès aux données
- data : gestion de la base SQLite
- navigation : configuration de React Navigation
- utils : fonctions utilitaires
- models : types et modèles de données

---

# Gestion des versions

Le projet utilise Git avec la stratégie suivante :

- main : branche stable
- dev : branche de développement

Les nouvelles fonctionnalités sont développées sur dev puis intégrées dans main lors des releases.

---

# Auteur

Lina AMMAR-BOUDJELAL\
Groupe 1 - Promotion 2027
