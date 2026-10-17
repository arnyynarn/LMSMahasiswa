/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   Dashboard Page Logic & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (!initPageShell('dashboard')) return;

  // Set today's date in Indonesian format
  const now = new Date();
  const dateEl = document.getElementById('today-date');
  if (dateEl) {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('id-ID', options);
  }

  // Animate progress bars smoothly
  setTimeout(() => {
    document.querySelectorAll('[data-target]').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 400);
});
