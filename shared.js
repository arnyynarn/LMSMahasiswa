/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   Shared Core Architecture & UI Components
   ============================================================ */

// ============================================================
// AUTH & SESSION STATE
// ============================================================
function checkAuth() {
  const isLoggedIn = localStorage.getItem('upb_logged_in');
  if (isLoggedIn !== 'true') {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function getUserData() {
  return {
    name: localStorage.getItem('upb_user_name') || 'Arni Yuniarni',
    nim: localStorage.getItem('upb_user_nim') || '312210542',
    prodi: localStorage.getItem('upb_user_prodi') || 'S1 Teknik Informatika',
    kelas: localStorage.getItem('upb_user_kelas') || 'TI.22.A4',
    semester: localStorage.getItem('upb_user_semester') || '6',
    initials: (localStorage.getItem('upb_user_name') || 'Arni Yuniarni')
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  };
}

function logout() {
  localStorage.setItem('upb_logged_in', 'false');
  localStorage.removeItem('upb_user_name');
  localStorage.removeItem('upb_user_nim');
  showGlobalToast('info', 'Keluar Akun', 'Sesi Anda telah berakhir. Mengalihkan...');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 800);
}

// ============================================================
// GLOBAL TOAST NOTIFICATIONS
// ============================================================
function showGlobalToast(type, title, message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-6 right-6 z-[100] bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 transition-all duration-300 max-w-sm border border-slate-700/50 hidden';
    toast.style.cssText = 'transform: translateY(10px); opacity: 0;';
    toast.innerHTML = `
      <div id="global-toast-icon" class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"></div>
      <div class="flex flex-col min-w-0 pr-2">
        <span id="global-toast-title" class="text-xs font-extrabold text-white truncate"></span>
        <span id="global-toast-message" class="text-[11px] text-slate-300 leading-snug"></span>
      </div>
      <button onclick="document.getElementById('global-toast').classList.add('hidden')" class="text-slate-400 hover:text-white ml-2 text-xs flex-shrink-0">✕</button>
    `;
    document.body.appendChild(toast);
  }

  const iconEl = document.getElementById('global-toast-icon');
  const titleEl = document.getElementById('global-toast-title');
  const msgEl = document.getElementById('global-toast-message');

  titleEl.textContent = title;
  msgEl.textContent = message;

  const configs = {
    success: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: 'check_circle' },
    info: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', icon: 'info' },
    warning: { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: 'warning' },
    error: { bg: 'bg-rose-500/20', text: 'text-rose-400', icon: 'error' }
  };
  const c = configs[type] || configs.info;
  iconEl.className = `w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`;
  iconEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:22px">${c.icon}</span>`;

  toast.classList.remove('hidden');
  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.transform = 'translateY(10px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 4000);
}

