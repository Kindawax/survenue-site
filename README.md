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
- `motion.css` : couche mouvement et conversion (CTA cuivre, offre Essentiel recommandée, bandeau test 49 €, apparitions au défilement, barre de progression, FAQ fluide). Tout est désactivé si le visiteur demande moins d’animations.
- `main.js` : menu mobile, CTA mobile contextuel, section active, progression de lecture, apparitions et inclinaison de la fiche d’accueil.
- `criteres.html`, `onboarding.css`, `onboarding.js` : demande de recherche sur une page, avec critères supplémentaires facultatifs.
- `cgv.html`, `mentions-legales.html`, `confidentialite.html` : informations contractuelles et légales.
- `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml` : assets et SEO technique.

Le bouton principal mène au parcours de demande. Au clic sur « Envoyer ma demande », `onboarding.js` transmet les réponses via FormSubmit (`https://formsubmit.co/ajax/contact.signal.tm@gmail.com`, sans compte ni clé) ; la demande arrive par email avec l’adresse du prospect en réponse directe. Un champ piège (`_honey`) filtre les robots. Si l’envoi échoue, l’ancien parcours prend le relais : email prérempli à ouvrir dans la messagerie, ou message à copier. Le tout premier envoi déclenche un email d’activation de FormSubmit à valider une fois.

Le site affiche le test à 49 €, l’offre Essentiel à 149 €/mois et Prospection prête à 299 €/mois. Le choix de l’offre est transmis comme paramètre autorisé à `criteres.html` ; le paiement est cadré séparément. Cette refonte ne modifie aucun Payment Link Stripe.

Les informations juridiques encore manquantes restent à compléter lorsque l’entreprise sera créée. Le parcours mailto ne permet pas de mesurer les demandes abandonnées ni de confirmer la réception du message ; un vrai formulaire nécessiterait un service de réception et une mise à jour des informations de confidentialité.
