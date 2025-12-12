# 📝 Nouveaux Comptes et Stockage JSON

## ✅ Système implémenté

Le système permet maintenant de :
1. **Créer de nouveaux comptes** qui sont sauvegardés
2. **Stocker toutes les données** dans localStorage (JSON)
3. **Exporter/Importer** les données au format JSON
4. **Persister** les données entre les sessions

---

## 🆕 Création de nouveaux comptes

### Comment ça marche ?

1. **Inscription** : L'utilisateur remplit le formulaire d'inscription
2. **Vérification** : Le système vérifie que l'email n'existe pas déjà
3. **Création** : Un nouvel utilisateur est créé avec un ID unique
4. **Sauvegarde** : L'utilisateur est sauvegardé dans localStorage
5. **Connexion** : L'utilisateur peut se connecter avec son email/mot de passe

### Où sont stockés les nouveaux comptes ?

**Fichier :** `src/utils/mock.ts`  
**localStorage :** `sadaka_users` (clé)

```typescript
// Les utilisateurs sont stockés dans :
localStorage.setItem('sadaka_users', JSON.stringify(mockUsers));
```

---

## 💾 Stockage des données

### 1. Utilisateurs
- **Clé localStorage :** `sadaka_users`
- **Contenu :** Tous les utilisateurs (initiaux + créés)
- **Format :** JSON

### 2. Dons/Annonces
- **Clé localStorage :** `sadaka_donations`
- **Contenu :** Toutes les annonces (initiales + créées)
- **Format :** JSON

### 3. Dons par utilisateur
- **Clé localStorage :** `sadaka_user_donations`
- **Contenu :** Liste des dons créés par chaque utilisateur
- **Format :** JSON

---

## 📤 Export des données

### Dans la page Admin

1. **Se connecter** en tant qu'admin (`admin@sadaka.ma`)
2. **Aller dans l'onglet "Données JSON"**
3. **Cliquer sur "Exporter toutes les données"**
4. **Un fichier JSON** est téléchargé avec :
   - Tous les utilisateurs
   - Toutes les annonces
   - Les dons par utilisateur
   - Date d'export

### Format du fichier JSON exporté

```json
{
  "donations": [...],
  "users": {...},
  "userDonations": {...},
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "version": "1.0"
}
```

---

## 📥 Import des données

### Dans la page Admin

1. **Se connecter** en tant qu'admin
2. **Aller dans l'onglet "Données JSON"**
3. **Cliquer sur "Importer des données"**
4. **Sélectionner un fichier JSON**
5. **Les données sont importées** et remplacent les données actuelles
6. **La page se recharge** automatiquement

---

## 🔄 Persistance

### Ce qui persiste entre les sessions :

✅ **Utilisateurs créés** → Sauvegardés dans localStorage  
✅ **Annonces créées** → Sauvegardées dans localStorage  
✅ **Dons par utilisateur** → Sauvegardés dans localStorage  
✅ **Connexions** → Token sauvegardé dans localStorage

### Ce qui ne persiste PAS :

❌ **Si on efface le cache** → Toutes les données sont perdues  
❌ **Si on change de navigateur** → Les données ne sont pas partagées

**Solution :** Utiliser l'export JSON pour sauvegarder les données !

---

## 🎯 Pour la présentation au professeur

### Scénario de démonstration :

1. **Créer un nouveau compte**
   - Aller sur "Créer un compte"
   - Remplir le formulaire
   - Le compte est créé et sauvegardé ✅

2. **Se connecter avec le nouveau compte**
   - Utiliser l'email/mot de passe créé
   - La connexion fonctionne ✅

3. **Créer une annonce avec le nouveau compte**
   - L'annonce est créée et sauvegardée ✅
   - Elle apparaît dans "Mes annonces" ✅

4. **Recharger la page**
   - Les données sont toujours là ✅
   - Le compte existe toujours ✅
   - Les annonces sont toujours là ✅

5. **Exporter les données**
   - Aller dans Admin → Données JSON
   - Exporter → Fichier JSON téléchargé ✅
   - Montrer le fichier JSON au professeur ✅

---

## 📋 Fonctions disponibles

### Dans `src/utils/mock.ts` :

```typescript
// Exporter toutes les données
export function exportAllDataAsJSON()

// Importer des données
export function importDataFromJSON(data: any)
```

### Utilisation dans le code :

```typescript
import { exportAllDataAsJSON, importDataFromJSON } from '../utils/mock';

// Exporter
const data = exportAllDataAsJSON();
console.log(data);

// Importer
importDataFromJSON(data);
```

---

## 🔐 Sécurité (Note importante)

⚠️ **En production, ne JAMAIS stocker les mots de passe en clair !**

Actuellement, pour la démonstration avec mocks :
- Les mots de passe sont stockés en clair dans localStorage
- C'est acceptable pour une démo, mais **PAS pour la production**

En production avec un vrai backend :
- Les mots de passe doivent être hashés (bcrypt, etc.)
- Ne jamais stocker les mots de passe en clair

---

## ✅ Résumé

| Fonctionnalité | Statut | Où ? |
|----------------|--------|------|
| Créer un compte | ✅ | Formulaire d'inscription |
| Sauvegarder utilisateurs | ✅ | localStorage `sadaka_users` |
| Sauvegarder dons | ✅ | localStorage `sadaka_donations` |
| Exporter JSON | ✅ | Page Admin → Données JSON |
| Importer JSON | ✅ | Page Admin → Données JSON |
| Persistance | ✅ | localStorage (entre sessions) |

---

**Tout est prêt pour la présentation ! 🎉**

