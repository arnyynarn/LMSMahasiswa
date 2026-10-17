/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   Jadwal Perkuliahan Page Logic, Week Navigator & QR Presensi
   ============================================================ */

let currentWeekNum = 8;
const weekDates = [
  '06 - 11 Jan 2025',
  '13 - 18 Jan 2025',
  '20 - 25 Jan 2025',
  '27 Jan - 01 Feb 2025',
  '03 - 08 Feb 2025',
  '10 - 15 Feb 2025',
  '17 - 22 Feb 2025',
  '24 Feb - 01 Mar 2025',
  '03 - 08 Mar 2025',
  '10 - 15 Mar 2025',
  '17 - 22 Mar 2025',
  '24 - 29 Mar 2025',
  '31 Mar - 05 Apr 2025',
  '07 - 12 Apr 2025',
  '14 - 19 Apr 2025',
  '21 - 26 Apr 2025'
];

function openPresensiModal() {
  const modal = document.getElementById('presensi-modal');
  const modalCard = document.getElementById('modal-card');
  const feedback = document.getElementById('scan-feedback');
  if (!modal) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  if (modalCard) {
    modalCard.classList.remove('scale-95');
    modalCard.classList.add('scale-100');
  }
  if (feedback) feedback.classList.add('hidden');
}

function closePresensiModal() {
  const modal = document.getElementById('presensi-modal');
  const modalCard = document.getElementById('modal-card');
  if (!modal) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  if (modalCard) {
    modalCard.classList.remove('scale-100');
    modalCard.classList.add('scale-95');
  }
}

// Make accessible globally to inline onclick handlers
window.openPresensiModal = openPresensiModal;
window.closePresensiModal = closePresensiModal;

document.addEventListener('DOMContentLoaded', () => {
  if (!initPageShell('jadwal')) return;

  // Day Tab Filter Interaction
  const dayTabs = document.querySelectorAll('.day-tab-btn');
  const dayGroups = document.querySelectorAll('.day-group');

  dayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dayTabs.forEach(t => {
        t.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
        t.classList.add('text-slate-600');
      });
      tab.classList.remove('text-slate-600');
      tab.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');

      const selectedDay = tab.getAttribute('data-day');

      dayGroups.forEach(group => {
        const groupDay = group.getAttribute('data-day-group');
        if (selectedDay === 'all' || selectedDay === groupDay) {
          group.style.display = 'flex';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // Presensi QR Modal Button Listeners
  const modal = document.getElementById('presensi-modal');
  const openBannerBtn = document.getElementById('open-presensi-banner-btn');
  const closeBtn = document.getElementById('close-presensi-btn');
  const submitPresensi = document.getElementById('submit-presensi-action');
  const feedback = document.getElementById('scan-feedback');

  if (openBannerBtn) openBannerBtn.addEventListener('click', openPresensiModal);
  if (closeBtn) closeBtn.addEventListener('click', closePresensiModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePresensiModal();
    });
  }

  if (submitPresensi) {
    submitPresensi.addEventListener('click', () => {
      submitPresensi.innerHTML = '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span> Memvalidasi Token GPS...';
      submitPresensi.disabled = true;

      setTimeout(() => {
        submitPresensi.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> Presensi Terverifikasi!';
        submitPresensi.classList.remove('bg-indigo-600');
        submitPresensi.classList.add('bg-emerald-600');
        if (feedback) feedback.classList.remove('hidden');
        showGlobalToast('success', 'Presensi Berhasil', 'Kehadiran Anda pada mata kuliah ini tercatat di SIAKAD UPB!');

        setTimeout(() => {
          closePresensiModal();
          submitPresensi.disabled = false;
          submitPresensi.classList.add('bg-indigo-600');
          submitPresensi.classList.remove('bg-emerald-600');
          submitPresensi.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span> Simulasikan Pindai Kode QR';
        }, 1800);
      }, 900);
    });
  }

  // Week Navigator Interaction
  const prevWeekBtn = document.getElementById('week-prev-btn');
  const nextWeekBtn = document.getElementById('week-next-btn');
  const weekLabel = document.getElementById('current-week-label');
  const weekRange = document.getElementById('current-week-range');

  function updateWeekDisplay() {
    if (weekLabel) weekLabel.textContent = `Minggu ke-${currentWeekNum}`;
    if (weekRange) weekRange.textContent = `(${weekDates[currentWeekNum - 1] || 'Semester Genap'})`;
    showGlobalToast('info', 'Jadwal Kuliah', `Menampilkan perkuliahan Minggu ke-${currentWeekNum}`);
  }

  if (prevWeekBtn) {
    prevWeekBtn.addEventListener('click', () => {
      if (currentWeekNum > 1) {
        currentWeekNum--;
        updateWeekDisplay();
      } else {
        showGlobalToast('warning', 'Batas Awal', 'Ini adalah minggu awal perkuliahan.');
      }
    });
  }

  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', () => {
      if (currentWeekNum < 16) {
        currentWeekNum++;
        updateWeekDisplay();
      } else {
        showGlobalToast('warning', 'Batas Akhir', 'Ini adalah minggu terakhir perkuliahan semester ini.');
      }
    });
  }

  // Live In-Page Schedule Search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const articles = document.querySelectorAll('#schedule-container article');
      const groups = document.querySelectorAll('.day-group');

      if (!q) {
        const activeTab = document.querySelector('.day-tab-btn.bg-indigo-600');
        const selectedDay = activeTab ? activeTab.getAttribute('data-day') : 'all';
        groups.forEach(group => {
          const groupDay = group.getAttribute('data-day-group');
          group.style.display = (selectedDay === 'all' || selectedDay === groupDay) ? 'flex' : 'none';
        });
        articles.forEach(art => art.style.display = 'flex');
        return;
      }

      groups.forEach(group => {
        let hasVisibleArticle = false;
        const groupArticles = group.querySelectorAll('article');
        groupArticles.forEach(art => {
          const text = art.innerText.toLowerCase();
          if (text.includes(q)) {
            art.style.display = 'flex';
            hasVisibleArticle = true;
          } else {
            art.style.display = 'none';
          }
        });
        group.style.display = hasVisibleArticle ? 'flex' : 'none';
      });
    });
  }
});
