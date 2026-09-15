const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

function skopjeTimeParts() {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Skopje',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  const parts = Object.fromEntries(formatter.formatToParts(new Date()).map(({ type, value }) => [type, value]));
  return {
    dayIndex: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(parts.weekday),
    minute: Number(parts.hour) * 60 + Number(parts.minute)
  };
}

function isOpenNow() {
  const { dayIndex, minute } = skopjeTimeParts();
  const close = dayIndex === 5 || dayIndex === 6 ? 25 * 60 : 24 * 60;
  if (minute >= 8 * 60 && minute < close) return true;
  if (minute < 60) {
    const previousDay = (dayIndex + 6) % 7;
    return previousDay === 5 || previousDay === 6;
  }
  return false;
}

const statusText = document.querySelector('#open-status');
const statusDot = document.querySelector('.status-dot');
if (statusText && statusDot) {
  const open = isOpenNow();
  statusText.textContent = open ? 'Отворено сега' : 'Моментално затворено';
  statusDot.classList.toggle('closed', !open);
}

document.querySelector('#year').textContent = new Date().getFullYear();
