document.querySelector('.menu-button')?.addEventListener('click', () => document.querySelector('.site-header').classList.toggle('menu-open'));
document.querySelectorAll('form[data-message]').forEach(form => form.addEventListener('submit', event => { event.preventDefault(); alert(form.dataset.message); }));
const VOTE_KEY = 'perceiveYourVoteCompleted';

function lockVotingPage() {
  const ballot = document.querySelector('.ballot');
  const success = document.querySelector('[data-vote-success]');
  if (!ballot || !success) return;
  ballot.hidden = true;
  success.hidden = false;
  success.classList.add('show');
  const selectedName = localStorage.getItem('perceiveYourVoteCandidate');
  const nameBox = document.querySelector('[data-selected-candidate]');
  if (nameBox && selectedName) nameBox.textContent = selectedName;
  document.querySelectorAll('a[href="vote.html"]').forEach(a => a.remove());
}

if (localStorage.getItem(VOTE_KEY) === 'true') {
  lockVotingPage();
}

document.querySelector('[data-vote]')?.addEventListener('click', () => {
  if (localStorage.getItem(VOTE_KEY) === 'true') { lockVotingPage(); return; }
  const selected = document.querySelector('input[name="mayor"]:checked');
  const ballot = document.querySelector('.ballot');
  const success = document.querySelector('[data-vote-success]');
  const selectedName = document.querySelector('[data-selected-candidate]');
  if (!selected) {
    document.querySelector('.contest-help')?.classList.add('validation-message');
    return;
  }
  const candidateName = selected.closest('.candidate').querySelector('b').textContent;
  localStorage.setItem(VOTE_KEY, 'true');
  localStorage.setItem('perceiveYourVoteCandidate', candidateName);
  if (selectedName) selectedName.textContent = candidateName;
  ballot.hidden = true;
  success.hidden = false;
  success.classList.add('show');
  window.scrollTo({ top: success.offsetTop - 30, behavior: 'smooth' });
});
