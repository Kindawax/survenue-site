(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const form = document.getElementById('criteria-form');
  if (!form) return;
  form.hidden = false;
  const ready = document.getElementById('ready');
  const error = document.getElementById('error');
  const params = new URLSearchParams(location.search);
  const allowedOffers = ['Test', 'Essentiel', 'Prospection prête', 'À définir'];
  const requestedOffer = params.get('offre');
  const offer = allowedOffers.includes(requestedOffer) ? requestedOffer : 'À définir';
  const presets = {
    commerces: { activity: 'Je propose [votre offre] aux commerces de proximité / CHR.', events: ['Reprise / changement de propriétaire', 'Création d’entreprise'] },
    formation: { activity: 'Je propose [votre offre] aux organismes de formation.', events: ['Nouvelle déclaration d’activité de formation'] }
  };
  const preset = presets[params.get('metier')];
  if (preset) {
    document.getElementById('activity').value = preset.activity;
    form.querySelectorAll('input[name="events"]').forEach(input => { input.checked = preset.events.includes(input.value); });
    document.getElementById('preset-note').hidden = false;
    form.querySelector('.more-criteria').open = true;
  }
  if (offer === 'Test') document.getElementById('frequency').value = 'Un premier test ponctuel';
  if (offer === 'Essentiel' || offer === 'Prospection prête') document.getElementById('frequency').value = 'Chaque semaine';

  const value = id => document.getElementById(id).value.trim();
  const choices = name => [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value).join(', ') || 'À définir ensemble';
  const criteria = () => [
    `Offre envisagée : ${offer}`,
    `Activité et cibles : ${value('activity')}`,
    `Zone : ${value('geography')}`,
    `Exclusions : ${value('exclusions') || 'Non précisées'}`,
    `Événements : ${choices('events')}`,
    `Informations utiles : ${choices('contacts')}`,
    `Rythme : ${value('frequency')}`,
    `Précisions : ${value('details') || 'Aucune'}`
  ].join('\n');

  form.addEventListener('submit', event => {
    event.preventDefault();
    error.textContent = '';
    if (value('activity').includes('[votre offre]')) {
      error.textContent = 'Remplacez [votre offre] par ce que vous proposez.';
      document.getElementById('activity').focus();
      return;
    }
    for (const field of form.querySelectorAll('[required]')) {
      if (!field.value.trim() || !field.checkValidity()) {
        error.textContent = field.type === 'email' ? 'Vérifiez votre adresse email.' : 'Complétez les champs marqués d’un astérisque.';
        field.focus();
        if (field.type === 'email') field.reportValidity();
        return;
      }
    }
    const message = `Bonjour,\n\nJe souhaite voir ce que SURVENUE peut trouver pour ma prospection.\n\n${criteria()}\n\nNom : ${value('name')}\nEntreprise : ${value('company') || 'Non précisée'}\nEmail : ${value('email')}\n\nPouvez-vous me confirmer ce qui est faisable et le périmètre avant tout paiement ?\n\nBonne journée,\n${value('name')}`;
    document.getElementById('message').value = message;
    document.getElementById('email-link').href = 'mailto:contact.signal.tm@gmail.com?subject=' + encodeURIComponent('SURVENUE — ma recherche de prospects') + '&body=' + encodeURIComponent(message);
    form.hidden = true;
    ready.hidden = false;
    document.getElementById('copy-status').textContent = '';
    ready.querySelector('h2').focus();
  });
  document.getElementById('edit').addEventListener('click', () => {
    ready.hidden = true;
    form.hidden = false;
    document.getElementById('activity').focus();
  });
  document.getElementById('copy').addEventListener('click', async () => {
    const message = document.getElementById('message');
    try {
      await navigator.clipboard.writeText(message.value);
      document.getElementById('copy-status').textContent = 'Message copié. Collez-le dans votre messagerie puis envoyez-le.';
    } catch {
      message.focus();
      message.select();
      document.getElementById('copy-status').textContent = 'Copie automatique indisponible. Le texte est sélectionné : copiez-le depuis votre appareil.';
    }
  });
})();
