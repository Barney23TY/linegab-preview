# LineGab Preview — Déploiement Vercel

Ce projet génère des pages de prévisualisation pour les annonces LineGab.
WhatsApp, Telegram, iMessage liront l'image et le titre automatiquement.

---

## 🚀 Déploiement (15 minutes)

### Étape 1 — Créer le compte Vercel
1. Va sur https://vercel.com
2. Clique "Sign Up" → connecte avec GitHub
3. C'est gratuit (plan Hobby)

### Étape 2 — Mettre le projet sur GitHub
1. Crée un repo GitHub : `linegab-preview`
2. Pousse ce dossier dedans :
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/TON_USERNAME/linegab-preview.git
git push -u origin main
```

### Étape 3 — Importer sur Vercel
1. Sur Vercel → "New Project"
2. Sélectionne le repo `linegab-preview`
3. Clique "Deploy" (Vercel détecte Next.js automatiquement)

### Étape 4 — Variables d'environnement Firebase

Dans Vercel → ton projet → Settings → Environment Variables, ajoute :

| Nom | Valeur |
|-----|--------|
| `FIREBASE_PROJECT_ID` | `linegab5` |
| `FIREBASE_CLIENT_EMAIL` | (voir ci-dessous) |
| `FIREBASE_PRIVATE_KEY` | (voir ci-dessous) |

#### Comment obtenir les clés Firebase Admin :
1. Va sur https://console.firebase.google.com
2. Ton projet → ⚙️ Paramètres → Comptes de service
3. Clique "Générer une nouvelle clé privée"
4. Ouvre le fichier JSON téléchargé
5. Copie `client_email` → colle dans `FIREBASE_CLIENT_EMAIL`
6. Copie `private_key` (tout le contenu avec \n) → colle dans `FIREBASE_PRIVATE_KEY`

### Étape 5 — Redéployer après les variables
Dans Vercel → Deployments → clique les 3 points → Redeploy

---

## ✅ Test

Après déploiement, ton URL sera :
```
https://linegab-preview.vercel.app/article/ID_DE_LANNONCE
```

Pour tester WhatsApp :
1. Copie l'URL avec un vrai ID d'annonce Firestore
2. Colle dans WhatsApp → tu verras l'image s'afficher

---

## 📱 Intégration Flutter

Dans ton code de partage Flutter, utilise ce lien :

```dart
void partagerArticle(String articleId, String titre, int prix) {
  final lien = 'https://linegab-preview.vercel.app/article/$articleId';
  
  Share.share(
    '🛒 $titre\n💰 ${prix.toLocaleString()} FCFA\n\n$lien',
    subject: titre,
  );
}
```

Package à ajouter dans pubspec.yaml :
```yaml
dependencies:
  share_plus: ^7.0.0
```

---

## 📂 Structure du projet

```
linegab-preview/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Redirige vers linegab5.web.app
│   └── article/
│       └── [id].js      # Page principale avec OG tags
├── lib/
│   └── firebase.js      # Connection Firestore Admin
├── styles/
│   └── globals.css
├── next.config.js
└── package.json
```
