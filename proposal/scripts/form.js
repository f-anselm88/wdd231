// form.js — handles the community page contact/suggestion form

const form = document.querySelector('#contact-form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const entry = {
    name: formData.get('name'),
    email: formData.get('email'),
    topic: formData.get('topic'),
    message: formData.get('message'),
    submittedAt: new Date().toLocaleString(),
  };

  localStorage.setItem('latest-submission', JSON.stringify(entry));
  window.location.href = 'form-action.html';
});
