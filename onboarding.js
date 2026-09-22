(() => {
'use strict';
const form=document.getElementById('criteria-form');
if(!form)return;
form.hidden=false;
const steps=[...form.querySelectorAll('[data-step]')];
const back=document.getElementById('back'),next=document.getElementById('next'),error=document.getElementById('error'),ready=document.getElementById('ready');
let step=0;
const allowed=['Test','Essentiel','Prospection prête','À définir'];
const requested=new URLSearchParams(location.search).get('offre');
const offer=allowed.includes(requested)?requested:'À définir';
const sector=new URLSearchParams(location.search).get('metier');
const presets={commerces:{activity:'Je propose [votre offre] aux commerces de proximité / CHR.',events:['Reprise / changement de propriétaire','Création d’entreprise']},formation:{activity:'Je propose [votre offre] aux organismes de formation.',events:['Nouvelle déclaration d’activité de formation']}};
if(presets[sector]){document.getElementById('activity').value=presets[sector].activity;form.querySelectorAll('input[name="events"]').forEach(input=>input.checked=presets[sector].events.includes(input.value));document.getElementById('preset-note').hidden=false;}
if(offer==='Test')document.getElementById('frequency').value='Un premier test ponctuel';
if(offer==='Essentiel'||offer==='Prospection prête')document.getElementById('frequency').value='Chaque semaine';
const value=id=>document.getElementById(id).value.trim();
const values=name=>[...form.querySelectorAll('input[name="'+name+'"]:checked')].map(el=>el.value).join(', ')||'À définir ensemble';
function criteria(){return 'Offre envisagée : '+offer+'\nActivité et cibles : '+value('activity')+'\nZone : '+value('geography')+'\nExclusions : '+(value('exclusions')||'Non précisées')+'\nÉvénements : '+values('events')+'\nInformations indispensables : '+values('contacts')+'\nRythme : '+value('frequency')+'\nPrécisions : '+(value('details')||'Aucune');}
function show(index){step=index;steps.forEach((s,i)=>s.hidden=i!==step);back.hidden=step===0;next.hidden=step===2;document.getElementById('progress').textContent='Étape '+(step+1)+' sur 3 · '+['Votre cible','Vos informations utiles','Votre récapitulatif'][step];error.textContent='';document.getElementById('review').textContent=criteria();steps[step].querySelector('h2').focus();}
function valid(){if(step===0&&value('activity').includes('[votre offre]')){error.textContent='Précisez votre offre à la place du texte entre crochets.';document.getElementById('activity').focus();return false;}for(const field of steps[step].querySelectorAll('input,textarea,select')){if(field.required&&!field.value.trim()){error.textContent='Merci de remplir les champs obligatoires.';field.focus();return false;}if(!field.checkValidity()){error.textContent='Vérifiez le champ indiqué, notamment le format de votre email.';field.reportValidity();return false;}}return true;}
next.addEventListener('click',()=>{if(valid())show(step+1);});back.addEventListener('click',()=>show(step-1));
form.addEventListener('submit',event=>{event.preventDefault();if(step<2){if(valid())show(step+1);return;}if(!valid())return;
const message='Bonjour,\n\nJe souhaite définir une recherche avec SURVENUE.\n\n'+criteria()+'\n\nNom : '+value('name')+'\nEntreprise : '+value('company')+'\nEmail : '+value('email')+'\n\nPouvez-vous me confirmer la faisabilité et le périmètre proposé avant tout paiement ?\n\nBonne journée,\n'+value('name');
document.getElementById('message').value=message;document.getElementById('email-link').href='mailto:contact.signal.tm@gmail.com?subject='+encodeURIComponent('SURVENUE — mes critères de prospection')+'&body='+encodeURIComponent(message);form.hidden=true;ready.hidden=false;document.getElementById('copy-status').textContent='';ready.querySelector('h2').focus();});
document.getElementById('edit').addEventListener('click',()=>{ready.hidden=true;form.hidden=false;show(2);});
document.getElementById('copy').addEventListener('click',async()=>{const message=document.getElementById('message');try{await navigator.clipboard.writeText(message.value);document.getElementById('copy-status').textContent='Message copié. Collez-le dans votre messagerie puis envoyez-le.';}catch{message.focus();message.select();document.getElementById('copy-status').textContent='Copie automatique indisponible. Le texte est sélectionné : copiez-le depuis votre appareil.';}});
})();
