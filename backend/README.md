

# OTP-auth

authetification systeme opt by (message or email)
> **OTP-auth** est une API RESTful construite avec Node.js, Express, et Sequelize, permettant d'authentifier des utilisateur par otp 

---

## Table des matières

1. [Installation](#installation)
2. [Utilisation](#utilisation)
3. [Structure du projet](#structure-du-projet)
4. [Scripts](#scripts)
5. [Technologies utilisées](#technologies-utilisées)
6. [Contribuer](#contribuer)
7. [Licence](#licence)

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/sandjonyves/tp-gl.git
cd tp-gl
```

### 2. Installer les dépendances

Utilise `npm` ou `yarn` pour installer toutes les dépendances nécessaires.

```bash
npm install
```

ou

```bash
yarn install
```

---

## Utilisation

### Lancer le serveur

Pour démarrer le serveur en mode développement, utilise **nodemon** :

```bash
npm run dev
```

Cela va lancer le serveur en utilisant `nodemon`, qui redémarrera automatiquement le serveur lors des changements dans les fichiers.

Le serveur sera accessible à l'adresse :  
**http://localhost:3000**

### Variables d'environnement

Assure-toi d'avoir un fichier `.env` configuré avec les variables suivantes (exemple) :

```ini
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=...
DB_NAME=ma_base
```

### Tester les routes

Tu peux utiliser Postman ou un autre outil pour tester les routes disponibles sur ton serveur.

---

## Structure du projet

Voici à quoi ressemble la structure de ton projet :

```
├── node_modules/          # Dépendances du projet
├── src/
│   ├── controllers/       # Logique des contrôleurs (gestion des routes)
│   ├── models/            # Définition des modèles Sequelize
│   ├── routes/            # Routes de l'API
│   ├── middlewares/       # Middleware (authentification, validation, etc.)
│   └── server.js          # Point d'entrée du serveur
├── .env                   # Fichier pour les variables d'environnement
├── .gitignore             # Fichiers à ignorer dans Git
├── package.json           # Fichier des dépendances et scripts npm
└── README.md              # Documentation du projet
```

---

## Scripts

- **`npm run dev`** : Lancer le serveur en mode développement avec nodemon.
- **`npm run start`** : Lancer le serveur en mode production.
- **`npm run lint`** : Vérifier la syntaxe du code avec ESLint.
- **`npm run test`** : Exécuter les tests unitaires du projet.

---

## Technologies utilisées

- **Node.js** - Environnement d'exécution JavaScript.
- **Express.js** - Framework pour construire des API.
- **Sequelize** - ORM pour gérer la base de données (par exemple, SQLite, MySQL, PostgreSQL).
- **nodemon** - Redémarre automatiquement le serveur lors des modifications de fichier.
- **dotenv** - Gestion des variables d'environnement.
- **Jest** - Framework de test.


---

## Licence

Distribué sous la licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.