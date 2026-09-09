# Atelier Malak

Site pour architecte permettant de publier des mises à jour de chantier (photos,
texte, ajustements) accessibles via un lien public — pour le client et les
artisans — ainsi qu'un portfolio public de tous les projets.

## Démarrage

```bash
npm install
npm run dev
```

Puis ouvrez http://localhost:5173

## Espace architecte

Aller sur "Espace architecte" dans le menu. Code d'accès : `0000`
(à changer dans `src/data/auth.jsx`).

## Coordonnées (pied de page)

Les coordonnées affichées dans le pied de page (email, téléphone, WhatsApp,
Instagram, LinkedIn) sont des exemples — à remplacer par les vraies dans
`src/data/contact.js`.

## Catégories de projets

Chaque projet a une catégorie (Résidentiel, Commercial, etc.) utilisée pour les
filtres sur la page d'accueil. La liste modifiable se trouve dans
`src/data/constants.js`.

## Important — limites de cette version

- **Pas de backend** : toutes les données (projets, mises à jour, photos) sont
  stockées dans le `localStorage` du navigateur. Elles ne sont visibles que sur
  l'appareil/navigateur où elles ont été créées, et un lien `/projets/xxx` ne
  s'affichera correctement pour un client que si le site est déployé en ligne
  (voir ci-dessous) — pas en local.
- **Le code d'accès admin n'est pas une vraie sécurité** (visible dans le code
  source). Pour une utilisation réelle avec des clients, il faudra un vrai
  backend (base de données + authentification), par exemple avec Supabase,
  Firebase, ou une API dédiée.
- Les photos sont stockées en base64 dans le navigateur : évitez les très
  grosses images (compressez-les avant import).

## Déploiement rapide

Ce projet se déploie facilement sur Vercel ou Netlify (glisser-déposer le
dossier après `npm run build`, ou connecter le dépôt Git). Une fois en ligne,
partagez le lien `https://votre-site.com/projets/<id>` au client et aux
artisans.
