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
    const brief = [
      'ISKILLS AFRICA — ENQUIRY BRIEF',
      '',
      `Name & company: ${data.get('name')}`,
      `Work email: ${data.get('email')}`,
      `Support: ${data.get('support')}`,
      '',
      'Solution, target markets & priorities:',
      data.get('message'),
    ].join('\n');
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'iskills-africa-enquiry.txt';
    link.click();
    URL.revokeObjectURL(url);
    form.querySelector('.form-status').textContent = 'Your enquiry brief has been downloaded.';
  });
}
