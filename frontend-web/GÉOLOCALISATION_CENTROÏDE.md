# 🗺️ Géolocalisation par Centroïde de Commune

## ✅ Implémentation complète

### 📍 Principe

La géolocalisation utilise le **centroïde** (centre géographique) de chaque commune marocaine. Quand un utilisateur sélectionne une commune, les coordonnées GPS sont automatiquement récupérées depuis le centroïde de cette commune.

---

## 📊 Structure des données

### Fichier : `src/data/moroccanCommunes.ts`

```typescript
export interface Commune {
  label: string;           // Nom de la commune
  value: string;           // Code de la commune
  centroid: [number, number]; // [latitude, longitude]
  region?: string;         // Région d'appartenance
}
```

### Exemple de données

```typescript
{ 
  label: 'Casablanca', 
  value: 'CASABLANCA', 
  centroid: [33.5731, -7.5898],  // Latitude, Longitude
  region: 'Casablanca-Settat' 
}
```

**88 communes** avec leurs centroïdes sont disponibles.

---

## 🔧 Fonctionnement

### 1. Sélection manuelle de la commune

**Fichier** : `src/pages/CreateAnnouncement.tsx`

```typescript
const onCommuneChange = (val: string) => {
  const c = moroccanCommunes.find((x) => x.value === val);
  if (c) {
    // Récupération automatique du centroïde
    form.setFieldsValue({ 
      latitude: c.centroid[0],   // Latitude du centroïde
      longitude: c.centroid[1]   // Longitude du centroïde
    });
  }
};
```

**Comportement :**
1. L'utilisateur sélectionne une commune dans la liste déroulante
2. Le système trouve la commune correspondante
3. Les coordonnées (latitude/longitude) sont automatiquement remplies avec le centroïde
4. L'utilisateur n'a pas besoin de saisir manuellement les coordonnées

---

### 2. Géolocalisation GPS (optionnelle)

**Fonction** : `getCurrentLocation()`

```typescript
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  
  // Trouver la commune la plus proche
  let closestCommune = moroccanCommunes[0];
  let minDistance = Number.MAX_VALUE;
  
  moroccanCommunes.forEach(commune => {
    const distance = Math.sqrt(
      Math.pow(commune.centroid[0] - latitude, 2) + 
      Math.pow(commune.centroid[1] - longitude, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestCommune = commune;
    }
  });
  
  // Utiliser le centroïde de la commune la plus proche
  form.setFieldsValue({ 
    commune: closestCommune.value,
    latitude: closestCommune.centroid[0],
    longitude: closestCommune.centroid[1]
  });
});
```

**Comportement :**
1. L'utilisateur clique sur le bouton GPS (icône cible)
2. Le navigateur demande la permission de géolocalisation
3. Le système obtient la position GPS de l'utilisateur
4. Le système trouve la commune la plus proche (par distance au centroïde)
5. Les champs sont remplis automatiquement avec :
   - La commune trouvée
   - Le centroïde de cette commune (pas la position GPS exacte)

---

## 🎯 Pourquoi utiliser le centroïde ?

### Avantages :
1. **Standardisation** : Tous les dons d'une même commune ont les mêmes coordonnées
2. **Préservation de la vie privée** : Pas de coordonnées GPS exactes
3. **Simplicité** : L'utilisateur n'a pas besoin de connaître les coordonnées GPS
4. **Cohérence** : Les dons sont regroupés par commune sur la carte

### Sur la carte :
- Tous les dons d'une même commune apparaissent au même endroit (centroïde)
- Facilite la visualisation par commune
- Les marqueurs peuvent être regroupés (clustering) si plusieurs dons dans la même commune

---

## 📍 Utilisation dans le formulaire

### Champs du formulaire :

1. **Commune** (Liste déroulante) **Obligatoire**
   - Sélection parmi 88 communes
   - Organisées par région
   - Recherche possible

2. **Latitude** (Automatique)
   - Remplie automatiquement avec `centroid[0]`
   - Modifiable manuellement si nécessaire

3. **Longitude** (Automatique)
   - Remplie automatiquement avec `centroid[1]`
   - Modifiable manuellement si nécessaire

4. **Bouton GPS** (Optionnel)
   - Trouve la commune la plus proche
   - Utilise le centroïde de cette commune

---

## 🗺️ Affichage sur la carte

### Fichier : `src/components/MapView.tsx`

Les annonces sont affichées sur la carte avec leurs coordonnées (centroïdes) :

```typescript
<Marker
  position={[announcement.latitude!, announcement.longitude!]}
  icon={icon}
>
  <Popup>
    {/* Détails de l'annonce */}
  </Popup>
</Marker>
```

**Résultat :**
- Chaque annonce apparaît au centroïde de sa commune
- Les marqueurs sont visibles sur la carte
- Les popups affichent les détails complets

---

## 📊 Données stockées

### Structure d'une annonce :

```typescript
{
  id: '1',
  title: 'Don de vêtements...',
  category: 'CLOTHES',
  commune: 'CASABLANCA',        // Code de la commune
  latitude: 33.5731,            // Latitude du centroïde
  longitude: -7.5898,           // Longitude du centroïde
  // ... autres champs
}
```

### Stockage :
- ✅ `commune` : Code de la commune (ex: 'CASABLANCA')
- ✅ `latitude` : Latitude du centroïde (ex: 33.5731)
- ✅ `longitude` : Longitude du centroïde (ex: -7.5898)

---

## ✅ Conformité au cahier des charges

### Exigence :
> "Localisation (récupération automatique du centroïde de la commune)"

### Implémentation :
- ✅ Sélection d'une commune → Récupération automatique du centroïde
- ✅ Option GPS → Trouve la commune la plus proche et utilise son centroïde
- ✅ 88 communes avec centroïdes disponibles
- ✅ Coordonnées automatiquement remplies dans le formulaire

---

## 🎯 Résumé

| Aspect | Implémentation |
|--------|----------------|
| **Centroïdes disponibles** | ✅ 88 communes |
| **Récupération automatique** | ✅ Oui (sélection commune) |
| **Option GPS** | ✅ Oui (trouve commune proche) |
| **Stockage** | ✅ Commune + Latitude + Longitude |
| **Affichage carte** | ✅ Marqueurs aux centroïdes |

---

**La géolocalisation par centroïde est complètement implémentée et fonctionnelle ! 🎉**

