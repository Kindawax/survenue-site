# Survenue — site (ex-Signal)

Landing page statique de la marque SURVENUE (HTML / CSS / JS vanilla, aucune dépendance). Le dossier et le serveur de dev gardent le nom technique `signal-site`.

## Lancer en local

```bash
python -m http.server 5180 --directory signal-site
```

Puis ouvrir http://localhost:5180 (depuis `C:\Users\TomMe\Downloads\files`). Un serveur `signal-site` est aussi déclaré dans `.claude/launch.json`.

## Déployer

Copier le dossier tel quel sur n'importe quel hébergeur statique (Netlify, Vercel, OVH, GitHub Pages…). Pas de build.

## Fichiers

- `index.html` — landing page (hero, exemple réel, problème, méthode, fiche, pour qui, signaux, tarifs, FAQ, CTA, footer)
- `styles.css` — design system (palette, typo Inter, composants, responsive)
- `main.js` — nav mobile, bordure sticky, apparition au scroll (avec filet de sécurité)
- `mentions-legales.html`, `confidentialite.html` — pages légales (champs « à compléter » signalés)
- `favicon.svg`

## À compléter avant mise en ligne

- Mentions légales : adresse, SIREN, hébergeur.
- Domaine + `og:image` (aucune image Open Graph pour l'instant).
- Le lien de paiement Stripe est `https://buy.stripe.com/cNi8wO5a39Pne6p6eC5AQ00` (5 CTA : nav desktop, menu mobile, hero, pricing, CTA final).

## Parcours de cadrage — septembre 2026

`criteres.html`, `onboarding.css`, `onboarding.js` : trois étapes (cible, informations utiles, coordonnées et récapitulatif). Les CTA de cadrage pointent vers cette page ; le paramètre `offre` ne contient qu'un nom d'offre autorisé. Aucun renseignement personnel n'est placé dans l'URL du site.

Le parcours prépare un email, il ne soumet rien à un serveur. Le visiteur ouvre sa messagerie et envoie lui-même le message. Une option de copie est disponible si aucun logiciel email n'est configuré. Aucun cookie, stockage local, analytics ni prestataire de formulaire ajouté. Sans JavaScript, le contact email reste visible. Les prix, Stripe, DNS et hébergement ne changent pas.

Limite : pas de confirmation de réception ni de mesure des demandes abandonnées. Un formulaire hébergé pourra remplacer cette sortie après choix du prestataire et adaptation des informations de confidentialité.