// ============================================================
// SIDEBAR & MOBILE DRAWER NAVIGATION
// ============================================================
function generateSidebar(activePage) {
  const user = getUserData();
  const navItems = [
    { id: 'dashboard', href: 'dashboard.html', icon: `<svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`, title: 'Dashboard Beranda' },
    { id: 'jadwal', href: 'jadwal_kuliah.html', icon: `<svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round" width="18" x="3" y="4"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>`, title: 'Jadwal Perkuliahan', badge: 'LIVE' },
    { id: 'tugas', href: 'tugas.html', icon: `<svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round"></path></svg>`, title: 'Tugas & E-Learning LMS', badge: 'AKTIF' },
    { id: 'krs', href: 'krs.html', icon: `<svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`, title: 'KHS & Transkrip IPK' },
    { id: 'tagihan', href: 'tagihan.html', icon: `<svg class="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round"></path></svg>`, title: 'Tagihan & UKT' },
  ];

  let navHTML = '';
  navItems.forEach(item => {
    const isActive = item.id === activePage;
    if (isActive) {
      navHTML += `<a aria-current="page" class="relative bg-white text-indigo-600 rounded-2xl p-2.5 shadow-md flex items-center justify-center transition-transform hover:scale-105" href="${item.href}" title="${item.title}">${item.icon}`;
      if (item.badge) {
        navHTML += `<span class="absolute -top-1.5 -right-1.5 text-[8px] bg-emerald-400 text-emerald-950 font-extrabold px-1.5 py-0.5 rounded-full border border-indigo-600">${item.badge}</span>`;
      }
      navHTML += `</a>`;
    } else {
      navHTML += `<a class="text-indigo-200 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10 relative" href="${item.href}" title="${item.title}">${item.icon}`;
      if (item.badge) {
        navHTML += `<span class="absolute -top-1 -right-1 text-[8px] bg-emerald-400 text-emerald-950 font-extrabold px-1 py-0.5 rounded-full border border-indigo-600">${item.badge}</span>`;
      }
      navHTML += `</a>`;
    }
  });

  return `
    <aside class="w-20 md:w-24 bg-[#4f46e5] flex-col items-center py-7 justify-between relative shrink-0 z-20 hidden md:flex h-full" data-purpose="dock-navigation">
      <div class="flex flex-col items-center space-y-6 w-full">
        <a class="w-13 h-13 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all p-3" href="dashboard.html" title="Universitas Pelita Bangsa Portal">
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17l7 3.5 7-3.5v-5.18L12 15z"></path></svg>
        </a>
        <span class="text-[10px] font-bold text-indigo-200 tracking-wider">UPB ID</span>
        <nav class="flex flex-col items-center space-y-5 pt-1">
          ${navHTML}
        </nav>
      </div>
      <div class="flex flex-col items-center space-y-3">
        <button onclick="logout()" class="w-10 h-10 rounded-full hover:bg-white/15 flex items-center justify-center text-indigo-200 hover:text-white transition-all" title="Keluar / Logout">
          <svg class="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <div class="w-10 h-10 rounded-full ring-2 ring-white/30 bg-indigo-800 flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:ring-white/60 transition-all" title="${user.name} (${user.prodi})" onclick="showGlobalToast('info','Profil Mahasiswa','${user.name} — ${user.nim} — ${user.prodi}')">
          ${user.initials}
        </div>
      </div>
    </aside>

    <!-- Mobile Off-Canvas Drawer Backdrop -->
    <div id="mobile-sidebar-backdrop" onclick="closeMobileSidebar()" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"></div>

    <!-- Mobile Off-Canvas Drawer -->
    <aside id="mobile-sidebar-drawer" class="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white z-50 transform -translate-x-full transition-transform duration-300 ease-in-out shadow-2xl flex flex-col justify-between md:hidden">
      <!-- Drawer Header -->
      <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-white/15 backdrop-blur-md rounded-xl flex items-center justify-center p-2 text-white">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 13l-7-3.18V17l7 3.5 7-3.5v-5.18L12 15z"></path></svg>
          </div>
          <div>
            <div class="font-extrabold text-sm leading-tight tracking-tight">UPB Smart LMS</div>
            <div class="text-[10px] text-indigo-200">Universitas Pelita Bangsa</div>
          </div>
        </div>
        <button onclick="closeMobileSidebar()" class="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95" aria-label="Tutup Menu">
          <svg class="w-5 h-5 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>

      <!-- Drawer Nav Items -->
      <div class="flex-1 overflow-y-auto p-4 space-y-2 custom-scroll">
        <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Menu Utama</p>
        ${navItems.map(item => {
          const isActive = item.id === activePage;
          return `
            <a href="${item.href}" class="flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'}">
              <div class="flex items-center space-x-3">
                <span class="${isActive ? 'text-indigo-600' : 'text-slate-400'}">${item.icon.replace(/w-6 h-6/g, 'w-5 h-5')}</span>
                <span class="text-xs">${item.title}</span>
              </div>
              ${item.badge ? `<span class="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">${item.badge}</span>` : ''}
            </a>
          `;
        }).join('')}
      </div>

      <!-- Drawer Footer (Profile & Logout) -->
      <div class="p-4 border-t border-slate-100 bg-slate-50 flex flex-col gap-3">
        <div class="flex items-center space-x-3 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-xs">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
            ${user.initials}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">${user.name}</p>
            <p class="text-[10px] text-slate-400 truncate">${user.nim} • ${user.prodi}</p>
          </div>
        </div>
        <button onclick="logout()" class="w-full py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center space-x-2 transition active:scale-95">
          <svg class="w-4 h-4 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          <span>Keluar / Logout</span>
        </button>
      </div>
    </aside>`;
}

// ============================================================
// MOBILE DRAWER CONTROLS
// ============================================================
function openMobileSidebar() {
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  const drawer = document.getElementById('mobile-sidebar-drawer');
  if (backdrop && drawer) {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    drawer.classList.remove('-translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileSidebar() {
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  const drawer = document.getElementById('mobile-sidebar-drawer');
  if (backdrop && drawer) {
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    backdrop.classList.remove('opacity-100');
    drawer.classList.add('-translate-x-full');
    drawer.classList.remove('translate-x-0');
    document.body.style.overflow = '';
  }
}

// Close mobile drawer on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileSidebar();
});

