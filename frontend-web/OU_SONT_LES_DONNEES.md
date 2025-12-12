# 📍 Où sont stockées les données ?

## 🎯 Réponse rapide

Quand vous ajoutez un nouveau don, il est ajouté **en mémoire JavaScript** dans le navigateur, dans le fichier `src/utils/mock.ts`.

---

## 📊 Stockage des données

### 1. **Données initiales (15 annonces)**

**Fichier :** `src/utils/mock.ts`  
**Variable :** `sampleDonations` (ligne 8)

```typescript
const sampleDonations = [
  { id: '1', title: 'Don de vêtements...', ... },
  { id: '2', title: 'Panier alimentaire...', ... },
  // ... 15 annonces au total
];
```

✅ **Persistantes** : Ces données sont dans le code source, donc elles sont toujours là.

---

### 2. **Nouveaux dons ajoutés par les utilisateurs**

**Fichier :** `src/utils/mock.ts`  
**Variable :** `sampleDonations` (même tableau, mais modifié dynamiquement)

**Code qui ajoute un nouveau don (lignes 273-301) :**

```typescript
if (url.endsWith('/donations') && method === 'post') {
  // ... création du nouveau don ...
  
  // ✅ Ajouter à la liste globale
  sampleDonations.push(newDonation);
  
  // ✅ Ajouter à la liste de l'utilisateur
  userDonations[currentUser.id].push(newDonation);
}
```

---

### 3. **Stockage par utilisateur**

**Fichier :** `src/utils/mock.ts`  
**Variable :** `userDonations` (ligne 202)

```typescript
const userDonations: Record<string, any[]> = {};
```

Chaque utilisateur a sa propre liste d'annonces créées.

---

## ⚠️ IMPORTANT : Persistance des données

### ❌ Les nouvelles données ne sont PAS sauvegardées dans un fichier

**Problème actuel :**
- Les 15 annonces initiales sont dans le code source → ✅ **Persistantes**
- Les nouveaux dons ajoutés sont en mémoire JavaScript → ❌ **Perdus au rechargement**

**Ce qui se passe :**
1. Vous créez un nouveau don → Il apparaît dans la liste ✅
2. Vous rechargez la page → Le nouveau don disparaît ❌
3. Seules les 15 annonces initiales restent ✅

---

## 🔄 Où exactement les données sont ajoutées ?

### Lors de la création d'un don :

1. **Formulaire** (`CreateAnnouncement.tsx`) → Envoie les données via `api.post('/donations', payload)`

2. **Intercepteur API** (`api.ts`) → Redirige vers les mocks

3. **Handler Mock** (`mock.ts`, ligne 273) → Reçoit la requête POST

4. **Ajout dans `sampleDonations`** (ligne 291) :
   ```typescript
   sampleDonations.push(newDonation);
   ```
   → Ajouté au tableau global visible par tous

5. **Ajout dans `userDonations`** (ligne 298) :
   ```typescript
   userDonations[currentUser.id].push(newDonation);
   ```
   → Ajouté à la liste personnelle de l'utilisateur

---

## 📍 Emplacement dans le code

### Fichier : `src/utils/mock.ts`

**Ligne 8** : Tableau initial des 15 annonces
```typescript
const sampleDonations = [ ... ];
```

**Ligne 202** : Stockage par utilisateur
```typescript
const userDonations: Record<string, any[]> = {};
```

**Lignes 273-301** : Fonction qui ajoute un nouveau don
```typescript
if (url.endsWith('/donations') && method === 'post') {
  // Création du nouveau don
  const newDonation = { ... };
  
  // Ajout dans le tableau global
  sampleDonations.push(newDonation);
  
  // Ajout dans la liste utilisateur
  userDonations[currentUser.id].push(newDonation);
}
```

---

## 💾 Pourquoi les données disparaissent au rechargement ?

**Raison :** Les données sont stockées en **mémoire JavaScript** (RAM), pas dans un fichier.

**Analogie :**
- Les 15 annonces initiales = Livres dans une bibliothèque (fichier source) ✅
- Les nouveaux dons = Notes écrites sur un tableau (mémoire) ❌

Quand vous rechargez la page :
- Le code source est rechargé → Les 15 annonces reviennent ✅
- La mémoire est effacée → Les nouveaux dons disparaissent ❌

---

## 🔧 Solutions possibles

### Option 1 : Utiliser localStorage (temporaire)
Sauvegarder les nouveaux dons dans le localStorage du navigateur.

**Avantages :**
- ✅ Les données persistent entre les rechargements
- ✅ Facile à implémenter

**Inconvénients :**
- ❌ Perdues si on efface le cache
- ❌ Uniquement sur le navigateur actuel

### Option 2 : Connecter au backend réel (production)
Utiliser une vraie base de données via le backend Java.

**Avantages :**
- ✅ Persistance permanente
- ✅ Partage entre utilisateurs
- ✅ Sécurisé

**Inconvénients :**
- ❌ Nécessite le backend fonctionnel
- ❌ Nécessite une base de données

---

## 📝 Résumé

| Type de données | Où ? | Persiste ? |
|----------------|------|------------|
| **15 annonces initiales** | `mock.ts` ligne 8 | ✅ Oui (dans le code) |
| **Nouveaux dons créés** | `mock.ts` ligne 291 (`sampleDonations`) | ❌ Non (mémoire seulement) |
| **Liste par utilisateur** | `mock.ts` ligne 298 (`userDonations`) | ❌ Non (mémoire seulement) |

---

## 🎯 Pour la démonstration

**Ce que vous devez savoir :**
1. Les 15 annonces initiales sont toujours là ✅
2. Vous pouvez créer de nouveaux dons pendant la démo ✅
3. Les nouveaux dons apparaissent immédiatement ✅
4. **Mais** ils disparaissent si vous rechargez la page ❌

**Conseil pour la présentation :**
- Créez quelques dons avant la présentation pour montrer qu'on peut en ajouter
- Ou créez-les pendant la démo, mais ne rechargez pas la page

---

**Fichier principal :** `src/utils/mock.ts`

