# ⚠️ Problème avec "Go Live" - Solution

## 🔴 Pourquoi "Go Live" ne fonctionne pas ?

**"Go Live"** est une extension VS Code qui sert des fichiers HTML statiques.  
**Mais** cette application utilise **Vite + React + TypeScript** qui nécessite :
- ✅ Un serveur de développement pour compiler le code
- ✅ Le traitement des modules ES6
- ✅ Le hot reload
- ✅ La compilation TypeScript en temps réel

**"Go Live" ne peut PAS compiler TypeScript/React** → C'est pourquoi rien ne s'affiche !

---

## ✅ Solution : Utiliser le serveur Vite

### Méthode 1 : Terminal (Recommandé)

```powershell
cd frontend-web
npm run dev
```

Le serveur démarre automatiquement sur **http://localhost:5173** (ou un autre port si 5173 est occupé).

### Méthode 2 : Via VS Code

1. **Ouvrir le terminal intégré** : `Ctrl + ù` (ou `View > Terminal`)
2. **Naviguer vers le dossier** :
   ```powershell
   cd frontend-web
   ```
3. **Lancer le serveur** :
   ```powershell
   npm run dev
   ```
4. **Ouvrir dans le navigateur** : L'URL s'affiche dans le terminal (ex: `http://localhost:5173`)

---

## 🚀 Démarrage rapide

### Étape 1 : Vérifier que Node.js est installé
```powershell
node --version
npm --version
```

### Étape 2 : Installer les dépendances (si pas déjà fait)
```powershell
cd frontend-web
npm install
```

### Étape 3 : Lancer le serveur
```powershell
npm run dev
```

### Étape 4 : Ouvrir dans le navigateur
Le terminal affichera :
```
  VITE v5.4.21  ready in 491 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Cliquez sur l'URL ou copiez-la dans votre navigateur.**

---

## 🔧 Configuration VS Code (Optionnel)

### Créer une tâche pour lancer automatiquement

Créez un fichier `.vscode/tasks.json` dans le dossier `frontend-web` :

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Lancer le serveur de développement",
      "type": "shell",
      "command": "npm run dev",
      "options": {
        "cwd": "${workspaceFolder}/frontend-web"
      },
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      },
      "runOptions": {
        "runOn": "default"
      }
    }
  ]
}
```

Ensuite, appuyez sur `Ctrl+Shift+P` → Tapez "Run Task" → Sélectionnez "Lancer le serveur de développement"

---

## 📋 Différence entre "Go Live" et Vite

| Aspect | Go Live | Vite (npm run dev) |
|--------|---------|-------------------|
| **Type** | Serveur statique | Serveur de développement |
| **Compilation** | ❌ Non | ✅ Oui (TypeScript → JavaScript) |
| **Hot Reload** | ❌ Non | ✅ Oui |
| **Modules ES6** | ❌ Limité | ✅ Oui |
| **React** | ❌ Non | ✅ Oui |
| **TypeScript** | ❌ Non | ✅ Oui |

---

## ⚠️ Erreurs courantes

### "Port 5173 is already in use"
**Solution :** Vite utilisera automatiquement un autre port (5174, 5175, etc.). Regardez dans le terminal pour voir le nouveau port.

### "Cannot find module"
**Solution :** 
```powershell
cd frontend-web
npm install
```

### "npm : commande introuvable"
**Solution :** Installez Node.js depuis https://nodejs.org/

---

## ✅ Checklist

- [ ] Node.js installé (`node --version`)
- [ ] npm installé (`npm --version`)
- [ ] Dépendances installées (`npm install` dans `frontend-web`)
- [ ] Serveur lancé (`npm run dev`)
- [ ] URL ouverte dans le navigateur (http://localhost:5173)

---

## 🎯 Résumé

**❌ Ne PAS utiliser "Go Live"** pour cette application React/Vite  
**✅ Utiliser `npm run dev`** dans le terminal

C'est la seule méthode qui fonctionne pour cette application !

---

**Besoin d'aide ?** Vérifiez le fichier `TROUBLESHOOTING.md` pour plus de détails.

