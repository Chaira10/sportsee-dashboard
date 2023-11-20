# Project 12 - Développez un tableau de bord d'analytics avec React

![sportsee](./public/13.png)

Ce projet a été démarré avec Create React App.

## 1. Back-end

Dans le répertoire back-end, clonez le repo à partir d'[ici](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard)

Installer les dépendances avec yarn install

Lancer le back-end avec yarn dev port 3000 par défaut

## 2. Endpoints

### 2.1 Possible endpoints

Ce projet comprend quatre points d'accès que vous pourrez utiliser :

- `http://localhost:3000/user/${userId}` - récupère les informations d'un utilisateur. Ce premier point d'accès comprend l'identifiant de l'utilisateur, des informations sur l'utilisateur (prénom, nom et âge), le score du jour (todayScore) et des données clés (calories, macronutriments, etc.).
- `http://localhost:3000/user/${userId}/activity` - récupère l'activité d'un utilisateur jour par jour avec les kilogrammes et les calories.
- `http://localhost:3000/user/${userId}/average-sessions` - récupère la moyenne des sessions d'un utilisateur par jour. La semaine commence le lundi.
- `http://localhost:3000/user/${userId}/performance` - récupère les performances d'un utilisateur (énergie, endurance, etc.). Attention, pour l'instant, seuls deux utilisateurs ont été simulés. Ils ont respectivement les userId 12 et 18.

### 3 Dans le répertoire Front-end

Installez les dépendances avec npm install

Lancer le front-end avec npm start port 3001 par défaut

Ouvrez `http://localhost:3001` pour l'afficher dans votre navigateur.
