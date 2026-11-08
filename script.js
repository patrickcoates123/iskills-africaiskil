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
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nameAndCompany = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const support = String(data.get('support') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `ISkills Africa enquiry from ${nameAndCompany}`;
    const body = [
      `Name & company: ${nameAndCompany}`,
      `Work email: ${email}`,
      `Support: ${support}`,
      '',
      'Solution, target markets & priorities:',
      message,
    ].join('\n');

    const mailto = `mailto:patrick.coates@iskillsuk.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('.form-status').textContent = 'Opening your email client…';
    window.location.href = mailto;
  });
}
