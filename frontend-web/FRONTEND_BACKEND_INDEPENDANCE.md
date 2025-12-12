# 🔗 Frontend et Backend - Indépendance

## ✅ Oui, le frontend fonctionne SANS le backend !

### 🎯 Comment ça fonctionne ?

Le frontend utilise un **système de mocks** qui simule le backend. Cela signifie que :

1. **Le frontend fonctionne complètement seul** ✅
2. **Aucun backend n'est nécessaire** pour la démonstration ✅
3. **Toutes les données sont simulées** dans le frontend ✅

---

### 📋 Mécanisme technique

#### 1. Configuration des mocks (activés par défaut)

Dans `src/utils/api.ts` :
```typescript
// Utiliser les mocks par défaut pour la démonstration
const useMocks = String(import.meta.env.VITE_USE_MOCKS || '1') === '1';
```

**Par défaut, `VITE_USE_MOCKS` vaut `'1'`**, donc les mocks sont **TOUJOURS activés**.

#### 2. Interception automatique

Le système intercepte toutes les requêtes API :
- Si le backend répond → utilise le backend
- Si le backend ne répond pas (erreur réseau) → utilise automatiquement les mocks
- Si `VITE_USE_MOCKS=1` → utilise toujours les mocks

#### 3. Données simulées

Toutes les données sont dans `src/utils/mock.ts` :
- ✅ 15 annonces de dons
- ✅ 4 utilisateurs de test
- ✅ 3 abonnés newsletter
- ✅ Toutes les routes API simulées

---

### 🔄 Flux de fonctionnement

```
Frontend (React)
    ↓
Requête API (axios)
    ↓
Intercepteur vérifie :
    ├─ Backend disponible ? → Utilise le backend
    └─ Backend indisponible OU mocks activés ? → Utilise les mocks
    ↓
Données retournées au frontend
```

**Pour la démonstration :** Les mocks sont toujours utilisés car activés par défaut.

---

### ⚙️ Configuration actuelle

#### Proxy Vite (vite.config.ts)
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:8080',  // Backend Java
    changeOrigin: true
  }
}
```

**Mais** : Si le backend n'est pas lancé sur le port 8080, les mocks prennent automatiquement le relais.

#### Variable d'environnement
- `VITE_USE_MOCKS=1` → Mocks activés (défaut)
- `VITE_USE_MOCKS=0` → Essaie d'utiliser le backend réel

**Par défaut, aucun fichier `.env` n'existe**, donc les mocks sont toujours utilisés.

---

### 🎯 Pour la présentation demain

#### ✅ Ce que vous devez savoir :

1. **Le backend n'est PAS nécessaire** pour la démo
2. **Lancez seulement le frontend** : `npm run dev`
3. **Toutes les données sont dans le frontend** (fichier `mock.ts`)
4. **Le système fonctionne complètement seul**

#### ❌ Ce que vous n'avez PAS besoin de faire :

- ❌ Lancer le backend Java
- ❌ Configurer une base de données
- ❌ Démarrer un serveur backend
- ❌ Se connecter à une API externe

---

### 🔄 Si vous voulez connecter le backend plus tard

#### Option 1 : Désactiver les mocks
Créer un fichier `.env` dans `frontend-web/` :
```env
VITE_USE_MOCKS=0
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Option 2 : Garder les mocks comme fallback
Les mocks s'activent automatiquement si le backend ne répond pas.

---

### 📊 Résumé

| Aspect | Frontend seul (mocks) | Frontend + Backend |
|--------|------------------------|-------------------|
| **Lancement** | `npm run dev` seulement | Frontend + Backend Java |
| **Données** | Dans `mock.ts` | Base de données réelle |
| **Fonctionnalités** | ✅ Toutes fonctionnent | ✅ Toutes fonctionnent |
| **Démo** | ✅ Parfait pour la démo | ✅ Pour production |

---

### ✅ Conclusion

**Pour la présentation demain :**
- ✅ **Lancez seulement le frontend**
- ✅ **Le backend n'est pas nécessaire**
- ✅ **Tout fonctionne avec les mocks**
- ✅ **Aucune configuration supplémentaire requise**

**Le frontend est complètement indépendant du backend grâce au système de mocks !** 🎉

