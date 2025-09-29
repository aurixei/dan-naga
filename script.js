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
