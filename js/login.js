/* ============================================================
   Portal SSO Terpadu - Universitas Pelita Bangsa
   Login Page Logic & Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in
  if (localStorage.getItem('upb_logged_in') === 'true') {
    window.location.href = 'dashboard.html';
    return;
  }

  // Role tab switching
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[role="tab"]').forEach((t) => {
        t.setAttribute('aria-selected', 'false');
        t.className = 'px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white/60 flex items-center gap-2 transition-all';
      });
      tab.setAttribute('aria-selected', 'true');
      tab.className = 'px-5 py-2.5 rounded-xl bg-brand-700 text-white shadow-sm flex items-center gap-2 transition-all';
      
      const role = tab.dataset.role;
      const subtitle = document.getElementById('login-subtitle');
      if (role === 'mahasiswa') subtitle.textContent = 'Gunakan NIM atau Email Institusi Pelita Bangsa';
      else if (role === 'dosen') subtitle.textContent = 'Gunakan NIP atau Email Dosen Pelita Bangsa';
      else subtitle.textContent = 'Gunakan NIK atau Nomor Pendaftaran Calon Mahasiswa';
    });
  });

  // Attach login form submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Helpdesk search listener
  const searchInput = document.getElementById('login-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = searchInput.value.trim();
        if (val) {
          showToast('info', 'Pencarian Bantuan', `Menemukan 3 artikel bantuan terkait "${val}". Silakan hubungi loket BAAK jika memerlukan asistensi langsung.`);
        }
      }
    });
  }

  // Randomize server latency display
  function updateServerStatus() {
    const latency = Math.floor(Math.random() * 60) + 20;
    const statusEl = document.getElementById('server-status');
    if (statusEl) statusEl.textContent = `100% Online (${latency}ms)`;
  }
  setInterval(updateServerStatus, 8000);
});

// Password visibility toggle
function togglePassword() {
  const input = document.getElementById('password');
  const icon = document.getElementById('eye-icon');
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.className = 'fa-regular fa-eye-slash';
  } else {
    input.type = 'password';
    if (icon) icon.className = 'fa-regular fa-eye';
  }
}

// Toast notification for login page
function showToast(type, title, message) {
  const toast = document.getElementById('toast');
  const iconEl = document.getElementById('toast-icon');
  const titleEl = document.getElementById('toast-title');
  const msgEl = document.getElementById('toast-message');
  
  if (!toast) return;

  titleEl.textContent = title;
  msgEl.textContent = message;
  
  if (type === 'success') {
    iconEl.className = 'w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0';
    iconEl.innerHTML = '<i class="fa-solid fa-check text-lg"></i>';
  } else if (type === 'error') {
    iconEl.className = 'w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0';
    iconEl.innerHTML = '<i class="fa-solid fa-xmark text-lg"></i>';
  } else {
    iconEl.className = 'w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0';
    iconEl.innerHTML = '<i class="fa-solid fa-info text-lg"></i>';
  }
  
  toast.classList.remove('hidden');
  clearTimeout(window._loginToastTimer);
  window._loginToastTimer = setTimeout(() => hideToast(), 4000);
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.add('hidden');
}

// Login form handler
function handleLogin(e) {
  e.preventDefault();
  
  const btn = document.getElementById('login-btn');
  const btnText = document.getElementById('login-btn-text');
  const btnIcon = document.getElementById('login-btn-icon');
  const spinner = document.getElementById('login-spinner');
  const errorDiv = document.getElementById('error-message');
  const studentId = document.getElementById('student_id').value.trim();
  const password = document.getElementById('password').value;

  // Hide previous errors
  if (errorDiv) errorDiv.classList.add('hidden');

  if (!studentId || !password) {
    if (errorDiv) {
      errorDiv.classList.remove('hidden');
      document.getElementById('error-text').textContent = 'Silakan isi NIM dan Kata Sandi Anda.';
    }
    return;
  }

  // Show loading state
  if (btnText) btnText.textContent = 'Memverifikasi Akun...';
  if (btnIcon) btnIcon.classList.add('hidden');
  if (spinner) spinner.classList.remove('hidden');
  if (btn) {
    btn.classList.add('loading-btn');
    btn.disabled = true;
  }

  // Simulate authentication (1.2s delay)
  setTimeout(() => {
    // Store session data in localStorage
    localStorage.setItem('upb_logged_in', 'true');
    localStorage.setItem('upb_user_name', 'Arni Yuniarni');
    localStorage.setItem('upb_user_nim', studentId || '312210542');
    localStorage.setItem('upb_user_prodi', 'S1 Teknik Informatika');
    localStorage.setItem('upb_user_kelas', 'TI.22.A4');
    localStorage.setItem('upb_user_semester', '6');

    showToast('success', 'Login Berhasil!', 'Mengalihkan ke Dashboard Portal Akademik...');
    
    if (btnText) btnText.textContent = 'Berhasil! Mengalihkan...';
    if (spinner) spinner.classList.add('hidden');
    if (btnIcon) {
      btnIcon.classList.remove('hidden');
      btnIcon.className = 'fa-solid fa-check';
    }
    if (btn) {
      btn.classList.remove('loading-btn');
      btn.classList.add('bg-emerald-600');
    }

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  }, 1200);
}
