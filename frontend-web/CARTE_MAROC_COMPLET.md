# 🗺️ Configuration de la Carte - Maroc Complet

## ✅ Modifications effectuées

La carte a été configurée pour afficher **le Maroc complet**, y compris le Sahara marocain.

---

## 📍 Limites géographiques

### Coordonnées des limites (Maroc complet) :
- **Nord** : ~35.8°N (Tanger)
- **Sud** : ~23.0°N (Dakhla - limite sud du Maroc)
- **Ouest** : ~17.0°W (côte atlantique)
- **Est** : ~1.1°W (frontière avec l'Algérie)

### Centre de la carte :
- **Latitude** : 28.5°N
- **Longitude** : -8.0°W
- **Zoom initial** : 6

---

## 🗺️ Provider de tuiles de carte

### ESRI World Street Map (activé)
- **URL** : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}`
- **Avantage** : Affiche généralement le Maroc complet sans découpage
- **Alternative** : OpenStreetMap peut parfois afficher le territoire découpé selon les données

### Pourquoi ESRI au lieu d'OpenStreetMap ?
OpenStreetMap peut afficher le Maroc découpé (avec le Sahara séparé) selon les données géopolitiques. ESRI World Street Map affiche généralement le territoire complet.

---

## 🏛️ Communes incluses

Toutes les communes marocaines sont incluses, y compris :

### Région Laâyoune-Sakia El Hamra
- ✅ Laâyoune
- ✅ Boujdour
- ✅ Es-Semara
- ✅ Tarfaya

### Région Dakhla-Oued Ed-Dahab
- ✅ Dakhla
- ✅ Aousserd

---

## 🔒 Restrictions appliquées

### 1. Limites maximales (maxBounds)
La carte est limitée au territoire marocain complet :
```typescript
const moroccoBounds = L.latLngBounds(
  [23.0, -17.0], // Sud-Ouest (Dakhla)
  [35.8, -1.1]   // Nord-Est (Tanger - frontière Est)
);
```

### 2. Viscosité des limites
- `maxBoundsViscosity: 1.0` → Empêche de sortir des limites du Maroc
- La carte rebondit si on essaie de naviguer en dehors

### 3. Zoom limité
- **Zoom minimum** : 5 (vue d'ensemble du Maroc complet)
- **Zoom maximum** : 18 (détails locaux)

---

## 📊 Fichiers modifiés

### 1. `src/components/MapView.tsx`
- ✅ Limites ajustées pour inclure tout le territoire marocain
- ✅ Centre repositionné pour montrer le Maroc complet
- ✅ Provider de tuiles changé vers ESRI World Street Map
- ✅ Toutes les communes du Sahara marocain incluses

### 2. `src/data/moroccanCommunes.ts`
- ✅ Toutes les communes restaurées (y compris Laâyoune, Dakhla, etc.)

---

## 🎯 Comportement de la carte

### Vue par défaut (sans annonces)
- Centre : 28.5°N, -8.0°W
- Zoom : 6
- Affiche le Maroc complet (y compris le Sahara marocain)

### Avec des annonces
- La carte s'ajuste automatiquement pour montrer toutes les annonces
- Reste limitée aux frontières du Maroc complet
- Toutes les annonces marocaines (y compris Sahara) sont affichées

### Navigation
- Impossible de naviguer en dehors du territoire marocain
- La carte rebondit si on essaie de sortir des limites
- Zoom limité entre 5 et 18

---

## ✅ Résultat

La carte affiche maintenant **le Maroc complet**, avec :
- ✅ Toutes les communes marocaines (y compris Sahara)
- ✅ Limites couvrant tout le territoire marocain
- ✅ Provider ESRI qui affiche généralement le territoire complet
- ✅ Vue centrée sur le Maroc complet

---

**La carte affiche maintenant le Maroc complet, y compris le Sahara marocain ! 🎉**

