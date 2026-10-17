/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   Tugas & E-Learning LMS Page Logic & Upload Modal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (!initPageShell('tugas')) return;

  // Live Task Search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.task-card');
      cards.forEach(card => {
        if (!q) {
          card.style.display = 'flex';
        } else {
          const text = card.innerText.toLowerCase();
          card.style.display = text.includes(q) ? 'flex' : 'none';
        }
      });
    });
  }
});

function openUploadModal(taskTitle, courseTitle) {
  const modalTaskTitle = document.getElementById('modalTaskTitle');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modal = document.getElementById('uploadModal');
  
  if (modalTaskTitle) modalTaskTitle.textContent = taskTitle || 'Unggah Berkas Tugas';
  if (modalCourseTitle) modalCourseTitle.textContent = courseTitle || 'Mata Kuliah';
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeUploadModal() {
  const modal = document.getElementById('uploadModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  const form = document.getElementById('submissionForm');
  if (form) form.reset();
  const feedback = document.getElementById('fileFeedback');
  if (feedback) {
    feedback.classList.add('hidden');
    feedback.classList.remove('flex');
  }
}

function handleFileSelect(input) {
  if (input.files && input.files[0]) {
    const fileNameEl = document.getElementById('selectedFileName');
    if (fileNameEl) fileNameEl.textContent = input.files[0].name;
    const feedback = document.getElementById('fileFeedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.classList.add('flex');
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Mengirim...';
  }

  setTimeout(() => {
    closeUploadModal();
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Kirim Berkas Tugas';
    }
    showGlobalToast('success', 'Penugasan Terkirim!', 'Berkas Anda berhasil tersimpan di SIAKAD UPB.');
  }, 900);
}

function filterTasks(category, btnElement) {
  const tabContainer = document.getElementById('taskTabList');
  if (tabContainer) {
    const buttons = tabContainer.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.className = 'px-3.5 py-1.5 rounded-xl font-semibold text-xs text-slate-500 hover:bg-slate-100 transition whitespace-nowrap';
    });
  }
  if (btnElement) {
    btnElement.className = 'px-3.5 py-1.5 rounded-xl font-semibold text-xs bg-indigo-600 text-white shadow-sm transition whitespace-nowrap';
  }

  const cards = document.querySelectorAll('.task-card');
  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else if (card.getAttribute('data-category') === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
