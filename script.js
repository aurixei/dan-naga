function hookAnchor(selector, id) {
  const a = document.querySelector(selector);
  if (!a) return;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });
}

hookAnchor('.nav-links a[href="#home"]',    '#home');
hookAnchor('.nav-links a[href="#about"]',   '#about');
hookAnchor('.nav-links a[href="#contact"]', '#contact');

document.getElementById('year').textContent = new Date().getFullYear();

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

//copy email
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copyEmailBtn");
  const email = "marianneadelinee@gmail.com";

  if (!btn) return;

  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(email).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = "Email", 1500);
    }).catch(err => {
      console.error("Clipboard error:", err);
    });
  });
});
