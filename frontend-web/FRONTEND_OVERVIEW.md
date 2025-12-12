## SADAKA — Frontend Web : Guide détaillé

Ce document explique la structure complète du frontend web, les langages utilisés, le rôle de chaque module, la logique des mocks et la procédure d’exécution (`cd frontend-web && npm run dev`).

---

### 1. Technologies & langages utilisés

| Domaine | Technologies |
| --- | --- |
| Langage | **TypeScript** (superset de JavaScript avec typage) |
| Framework UI | **React 18** (hooks, context, routing) |
| Build Tool | **Vite** (démarrage rapide, hot reload) |
| UI Kit | **Ant Design + icons** |
| HTTP client | **Axios** |
| SIG | **Leaflet** + **React-Leaflet** |
| Styles | CSS classique (fichier `src/styles/index.css`) |

---

### 2. Commandes d’exécution

#### Pourquoi `cd frontend-web && npm run dev` ?

1. **`cd frontend-web`** : on se place dans le dossier qui contient le projet React (package.json, src, vite.config.ts, etc.).  
2. **`npm run dev`** : lance le serveur de développement fourni par Vite.  
   - Vite compile les fichiers TypeScript/React à la volée.  
   - Ouvre un serveur local (par défaut sur http://localhost:5173).  
   - Hot reload : toute modification dans `src/` se reflète instantanément.

Paquet requis : Node.js 18+ et npm 9+.

---

### 3. Structure des fichiers principaux

```
frontend-web/
├── package.json           # Dépendances, scripts (dev/build)
├── src/
│   ├── main.tsx           # Entrée React, BrowserRouter, providers
│   ├── App.tsx            # Définition des routes
│   ├── context/           # AuthContext (token, rôles, permissions)
│   ├── components/        # AppLayout, MapView, ProtectedRoute, ErrorBoundary
│   ├── pages/             # Home, Announcements, Map, Dashboard, Admin, etc.
│   ├── utils/
│   │   ├── api.ts         # Axios configuré, interception des erreurs
│   │   ├── mock.ts        # Serveur mock (auth, annonces, rôles, newsletter…)
│   │   └── roles.ts       # Enum rôles + permissions
│   ├── data/moroccanCommunes.ts # Liste des communes + coordonnées
│   └── styles/index.css   # Thème global (couleur primaire verte)
├── public/ (non utilisé car Vite se base sur src/)
└── vite.config.ts         # Configuration Vite, proxy API
```

---

### 4. Détail par fonctionnalités

#### 4.1 Authentification & rôles
- `context/AuthContext.tsx` : stocke `user`, `token`, définit `login`, `logout`, `register`.
- `utils/roles.ts` : rôle enum + tableau de permissions.
- `components/ProtectedRoute.tsx` : route protégée selon `requireAuth` et `requiredPermission`.

#### 4.2 Pages principales
- `pages/Home.tsx` : accueil, chiffres clés, actions rapides.
- `pages/Announcements.tsx` : tableau filtrable + drawer détaillé + prise d’intérêt.
- `pages/Map.tsx` + `components/MapView.tsx` : carte SIG (filtres synchronisés, icônes par catégorie, popups).
- `pages/CreateAnnouncement.tsx` : formulaire complet (catégorie, photos, commune, géoloc, IME, contact).
- `pages/MyAnnouncements.tsx` : annonces de l’utilisateur, liste des demandeurs, assignation partielle, suppression.
- `pages/Dashboard.tsx` : statistiques globales, graphes, filtres.
- `pages/Admin.tsx` : rôles, validation annonces, utilisateurs, newsletter.
- `pages/Login.tsx` / `pages/Register.tsx` : formulaires d’authentification avec UI verte + logo.

#### 4.3 Mock API
- Fichier : `src/utils/mock.ts`.
- Objectif : simuler le backend tant que l’API réelle n’est pas disponible.
- Fonctionnement :
  - Intercepte les échecs réseau ou quand `VITE_USE_MOCKS=1`.
  - Routes simulées : `/auth/login`, `/auth/me`, `/donations`, `/donations/:id/interest`, `/me/donations`, `/roles`, `/newsletter/...`, etc.
  - `sampleDonations` fournit des annonces réalistes (catégories, coordonnées, statuts).
  - Gestion de `currentUser`, `userDonations`, `interestedRecords`.
  - Permet de tester toutes les fonctionnalités sans backend.

---

### 5. Rappels pour la présentation au professeur

- **Cahier des charges couvert** :
  - Création / suppression / assignation d’annonces via l’espace utilisateur.
  - Tableaux filtrables + carte synchronisée.
  - Gestion admin des annonces, rôles, newsletter.
  - SIG avec géolocalisation, filtres, popups détaillés.
  - Application stylée (couleur primaire verte, logo, responsive).

- **Pour lancer la démo** :
  ```bash
  cd frontend-web
  npm install   # première fois uniquement
  npm run dev   # lance Vite sur http://localhost:5173
  ```

- **Comptes de test** dans `Login.tsx` (admin, modérateur, utilisateur).
- Expliquer que le mock renvoie par défaut un utilisateur si on actualise sans se reconnecter — c’est le comportement d’un fake backend, facilement remplaçable par l’API réelle.

---

### 6. Annexes

- **scripts npm** (`package.json`) :
  - `npm run dev` : Vite dev server.
  - `npm run build` : build production (tsc + vite).
  - `npm run preview` : prévisualisation du build.
- **Proxy** : `vite.config.ts` redirige `/api` vers `http://localhost:8080` pour le backend réel.
- **TypeScript strict** : `tsconfig.json` (strict, path alias).

---

En résumé : le frontend est un SPA React TypeScript, stylé avec Ant Design, utilisant des mocks pour simuler l’API (et prêt à être branché sur le backend). La commande `cd frontend-web && npm run dev` permet de lancer rapidement la démonstration du site complet (public + admin + SIG). 

