# Guide de dépannage - Frontend Web SADAKA

## Problème : Le frontend web ne s'affiche pas

### Étapes de dépannage

#### 1. Vérifier que Node.js est installé
```powershell
node --version
npm --version
```
**Requis :** Node.js 18+ et npm 9+

#### 2. Installer les dépendances (si pas déjà fait)
```powershell
cd frontend-web
npm install
```

#### 3. Lancer le serveur de développement
```powershell
cd frontend-web
npm run dev
```

Le serveur devrait démarrer sur **http://localhost:5173**

#### 4. Vérifier les erreurs dans la console du navigateur
- Ouvrez les outils de développement (F12)
- Allez dans l'onglet "Console"
- Vérifiez s'il y a des erreurs JavaScript

#### 5. Vérifier les erreurs dans le terminal
- Regardez le terminal où vous avez lancé `npm run dev`
- Vérifiez s'il y a des erreurs de compilation TypeScript

#### 6. Vérifier que le port 5173 n'est pas déjà utilisé
```powershell
netstat -ano | findstr :5173
```
Si le port est utilisé, tuez le processus ou changez le port dans `vite.config.ts`

#### 7. Nettoyer le cache et réinstaller
```powershell
cd frontend-web
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

#### 8. Vérifier les fichiers critiques
- `index.html` existe et contient `<div id="root"></div>`
- `src/main.tsx` existe et importe correctement les fichiers
- `src/App.tsx` existe et définit les routes

#### 9. Vérifier les imports CSS
- `antd/dist/reset.css` doit être importé dans `main.tsx`
- `./styles/index.css` doit être importé dans `main.tsx`

#### 10. Vérifier la configuration Vite
- `vite.config.ts` doit être présent
- Le plugin React doit être configuré

### Problèmes courants et solutions

#### Erreur : "Cannot find module 'antd/dist/reset.css'"
**Solution :** Vérifiez que `antd` est installé :
```powershell
npm install antd
```

#### Erreur : "Port 5173 is already in use"
**Solution :** Changez le port dans `vite.config.ts` ou tuez le processus qui utilise le port

#### Erreur : "Root element not found"
**Solution :** Vérifiez que `index.html` contient `<div id="root"></div>`

#### Le navigateur affiche une page blanche
**Solutions :**
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez que tous les imports sont corrects
3. Vérifiez que les composants React sont correctement exportés

#### Le serveur ne démarre pas
**Solutions :**
1. Vérifiez que Node.js est installé
2. Vérifiez que les dépendances sont installées (`npm install`)
3. Vérifiez les erreurs dans le terminal

### Commandes utiles

```powershell
# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Vérifier les erreurs TypeScript
npx tsc --noEmit
```

### Support

Si le problème persiste après avoir suivi ces étapes :
1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs dans le terminal
3. Vérifiez que tous les fichiers sont présents et corrects
4. Contactez l'équipe de développement

