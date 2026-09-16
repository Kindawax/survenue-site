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
