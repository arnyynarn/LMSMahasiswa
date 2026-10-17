/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   KHS & Transkrip IPK Page Logic, Semester Filter & Live Search
   ============================================================ */

// Data KHS & Transkrip per Semester
const khsData = {
  1: {
    title: 'Kartu Hasil Studi — Semester 1',
    subtitle: 'Kurikulum: TIF-2020-REV • Total Beban: 17 SKS • Mutu: 65.75',
    status: 'Nilai Final & Disahkan BAAK',
    totalSKS: 17,
    totalMutu: '65.75',
    ips: '3.87',
    labelIPS: 'IPS: 3.87',
    courses: [
      { no: 1, code: 'TIF1001', name: 'Algoritma & Pemrograman 1', dosen: 'Dr. Anita Rahmawati, S.T., M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 2, code: 'TIF1002', name: 'Pengantar Teknologi Informasi', dosen: 'Fajar Nugraha, S.Kom., M.M.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' },
      { no: 3, code: 'TIF1003', name: 'Matematika Diskrit', dosen: 'Wahyu Hidayat, M.Mat.', sks: 3, grade: 'A-', bobot: '3.75', mutu: '11.25', status: 'Lulus' },
      { no: 4, code: 'UNI1001', name: 'Pendidikan Agama Islam', dosen: 'Drs. H. Mulyadi, M.Ag.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' },
      { no: 5, code: 'UNI1002', name: 'Bahasa Indonesia Akademik', dosen: 'Dra. Siti Maryam, M.Pd.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' },
      { no: 6, code: 'TIF1004', name: 'Sistem Digital & Logika', dosen: 'Ir. Bambang S., M.T.', sks: 3, grade: 'B+', bobot: '3.50', mutu: '10.50', status: 'Lulus' },
      { no: 7, code: 'TIF1005', name: 'Bahasa Inggris Komputer 1', dosen: 'Lisa Andriani, S.Pd., M.Hum.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' }
    ]
  },
  2: {
    title: 'Kartu Hasil Studi — Semester 2',
    subtitle: 'Kurikulum: TIF-2020-REV • Total Beban: 19 SKS • Mutu: 73.75',
    status: 'Nilai Final & Disahkan BAAK',
    totalSKS: 19,
    totalMutu: '73.75',
    ips: '3.88',
    labelIPS: 'IPS: 3.88',
    courses: [
      { no: 1, code: 'TIF1021', name: 'Algoritma & Pemrograman 2', dosen: 'Dr. Ir. Hendra Saputra, M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 2, code: 'TIF1022', name: 'Struktur Data & Linear List', dosen: 'Dr. Anita Rahmawati, S.T., M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 3, code: 'TIF1023', name: 'Kalkulus Informatika', dosen: 'Wahyu Hidayat, M.Mat.', sks: 3, grade: 'B+', bobot: '3.50', mutu: '10.50', status: 'Lulus' },
      { no: 4, code: 'TIF1024', name: 'Arsitektur & Organisasi Komputer', dosen: 'Bambang Tri Atmojo, M.Kom.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 5, code: 'UNI1003', name: 'Pancasila & Kewarganegaraan', dosen: 'Drs. Supriyanto, M.Si.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' },
      { no: 6, code: 'TIF1025', name: 'Pemrograman Berorientasi Objek 1', dosen: 'Nurul Hidayati, S.T., M.T.', sks: 3, grade: 'A-', bobot: '3.75', mutu: '11.25', status: 'Lulus' },
      { no: 7, code: 'TIF1026', name: 'Bahasa Inggris Komputer 2', dosen: 'Lisa Andriani, S.Pd., M.Hum.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' }
    ]
  },
  3: {
    title: 'Kartu Hasil Studi — Semester 3',
    subtitle: 'Kurikulum: TIF-2020-REV • Total Beban: 20 SKS • Mutu: 77.75',
    status: 'Nilai Final & Disahkan BAAK',
    totalSKS: 20,
    totalMutu: '77.75',
    ips: '3.89',
    labelIPS: 'IPS: 3.89',
    courses: [
      { no: 1, code: 'TIF2011', name: 'Pemrograman Web Dasar', dosen: 'Dr. Ir. Hendra Saputra, M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 2, code: 'TIF2012', name: 'Sistem Basis Data Relasional', dosen: 'Fajar Nugraha, S.Kom., M.M.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 3, code: 'TIF2013', name: 'Sistem Operasi Komputer', dosen: 'Bambang Tri Atmojo, M.Kom.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 4, code: 'TIF2014', name: 'Pemrograman Berorientasi Objek 2', dosen: 'Nurul Hidayati, S.T., M.T.', sks: 3, grade: 'A-', bobot: '3.75', mutu: '11.25', status: 'Lulus' },
      { no: 5, code: 'TIF2015', name: 'Probabilitas & Statistika', dosen: 'Wahyu Hidayat, M.Mat.', sks: 3, grade: 'B+', bobot: '3.50', mutu: '10.50', status: 'Lulus' },
      { no: 6, code: 'TIF2016', name: 'Desain Antarmuka Pengguna (UI/UX)', dosen: 'Maya Lestari, M.Ds.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 7, code: 'TIF2017', name: 'Komunikasi Interpersonal & Karir', dosen: 'H. Ahmad Zaki, S.E., M.M.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' }
    ]
  },
  4: {
    title: 'Kartu Hasil Studi — Semester 4',
    subtitle: 'Kurikulum: TIF-2020-REV • Total Beban: 20 SKS • Mutu: 77.75',
    status: 'Nilai Final & Disahkan BAAK',
    totalSKS: 20,
    totalMutu: '77.75',
    ips: '3.89',
    labelIPS: 'IPS: 3.89',
    courses: [
      { no: 1, code: 'TIF2021', name: 'Basis Data Lanjut & NoSQL', dosen: 'Fajar Nugraha, S.Kom., M.M.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 2, code: 'TIF2022', name: 'Jaringan Komputer & Routing', dosen: 'Bambang Tri Atmojo, M.Kom.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 3, code: 'TIF2023', name: 'Pemrograman Visual & Desktop', dosen: 'Nurul Hidayati, S.T., M.T.', sks: 3, grade: 'A-', bobot: '3.75', mutu: '11.25', status: 'Lulus' },
      { no: 4, code: 'TIF2024', name: 'Analisis & Perancangan Sistem', dosen: 'Dr. Anita Rahmawati, S.T., M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 5, code: 'TIF2025', name: 'Teori Bahasa & Otomata', dosen: 'Prof. Dr. Wahyudi Pratama, M.Cs.', sks: 3, grade: 'B+', bobot: '3.50', mutu: '10.50', status: 'Lulus' },
      { no: 6, code: 'TIF2026', name: 'Grafika Komputer & Animasi', dosen: 'Maya Lestari, M.Ds.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 7, code: 'TIF2027', name: 'Metodologi Penelitian Informatika', dosen: 'Dr. Ir. Hendra Saputra, M.Kom', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' }
    ]
  },
  5: {
    title: 'Kartu Hasil Studi — Semester 5',
    subtitle: 'Kurikulum: TIF-2020-REV • Total Beban: 19 SKS • Mutu: 74.25',
    status: 'Nilai Final & Disahkan BAAK',
    totalSKS: 19,
    totalMutu: '74.25',
    ips: '3.91',
    labelIPS: 'IPS: 3.91',
    courses: [
      { no: 1, code: 'TIF3021', name: 'Pemrograman Berbasis Web Lanjut', dosen: 'Dr. Ir. Hendra Saputra, M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 2, code: 'TIF3040', name: 'Kecerdasan Buatan (AI & Deep Learning)', dosen: 'Prof. Dr. Wahyudi Pratama, M.Cs.', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 3, code: 'TIF3012', name: 'Rekayasa Perangkat Lunak', dosen: 'Nurul Hidayati, S.T., M.T.', sks: 3, grade: 'A-', bobot: '3.75', mutu: '11.25', status: 'Lulus' },
      { no: 4, code: 'TIF3055', name: 'Keamanan Siber & Jaringan Komputer', dosen: 'Bambang Tri Atmojo, M.Kom., CEH', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 5, code: 'TIF2088', name: 'Manajemen Proyek Teknologi Informasi', dosen: 'Fajar Nugraha, S.Kom., M.M.', sks: 2, grade: 'B+', bobot: '3.50', mutu: '7.00', status: 'Lulus' },
      { no: 6, code: 'TIF3071', name: 'Big Data Analytics & Cloud Computing', dosen: 'Dr. Anita Rahmawati, S.T., M.Kom', sks: 3, grade: 'A', bobot: '4.00', mutu: '12.00', status: 'Lulus' },
      { no: 7, code: 'UNI1004', name: 'Etika Profesi & Kewirausahaan Digital', dosen: 'H. Ahmad Zaki, S.E., M.M.', sks: 2, grade: 'A', bobot: '4.00', mutu: '8.00', status: 'Lulus' }
    ]
  },
  6: {
    title: 'Kartu Rencana Studi — Semester 6 (Sedang Berjalan)',
    subtitle: 'Kurikulum: TIF-2020-REV • Beban Ditempuh: 22 SKS • Status: Proses Penilaian',
    status: 'Perkuliahan Aktif (Genap 2024/2025)',
    totalSKS: 22,
    totalMutu: '-',
    ips: '-',
    labelIPS: 'Status: Berjalan',
    courses: [
      { no: 1, code: 'TIF3080', name: 'Pemrograman Mobile (Flutter & Kotlin)', dosen: 'Dr. Anita Rahmawati, S.T., M.Kom', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 2, code: 'TIF3082', name: 'Pengolahan Citra Digital', dosen: 'Prof. Dr. Wahyudi Pratama, M.Cs.', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 3, code: 'TIF3084', name: 'Cloud Native & DevOps CI/CD', dosen: 'Bambang Tri Atmojo, M.Kom.', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 4, code: 'TIF3086', name: 'Data Mining & Machine Learning', dosen: 'Dr. Ir. Hendra Saputra, M.Kom', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 5, code: 'TIF3088', name: 'Internet of Things (IoT) Lab', dosen: 'Nurul Hidayati, S.T., M.T.', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 6, code: 'TIF3090', name: 'Proyek Perangkat Lunak Terintegrasi', dosen: 'Tim Dosen Informatika', sks: 4, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' },
      { no: 7, code: 'UNI1006', name: 'Kuliah Kerja Nyata Tematik (KKN)', dosen: 'LPPM Universitas Pelita Bangsa', sks: 3, grade: 'Proses', bobot: '-', mutu: '-', status: 'Aktif' }
    ]
  }
};

// Generate data Transkrip Lengkap dari Semester 1 - 5
function getTranskripLengkap() {
  let allCourses = [];
  let totalSKS = 0;
  let totalMutuNum = 0;
  let counter = 1;

  for (let s = 1; s <= 5; s++) {
    const sem = khsData[s];
    sem.courses.forEach(c => {
      allCourses.push({
        ...c,
        no: counter++,
        semOrigin: `Semester ${s}`
      });
      totalSKS += c.sks;
      totalMutuNum += parseFloat(c.mutu);
    });
  }

  const ipk = (totalMutuNum / totalSKS).toFixed(2);

  return {
    title: 'Transkrip Akademik Lengkap (Kumulatif Sem. 1 - 5)',
    subtitle: `Kurikulum: TIF-2020-REV • Total Beban: ${totalSKS} SKS • Total Mutu: ${totalMutuNum.toFixed(2)}`,
    status: 'Transkrip Resmi BAAK UPB',
    totalSKS: totalSKS,
    totalMutu: totalMutuNum.toFixed(2),
    ips: ipk,
    labelIPS: `IPK: ${ipk} (Cumlaude)`,
    courses: allCourses
  };
}

let currentSelectedSemester = '5';
let currentSearchQuery = '';

function getGradeBadge(grade) {
  if (grade === 'A') return '<span class="inline-block px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-xs">A</span>';
  if (grade === 'A-') return '<span class="inline-block px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-extrabold text-xs">A-</span>';
  if (grade === 'B+') return '<span class="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-extrabold text-xs">B+</span>';
  if (grade === 'B') return '<span class="inline-block px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 font-extrabold text-xs">B</span>';
  if (grade === 'Proses') return '<span class="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold text-xs italic">Proses</span>';
  return `<span class="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">${grade}</span>`;
}

function getStatusBadge(status) {
  if (status === 'Lulus') return '<span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px]">Lulus</span>';
  if (status === 'Aktif') return '<span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-[10px]">Ditempuh</span>';
  return `<span class="px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 font-semibold text-[10px]">${status}</span>`;
}

function renderKHSTable() {
  const tableBody = document.getElementById('khsTableBody');
  const tableTitle = document.getElementById('khsTableTitle');
  const tableSubtitle = document.getElementById('khsTableSubtitle');
  const tableStatusChip = document.getElementById('khsTableStatusChip');
  const tableFoot = document.getElementById('khsTableFoot');

  if (!tableBody) return;

  const dataset = currentSelectedSemester === 'all' ? getTranskripLengkap() : khsData[currentSelectedSemester];
  if (!dataset) return;

  // Update table card header
  if (tableTitle) tableTitle.textContent = dataset.title;
  if (tableSubtitle) tableSubtitle.textContent = dataset.subtitle;
  if (tableStatusChip) {
    tableStatusChip.innerHTML = `
      <span class="material-symbols-outlined text-[15px]">verified</span>
      <span>${dataset.status}</span>
    `;
  }

  // Filter courses based on search query
  const query = currentSearchQuery.toLowerCase().trim();
  const filteredCourses = dataset.courses.filter(c => {
    if (!query) return true;
    return (
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.dosen.toLowerCase().includes(query) ||
      c.grade.toLowerCase() === query ||
      c.status.toLowerCase().includes(query) ||
      (c.semOrigin && c.semOrigin.toLowerCase().includes(query))
    );
  });

  if (filteredCourses.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="py-10 text-center text-slate-400">
          <div class="flex flex-col items-center justify-center space-y-2">
            <span class="material-symbols-outlined text-[36px] text-slate-300">search_off</span>
            <p class="text-xs font-semibold text-slate-600">Tidak ada mata kuliah yang cocok dengan kata kunci "${query}"</p>
            <p class="text-[11px] text-slate-400">Coba gunakan kode mata kuliah (misal: TIF3021), nama dosen, atau nilai (A, B+).</p>
          </div>
        </td>
      </tr>
    `;
  } else {
    let rowsHTML = '';
    filteredCourses.forEach(c => {
      rowsHTML += `
        <tr class="hover:bg-indigo-50/30 transition-colors">
          <td class="py-3.5 px-4 text-center text-slate-400">${c.no}</td>
          <td class="py-3.5 px-3 font-bold text-indigo-600 font-mono">${c.code}</td>
          <td class="py-3.5 px-4">
            <div class="font-bold text-slate-800">${c.name}</div>
            <div class="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span class="material-symbols-outlined text-[13px]">person</span>
              <span>${c.dosen}</span>
              ${c.semOrigin ? `<span class="ml-1 px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 font-bold text-[9px]">${c.semOrigin}</span>` : ''}
            </div>
          </td>
          <td class="py-3.5 px-3 text-center font-bold">${c.sks}</td>
          <td class="py-3.5 px-3 text-center">${getGradeBadge(c.grade)}</td>
          <td class="py-3.5 px-3 text-center font-mono">${c.bobot}</td>
          <td class="py-3.5 px-3 text-center font-mono font-bold text-indigo-600">${c.mutu}</td>
          <td class="py-3.5 px-4 text-center">${getStatusBadge(c.status)}</td>
        </tr>
      `;
    });
    tableBody.innerHTML = rowsHTML;
  }

  // Update Footer
  if (tableFoot) {
    const isTranskrip = currentSelectedSemester === 'all';
    const labelTotal = isTranskrip ? 'Total Beban Kumulatif:' : `Total Beban Semester ${currentSelectedSemester}:`;
    tableFoot.innerHTML = `
      <tr class="bg-indigo-50/60 font-semibold text-slate-800 border-t border-indigo-100">
        <td class="py-3 px-4 text-right text-xs" colspan="3">${labelTotal}</td>
        <td class="py-3 px-3 text-center font-extrabold text-indigo-600 text-sm">${dataset.totalSKS} SKS</td>
        <td class="py-3 px-3 text-right text-slate-400 text-[11px]" colspan="2">Total Mutu:</td>
        <td class="py-3 px-3 text-center font-extrabold text-indigo-600 text-sm">${dataset.totalMutu}</td>
        <td class="py-3 px-4 text-center">
          <span class="bg-indigo-600 text-white font-extrabold px-2.5 py-1 rounded-lg text-xs shadow-xs">${dataset.labelIPS}</span>
        </td>
      </tr>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!initPageShell('krs')) return;

  // Initial render with Semester 5
  renderKHSTable();

  // Semester Tabs Interaction
  const semesterTabs = document.querySelectorAll('#semesterTabs button');
  semesterTabs.forEach(button => {
    button.addEventListener('click', () => {
      semesterTabs.forEach(b => {
        b.className = 'px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition';
        const dot = b.querySelector('span.rounded-full');
        if (dot) dot.remove();
      });

      button.className = 'px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1';
      const dot = document.createElement('span');
      dot.className = 'w-1.5 h-1.5 rounded-full bg-emerald-400';
      button.appendChild(dot);

      const sem = button.getAttribute('data-semester');
      currentSelectedSemester = sem;
      renderKHSTable();

      const semLabel = sem === 'all' ? 'Transkrip Nilai Lengkap (Kumulatif)' : `Semester ${sem}`;
      showGlobalToast('info', 'Filter Transkrip', `Menampilkan data KHS: ${semLabel}`);
    });
  });

  // Live in-page search on KRS page
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    // Read search query from URL parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q') || urlParams.get('search');
    if (qParam) {
      searchInput.value = qParam;
      currentSearchQuery = qParam;
      renderKHSTable();
    }

    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderKHSTable();
    });
  }

  // Legalisir Modal Trigger
  const modal = document.getElementById('legalisirModal');
  const btnLegalisir = document.getElementById('btnLegalisir');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const submitLegalisirBtn = document.getElementById('submitLegalisirBtn');

  function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (btnLegalisir) btnLegalisir.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (submitLegalisirBtn) {
    submitLegalisirBtn.addEventListener('click', () => {
      closeModal();
      showGlobalToast('success', 'Permohonan Berhasil', 'Permohonan legalisir digital berhasil diajukan ke BAAK UPB!');
    });
  }

  // Cetak Button Trigger
  const btnCetakKHS = document.getElementById('btnCetakKHS');
  if (btnCetakKHS) {
    btnCetakKHS.addEventListener('click', () => {
      showGlobalToast('info', 'Cetak KHS', 'Menyiapkan dokumen resmi Transkrip KHS...');
      setTimeout(() => {
        window.print();
      }, 700);
    });
  }
});
