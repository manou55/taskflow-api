# Déploiement sur Railway

## 🚀 Deployment Guide

### 1. Créer un compte Railway
- Va sur https://railway.app
- Clique "Start Project"
- Connecte ton GitHub

### 2. Déployer TaskFlow API
```bash
# Railway détecte automatiquement le repo
# Configure les variables d'environnement:

NODE_ENV=production
PORT=3000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_NAME=taskflow
DB_USER=postgres
DB_PASSWORD=postgres
```

### 3. Déployer PostgreSQL
```bash
# Dans Railway:
# - Click "New Service"
# - Select "PostgreSQL"
# - Configure les variables
```

### 4. Obtenir l'URL publique
```
https://taskflow-api.railway.app
```

## 📊 Monitoring

- Dashboard: https://railway.app/dashboard
- Logs: Accessibles dans Railway console
- Métriques: CPU, Memory, Network

## 🔄 Auto-Deploy

Railway déploie automatiquement quand tu push sur main.

---

**Setup complet:** 5-10 minutes ⚡