// ============================================================
// HEADER TABS COMPONENT (Single Row Hamburger + Title on Mobile)
// ============================================================
function generateHeaderTabs(activePage) {
  const pageTitles = {
    dashboard: 'Dashboard',
    jadwal: 'Jadwal Kuliah',
    tugas: 'Tugas & LMS',
    krs: 'KHS & Transkrip',
    tagihan: 'Tagihan UKT'
  };

  const mobileNav = `
    <div class="md:hidden flex items-center space-x-2 shrink-0">
      <button type="button" onclick="openMobileSidebar()" aria-label="Buka Menu Navigasi" class="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white shadow-sm shrink-0 hover:bg-indigo-700 active:scale-95 transition" title="Buka Menu">
        <svg class="w-4.5 h-4.5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </button>
      <span class="font-extrabold text-xs sm:text-sm text-slate-800 tracking-tight flex items-center gap-1.5 whitespace-nowrap">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse shrink-0"></span>
        <span>${pageTitles[activePage] || 'UPB LMS'}</span>
      </span>
    </div>
  `;

  const tabs = [
    { id: 'dashboard', href: 'dashboard.html', icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"></path></svg>`, label: 'Dashboard' },
    { id: 'jadwal', href: 'jadwal_kuliah.html', icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, label: 'Jadwal & Kuliah' },
    { id: 'tugas', href: 'tugas.html', icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, label: 'Tugas & LMS' },
    { id: 'krs', href: 'krs.html', icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, label: 'KHS & Transkrip' },
    { id: 'tagihan', href: 'tagihan.html', icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, label: 'Tagihan UKT' },
  ];

  const tabLinks = tabs.map(tab => {
    const isActive = tab.id === activePage;
    if (isActive) {
      return `<a class="flex items-center space-x-2 text-indigo-600 border-b-2 border-indigo-600 pb-1 font-bold whitespace-nowrap shrink-0" href="${tab.href}">${tab.icon}<span>${tab.label}</span></a>`;
    }
    return `<a class="flex items-center space-x-1.5 text-slate-500 hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0" href="${tab.href}">${tab.icon}<span>${tab.label}</span></a>`;
  }).join('');

  return mobileNav + `<div class="hidden md:flex items-center space-x-7 overflow-x-auto text-xs font-semibold">${tabLinks}</div>`;
}

// ============================================================
// GLOBAL SEARCH HANDLER
// ============================================================
function initGlobalSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) {
        showGlobalToast('warning', 'Pencarian Kosong', 'Silakan ketik kata kunci pencarian terlebih dahulu.');
        return;
      }
      const lowerQ = query.toLowerCase();

      // Page route mapping
      const pageKeywords = {
        'jadwal': 'jadwal_kuliah.html', 'kuliah': 'jadwal_kuliah.html', 'presensi': 'jadwal_kuliah.html',
        'tugas': 'tugas.html', 'lms': 'tugas.html', 'materi': 'tugas.html', 'modul': 'tugas.html',
        'krs': 'krs.html', 'khs': 'krs.html', 'transkrip': 'krs.html', 'ipk': 'krs.html', 'nilai': 'krs.html',
        'tagihan': 'tagihan.html', 'ukt': 'tagihan.html', 'bayar': 'tagihan.html', 'pembayaran': 'tagihan.html',
        'dashboard': 'dashboard.html', 'beranda': 'dashboard.html'
      };

      const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

      // If user is searching for another module from current page
      for (const [kw, targetPage] of Object.entries(pageKeywords)) {
        if (lowerQ.includes(kw) && !currentPage.includes(targetPage.replace('.html', ''))) {
          showGlobalToast('info', 'Navigasi Pencarian', `Mengarahkan ke halaman ${kw}...`);
          setTimeout(() => { window.location.href = targetPage; }, 400);
          return;
        }
      }

      // Otherwise confirm the in-page active filter
      showGlobalToast('info', 'Pencarian Halaman', `Menampilkan hasil untuk: "${query}"`);
    }
  });
}

// ============================================================
// MINI CALENDAR NAVIGATION (Dashboard)
// ============================================================
function initCalendarNavigation() {
  const calPrev = document.getElementById('cal-prev');
  const calNext = document.getElementById('cal-next');
  const calMonth = document.getElementById('calendar-month');
  
  if (!calPrev || !calNext || !calMonth) return;

  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const now = new Date();
  let currentMonth = now.getMonth();
  let currentYear = now.getFullYear();

  function updateCalendar() {
    calMonth.textContent = `${months[currentMonth]} ${currentYear}`;
    showGlobalToast('info', 'Kalender', `Menampilkan kalender ${months[currentMonth]} ${currentYear}`);
  }

  calPrev.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    updateCalendar();
  });

  calNext.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    updateCalendar();
  });
}

// ============================================================
// NOTIFICATION BELL HANDLER
// ============================================================
function initNotificationBell() {
  // Already handled via onclick in HTML for simplicity
}

// ============================================================
// INIT PAGE SHELL
// ============================================================
function initPageShell(activePage) {
  if (!checkAuth()) return false;
  
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.className = 'h-full shrink-0 flex';
    sidebarContainer.innerHTML = generateSidebar(activePage);
  }
  
  const headerTabs = document.getElementById('header-tabs');
  if (headerTabs) {
    headerTabs.className = 'flex items-center shrink-0';
    headerTabs.innerHTML = generateHeaderTabs(activePage);
  }

  // Set user name in greeting
  const user = getUserData();
  const greetingEl = document.getElementById('user-greeting');
  if (greetingEl) {
    greetingEl.textContent = `Hai, ${user.name.split(' ')[0]}!`;
  }

  // Init global features
  initGlobalSearch();
  initCalendarNavigation();
  
  return true;
}
