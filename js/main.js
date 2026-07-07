// ==========================================================================
// Rookie Report — main.js (OPTIMIZED)
// ==========================================================================

/* ---------- Dark mode ---------- */
(function initTheme(){
  const saved = localStorage.getItem('rr-theme');
  // Dark is the site's primary look; only stay light if the user explicitly chose it before.
  if (saved !== 'light') {
    document.documentElement.classList.add('dark');
  }
})();

function categoryClass(categorySlug){
  const map = {
    'nba':'cat-nba', 'wnba':'cat-wnba', 'soccer':'cat-soccer',
    'trade-analysis':'cat-trade', 'free-agency':'cat-fa',
    'player-rankings':'cat-rank', 'power-rankings':'cat-rank',
    'opinion':'cat-opinion'
  };
  return map[categorySlug] || 'cat-nba';
}

function toggleTheme(){
  const root = document.documentElement;
  root.classList.toggle('dark');
  localStorage.setItem('rr-theme', root.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon(){
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{
    const isDark = document.documentElement.classList.contains('dark');
    btn.innerHTML = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z"/></svg>';
  });
}

/* ---------- Mobile nav ---------- */
function toggleNav(){
  document.querySelector('.nav-links')?.classList.toggle('open');
}

/* ---------- Search (with debouncing) ---------- */
let RR_ARTICLES = [];
let searchTimeout;

async function loadArticles(){
  if (RR_ARTICLES.length) return RR_ARTICLES;
  try{
    const base = document.body.getAttribute('data-root') || '.';
    const res = await fetch(`${base}/data/articles.json`);
    const json = await res.json();
    RR_ARTICLES = Array.isArray(json) ? json : (json.articles || []);
  }catch(e){ RR_ARTICLES = []; }
  return RR_ARTICLES;
}

function openSearch(){
  document.getElementById('searchPanel')?.classList.add('open');
  document.getElementById('searchInput')?.focus();
  loadArticles();
}
function closeSearch(e){
  if (e && e.target.id !== 'searchPanel') return;
  document.getElementById('searchPanel')?.classList.remove('open');
}
async function runSearch(q){
  const box = document.getElementById('searchResults');
  if (!box) return;
  if (!q){ box.innerHTML = ''; return; }
  const list = await loadArticles();
  const matches = list.filter(a => a.title.toLowerCase().includes(q.toLowerCase())).slice(0,8);
  box.innerHTML = matches.length
    ? matches.map(a => `<a href="${a.url}"><strong>${a.title}</strong><br><span style="color:var(--text-3);font-size:12px;">${a.category} · ${a.date}</span></a>`).join('')
    : `<p class="search-hint">No articles match "${q}".</p>`;
}

// PERF: Debounce search input (don't run on every keystroke)
function debouncedSearch(q){
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => runSearch(q), 200);
}

document.addEventListener('keydown', (e)=>{
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'){ e.preventDefault(); openSearch(); }
  if (e.key === 'Escape'){ document.getElementById('searchPanel')?.classList.remove('open'); }
});

/* ---------- Back to top + progress bar (with throttling) ---------- */
// PERF: Cache DOM elements instead of querying every scroll event
let cachedBackToTopBtn = null;
let cachedProgressBar = null;
let scrollTicking = false;

function updateScrollUI(){
  if (!cachedBackToTopBtn) cachedBackToTopBtn = document.getElementById('backToTop');
  if (!cachedProgressBar) cachedProgressBar = document.getElementById('progressBar');
  
  if (cachedBackToTopBtn) {
    cachedBackToTopBtn.classList.toggle('show', window.scrollY > 500);
  }

  if (cachedProgressBar){
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const height = doc.scrollHeight - doc.clientHeight;
    cachedProgressBar.style.width = height > 0 ? `${(scrollTop/height)*100}%` : '0%';
  }
}

// PERF: Throttle scroll handler with requestAnimationFrame
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateScrollUI();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

function scrollToTop(){ window.scrollTo({top:0, behavior:'smooth'}); }

/* ---------- Fade-in on scroll ---------- */
function initFadeIns(){
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.25 });
  els.forEach(el => io.observe(el));
}

/* ---------- Newsletter + contact forms (no backend) ---------- */
function handleNewsletter(e){
  e.preventDefault();
  const form = e.target;
  const success = form.parentElement.querySelector('.newsletter-success');
  if (success){ success.style.display = 'block'; }
  form.reset();
  return false;
}
function handleContact(e){
  e.preventDefault();
  const form = e.target;
  document.getElementById('contactSuccess').style.display = 'block';
  form.reset();
  return false;
}

/* ---------- Tabs ---------- */
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const group = btn.closest('.tabs');
      const panelId = btn.getAttribute('data-tab');
      group.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const panelWrap = group.parentElement;
      panelWrap.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      panelWrap.querySelector(`#${panelId}`)?.classList.add('active');
    });
  });
}

/* ---------- Filter chips (trackers) ---------- */
function initFilters(){
  document.querySelectorAll('[data-filter-group]').forEach(group=>{
    const chips = group.querySelectorAll('.filter-chip');
    const targetSel = group.getAttribute('data-filter-group');
    chips.forEach(chip=>{
      chip.addEventListener('click', ()=>{
        chips.forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.getAttribute('data-value');
        document.querySelectorAll(targetSel).forEach(row=>{
          row.style.display = (val === 'all' || row.getAttribute('data-status') === val) ? '' : 'none';
        });
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  updateThemeIcon();
  initFadeIns();
  initTabs();
  initFilters();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e)=> debouncedSearch(e.target.value));
  }
  
  document.getElementById('searchPanel')?.addEventListener('click', closeSearch);
});
