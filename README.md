# SURVENUE — site public

Site statique HTML / CSS / JavaScript, hébergé sur Vercel via le dépôt GitHub `Kindawax/survenue-site`. Aucun build ni dépendance applicative. Le nom local `signal-site` est conservé comme chemin technique.

## Lancer en local

Depuis `C:\Users\TomMe\Downloads\files` :

```powershell
python -m http.server 5180 --directory signal-site
```

Ouvrir `http://localhost:5180/` dans un navigateur. Les pages légales et `criteres.html` sont servies directement.

## Structure

- `index.html` : accueil, extrait réel anonymisé, méthode, trois offres, FAQ et contact.
- `styles.css`, `home.css`, `copper.css` : base et identité crème / brun / cuivre.
- `clarity.css` : hiérarchie de l’accueil, formes graphiques, fiche et parcours de demande.
- `main.js` : menu mobile et CTA mobile contextuel.
- `criteres.html`, `onboarding.css`, `onboarding.js` : demande de recherche sur une page, avec critères supplémentaires facultatifs.
- `cgv.html`, `mentions-legales.html`, `confidentialite.html` : informations contractuelles et légales.
- `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml` : assets et SEO technique.

Le bouton principal mène au parcours de demande. Il prépare un email que le visiteur doit relire et envoyer lui-même ; aucune donnée n’est envoyée automatiquement au chargement ou à la validation du formulaire. Une copie du message reste possible si aucun logiciel de messagerie n’est configuré.

Le site affiche le test à 49 €, l’offre Essentiel à 149 €/mois et Prospection prête à 299 €/mois. Le choix de l’offre est transmis comme paramètre autorisé à `criteres.html` ; le paiement est cadré séparément. Cette refonte ne modifie aucun Payment Link Stripe.

Les informations juridiques encore manquantes restent à compléter lorsque l’entreprise sera créée. Le parcours mailto ne permet pas de mesurer les demandes abandonnées ni de confirmer la réception du message ; un vrai formulaire nécessiterait un service de réception et une mise à jour des informations de confidentialité.
