# 📍 OÙ EXACTEMENT LES DONNÉES S'AJOUTENT ?

## 🎯 Réponse rapide

Quand vous créez une annonce, elle s'ajoute à **4 endroits** :

1. **`sampleDonations`** (mémoire) - Ligne 586 de `mock.ts`
2. **localStorage `sadaka_donations`** - Ligne 589 de `mock.ts`
3. **`userDonations[userId]`** (mémoire) - Ligne 596 de `mock.ts`
4. **localStorage `sadaka_user_donations`** - Ligne 598 de `mock.ts`

---

## 📊 Schéma visuel simplifié

```
UTILISATEUR CRÉE UNE ANNONCE
         │
         ▼
┌────────────────────────────────┐
│ CreateAnnouncement.tsx         │
│ Ligne 88 : api.post()          │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ mock.ts - handleMock()         │
│ Ligne 568 : POST /donations    │
└────────────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ Création de l'objet annonce    │
│ Lignes 570-583                 │
└────────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│ AJOUT 1 │ │ AJOUT 2 │
│         │ │         │
│ Ligne   │ │ Ligne   │
│ 586 ⭐  │ │ 596 ⭐  │
│         │ │         │
│ sample  │ │ user    │
│ Donations│ │Donations│
│ .push() │ │ [id]    │
│         │ │ .push() │
└─────────┘ └─────────┘
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│ SAUVE 1 │ │ SAUVE 2 │
│         │ │         │
│ Ligne   │ │ Ligne   │
│ 589 ⭐  │ │ 598 ⭐  │
│         │ │         │
│ save    │ │ save    │
│ Donations│ │UserDon │
│ ToStor()│ │ ToStor()│
└─────────┘ └─────────┘
    │         │
    ▼         ▼
┌─────────┐ ┌─────────┐
│localStor│ │localStor│
│         │ │         │
│sadaka_  │ │sadaka_  │
│donations│ │user_    │
│         │ │donations│
└─────────┘ └─────────┘
```

---

## 📝 Détails ligne par ligne

### Fichier : `src/utils/mock.ts`

#### Ligne 568 : Détection de la requête POST
```typescript
if (url.endsWith('/donations') && method === 'post') {
```

#### Lignes 570-583 : Création de l'objet annonce
```typescript
const newId = String(Date.now());
const newDonation = {
  id: newId,
  title: body.title || 'Nouvelle annonce',
  category: body.category || 'OTHER',
  quantity: body.quantity || 1,
  commune: body.commune || 'CASABLANCA',
  description: body.description || '',
  createdAt: new Date().toISOString(),
  status: 'PENDING',
  latitude: body.latitude || 33.5731,      // Centroïde
  longitude: body.longitude || -7.5898,    // Centroïde
  userId: currentUser?.id || 'unknown'     // Association utilisateur
};
```

#### Ligne 586 : ⭐ AJOUT 1 - Liste globale
```typescript
sampleDonations.push(newDonation);
```
- **Variable** : `sampleDonations` (tableau global)
- **Type** : `Array`
- **Usage** : Liste publique (Page "Annonces", "Carte", "Dashboard")
- **Persistance** : Non (mémoire seulement)

#### Ligne 589 : ⭐ SAUVEGARDE 1 - localStorage global
```typescript
saveDonationsToStorage(sampleDonations);
```
- **Fonction** : `saveDonationsToStorage()` (ligne 21)
- **Clé localStorage** : `sadaka_donations`
- **Format** : JSON array
- **Persistance** : ✅ Oui (survit au rechargement)

#### Lignes 592-599 : Ajout à la liste utilisateur
```typescript
if (currentUser?.id) {
  if (!userDonations[currentUser.id]) {
    userDonations[currentUser.id] = [];
  }
  // Ligne 596 : ⭐ AJOUT 2 - Liste utilisateur
  userDonations[currentUser.id].push(newDonation);
  
  // Ligne 598 : ⭐ SAUVEGARDE 2 - localStorage utilisateur
  saveUserDonationsToStorage(userDonations);
}
```

#### Ligne 596 : ⭐ AJOUT 2 - Liste utilisateur
```typescript
userDonations[currentUser.id].push(newDonation);
```
- **Variable** : `userDonations` (objet)
- **Type** : `Record<string, Array>`
- **Structure** : `{ 'u1': [annonces], 'u2': [annonces], ... }`
- **Usage** : Liste personnelle (Page "Mes annonces")
- **Persistance** : Non (mémoire seulement)

#### Ligne 598 : ⭐ SAUVEGARDE 2 - localStorage utilisateur
```typescript
saveUserDonationsToStorage(userDonations);
```
- **Fonction** : `saveUserDonationsToStorage()` (ligne 65)
- **Clé localStorage** : `sadaka_user_donations`
- **Format** : JSON object `{ userId: [annonces] }`
- **Persistance** : ✅ Oui (survit au rechargement)

---

## 🔍 Où voir les données ajoutées ?

### 1. Dans le code (débogage)
- **Ouvrir** : `src/utils/mock.ts`
- **Ligne 586** : `sampleDonations` (liste globale)
- **Ligne 596** : `userDonations[userId]` (liste utilisateur)

### 2. Dans le navigateur (localStorage)
- **Ouvrir** : Outils développeur (F12)
- **Onglet** : Application → Local Storage
- **Clés** :
  - `sadaka_donations` → Toutes les annonces
  - `sadaka_user_donations` → Annonces par utilisateur

### 3. Dans l'interface
- **Page "Annonces"** → Affiche `sampleDonations`
- **Page "Carte"** → Affiche `sampleDonations` (avec coordonnées)
- **Page "Mes annonces"** → Affiche `userDonations[userId]`

---

## 📊 Résumé visuel

| Étape | Fichier | Ligne | Action | Variable/Clé |
|-------|---------|-------|--------|--------------|
| 1 | `CreateAnnouncement.tsx` | 88 | Envoi formulaire | `api.post()` |
| 2 | `mock.ts` | 568 | Détection POST | `if (url.endsWith('/donations'))` |
| 3 | `mock.ts` | 570-583 | Création objet | `newDonation` |
| 4 | `mock.ts` | **586** ⭐ | **Ajout liste globale** | `sampleDonations.push()` |
| 5 | `mock.ts` | **589** ⭐ | **Sauvegarde globale** | `sadaka_donations` |
| 6 | `mock.ts` | **596** ⭐ | **Ajout liste user** | `userDonations[id].push()` |
| 7 | `mock.ts` | **598** ⭐ | **Sauvegarde user** | `sadaka_user_donations` |

---

## ✅ Points importants

1. **Les données s'ajoutent à 4 endroits** :
   - 2 en mémoire (tableaux JavaScript)
   - 2 dans localStorage (persistance)

2. **Ligne 586** : Ajout à la liste publique (visible par tous)

3. **Ligne 596** : Ajout à la liste personnelle (visible par l'utilisateur)

4. **Lignes 589 et 598** : Sauvegarde pour persistance

5. **Tout se passe dans** : `src/utils/mock.ts` lignes 568-601

---

**Les données s'ajoutent exactement aux lignes 586, 589, 596 et 598 du fichier `src/utils/mock.ts` ! ⭐**

