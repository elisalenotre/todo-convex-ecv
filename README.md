# My To-Do App

Ce projet est une application de gestion de tâches (To-Do List) construite avec **React**, **Convex (serverless)** et **TypeScript**. L'application permet de créer, afficher, modifier et supprimer des tâches avec un statut de `todo`, `in progress` ou `done`.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/)
- [Convex](https://www.convex.dev/) (pour la gestion de la base de données et du backend)

## Installation

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/my-todo-app.git
   cd my-todo-app

2. Installez les dépendances avec npm :

 ```bash
   npm install

3. Configurez Convex :

 ```bash
   npx convex dev --once --configure=new

## Installation

Pour exécuter les tests:

 ```bash
   npm test


## Déploiement

Une fois que vous avez terminé le développement local, vous pouvez déployer votre projet avec Convex en utilisant le CLI :

 ```bash
   npx convex deploy