# SURVENUE — site public

Site statique HTML / CSS / JavaScript, hébergé sur Vercel via `Kindawax/survenue-site`. Aucun build ni dépendance applicative.

## Aperçu local

Depuis ce dossier :

```sh
python3 -m http.server 5180 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:5180/.

## Structure

- `index.html` : accueil, exemple, méthode, trois offres, FAQ et contact.
- `identity-3.css` : feuille de styles commune de la refonte.
- `assets/logo-*.svg`, `assets/monogram.svg` : tracés extraits des PDF de la graphiste.
- `assets/fonts/` : Familjen Grotesk Medium pour les titres, Montserrat pour le texte et leurs licences.
- `main.js` : navigation mobile, progression, liens actifs et apparitions.
- `criteres.html`, `onboarding.js` : formulaire de demande.
- `prospection-commerces.html` : présentation sectorielle.
- `cgv.html`, `mentions-legales.html`, `confidentialite.html` : documents légaux existants.
- `favicon.svg`, `og-image.jpg`, `robots.txt`, `sitemap.xml` : assets et SEO.

Le formulaire conserve FormSubmit (`https://formsubmit.co/ajax/contact.signal.tm@gmail.com`) et son repli par email prérempli / copie. Le test à 49 €, Essentiel à 149 €/mois et Prospection prête à 299 €/mois sont inchangés. Le paiement reste séparé après confirmation du périmètre. Aucun Payment Link Stripe n’a été modifié.

Les anciens fichiers CSS sont conservés comme référence historique, sans être chargés. La vidéo de présentation a été retirée. Voir DESIGN.md pour la direction visuelle et REFONTE.md pour les vérifications.
