# TaskFlow API 💼

Une plateforme SaaS de gestion de tâches collaboratives avec système de paiement intégré.

## 🎯 Vision
TaskFlow est une solution complète pour les équipes qui ont besoin de gérer, organiser et collaborer sur des tâches en temps réel. Modèle de revenus : abonnement SaaS avec plans Free, Pro et Enterprise.

## 🚀 Fonctionnalités Principales

### Core Features
- ✅ Authentification JWT sécurisée
- ✅ Gestion complète des tâches (CRUD)
- ✅ Collaboration en temps réel (WebSocket)
- ✅ Partage et permissions par équipe
- ✅ Système de notification

### Monétisation
- ✅ Intégration Stripe pour paiements
- ✅ Plans tarifaires (Free/Pro/Enterprise)
- ✅ Factures et historique de paiement
- ✅ Gestion des abonnements

## 📋 Plans Tarifaires

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Tâches illimitées | ✅ | ✅ | ✅ |
| Utilisateurs | 1 | 10 | Illimité |
| Équipes | 1 | Illimitées | Illimitées |
| Support | Email | Email+Chat | Dédié |
| Prix | Gratuit | $9/mois | Devis |

## 🛠️ Stack Technologique

- **Backend**: Node.js + Express.js
- **Base de données**: PostgreSQL
- **Authentification**: JWT
- **Paiements**: Stripe
- **Real-time**: Socket.io
- **Deployment**: Docker

## 📁 Structure du Projet

```
taskflow-api/
├── src/
│   ├── models/          # Schémas de base de données
│   ├── controllers/      # Logique métier
│   ├── routes/          # Routes API
│   ├── middleware/       # Middlewares (auth, validation)
│   ├── services/        # Services métier
│   ├── utils/           # Utilitaires
│   └── index.js         # Point d'entrée
├── config/              # Configuration (DB, Stripe)
├── migrations/          # Migrations BDD
├── tests/               # Tests unitaires et intégration
├── .env.example         # Variables d'environnement
├── docker-compose.yml   # Docker setup
└── package.json         # Dépendances
```

## 🚀 Démarrage Rapide

```bash
# Installation
npm install

# Setup de la base de données
npm run migrate

# Lancer le serveur de développement
npm run dev

# Tests
npm test
```

## 📚 Documentation API

Voir [API.md](./API.md) pour la documentation complète des endpoints.

## 💳 Configuration Stripe

1. Créer un compte Stripe
2. Configurer les clés API dans `.env`
3. Setup des webhooks Stripe

Voir [STRIPE_SETUP.md](./STRIPE_SETUP.md) pour les détails.

## 📊 Roadmap

- [ ] MVP: Core features + authentification
- [ ] Payments: Intégration Stripe
- [ ] Real-time: WebSocket collaboration
- [ ] Mobile: App mobile native
- [ ] Analytics: Dashboard d'utilisation
- [ ] Intégrations: Slack, Microsoft Teams, Google Calendar

## 📄 Licence

MIT

---

**Prêt à démarrer? Consultez le [GETTING_STARTED.md](./GETTING_STARTED.md)**