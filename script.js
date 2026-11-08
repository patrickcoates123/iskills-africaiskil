const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll('#main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('is-open');
  });
});

const form = document.querySelector('#enquiry-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Sending your enquiry…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();

      if (!response.ok || result.success !== 'true') {
        throw new Error('Submission failed');
      }

      form.reset();
      status.textContent = 'Thank you. Your enquiry has been sent.';
    } catch (error) {
      status.textContent = 'The enquiry could not be sent. Please try again.';
    } finally {
      submitButton.disabled = false;
    }
  });
}
