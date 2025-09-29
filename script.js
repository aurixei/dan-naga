// Keep HOME / ABOUT ME / CONTACT links smooth and precise
function hookAnchor(selector, id) {
  const a = document.querySelector(selector);
  if (!a) return;
  a.addEventListener('click', (e) => {
    // let native hash change work too, but smooth scroll first
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });
}

// Attach
hookAnchor('.nav-links a[href="#home"]',    '#home');
hookAnchor('.nav-links a[href="#about"]',   '#about');
hookAnchor('.nav-links a[href="#contact"]', '#contact');

// (Already handled by HTML target) Posts goes to GitHub in new tab.
// Brand already links to GitHub via <a href>.
// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll-spy to highlight current section link
const sections = ['#home', '#skills', '#projects', '#about', '#contact']
  .map(s => document.querySelector(s))
  .filter(Boolean);

const linkMap = new Map(
  Array.from(document.querySelectorAll('.nav-links a'))
    .filter(a => a.hash)
    .map(a => [a.hash, a])
);

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const hash = `#${entry.target.id}`;
    const link = linkMap.get(hash);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => obs.observe(sec));
