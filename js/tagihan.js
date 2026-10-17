/* ============================================================
   Portal Akademik & Smart LMS - Universitas Pelita Bangsa
   Tagihan & UKT Page Logic, Payment Guide Tabs & Download Modal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (!initPageShell('tagihan')) return;

  // Live billing & payment history search
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('#historyTableBody tr');
      rows.forEach(row => {
        if (!q) {
          row.style.display = '';
        } else {
          row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
        }
      });
    });
  }
});

function copyVA(number, btnElement) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(number);
  }
  showGlobalToast('success', 'Nomor Rekening Disalin', 'Nomor Virtual Account ' + number + ' berhasil disalin ke clipboard!');

  if (btnElement) {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = '<span>✓ Tersalin!</span>';
    btnElement.classList.remove('bg-indigo-50', 'text-indigo-700', 'bg-sky-50', 'text-sky-700');
    btnElement.classList.add('bg-emerald-50', 'text-emerald-700');

    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.classList.remove('bg-emerald-50', 'text-emerald-700');
      btnElement.classList.add('bg-indigo-50', 'text-indigo-700');
    }, 2200);
  }
}

function switchGuide(type) {
  const tabs = ['mbanking', 'atm', 'teller'];
  tabs.forEach(t => {
    const btn = document.getElementById('guide-tab-' + t);
    if (btn) {
      if (t === type) {
        btn.className = 'px-3 py-1 rounded-lg bg-indigo-600 text-white shadow-sm transition';
      } else {
        btn.className = 'px-3 py-1 rounded-lg text-slate-500 hover:text-slate-800 transition';
      }
    }
  });

  const contentDiv = document.getElementById('guide-content');
  if (!contentDiv) return;

  if (type === 'mbanking') {
    contentDiv.innerHTML = `
      <ol class="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-500">
        <li>Buka aplikasi Mobile Banking kesayangan Anda (<strong>Livin' by Mandiri, BRImo, atau BCA Mobile</strong>).</li>
        <li>Pilih menu <strong>Bayar / Pembayaran</strong> &gt; Pilih kategori <strong>Pendidikan / Institusi</strong>.</li>
        <li>Pilih penyedia instansi <strong>Universitas Pelita Bangsa (UPB)</strong> atau masukkan kode bank tujuan diikuti NIM.</li>
        <li>Periksa kesesuaian rincian: <strong>UPB - ARNI YUNIARNI (312210542)</strong> dan total nominal tagihan.</li>
        <li>Konfirmasi PIN transaksi. Status di portal ini seketika berubah menjadi <strong>LUNAS</strong> dalam &lt; 30 detik.</li>
      </ol>
    `;
  } else if (type === 'atm') {
    contentDiv.innerHTML = `
      <ol class="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-500">
        <li>Masukkan kartu ATM dan 6 digit PIN di gerai ATM Mandiri, BRI, atau BCA.</li>
        <li>Pilih menu <strong>Transaksi Lainnya</strong> &gt; <strong>Pembayaran / Multi Payment</strong>.</li>
        <li>Ketikkan Kode Perusahaan UPB sesuai nomor rekening Virtual Account di atas.</li>
        <li>Konfirmasi kecocokan data mahasiswa: NIM <strong>312210542</strong> dan nama <strong>ARNI YUNIARNI</strong>.</li>
        <li>Tekan <strong>Ya / Eksekusi</strong> untuk menyelesaikan dan simpan struk fisik bukti setor.</li>
      </ol>
    `;
  } else {
    contentDiv.innerHTML = `
      <ol class="list-decimal pl-4 space-y-1.5 text-[11px] text-slate-500">
        <li>Datang ke kantor cabang Mandiri, BRI, atau BCA terdekat dengan slip setoran tunai.</li>
        <li>Tuliskan nomor Virtual Account pada kolom nomor rekening tujuan institusi.</li>
        <li>Tuliskan penerima: <strong>UPB - ARNI YUNIARNI (312210542)</strong>.</li>
        <li>Serahkan slip &amp; nominal pas ke Teller. Validasi SIAKAD akan langsung tersinkron secara online.</li>
      </ol>
    `;
  }
}

function triggerDownloadModal(docTitle) {
  const docTitleEl = document.getElementById('modal-doc-title');
  if (docTitleEl) docTitleEl.innerText = docTitle;
  const modal = document.getElementById('download-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeDownloadModal() {
  const modal = document.getElementById('download-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function executeMockDownload() {
  const btn = document.getElementById('btn-modal-action');
  if (!btn) return;
  const prevText = btn.innerHTML;
  btn.innerHTML = '<span>Mengunduh...</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = prevText;
    btn.disabled = false;
    closeDownloadModal();
    showGlobalToast('success', 'Unduhan Berhasil', 'Berkas PDF resmi berhasil diunduh ke perangkat Anda!');
  }, 900);
}

function refreshFinanceData() {
  showGlobalToast('info', 'Sinkronisasi SIAKAD', 'Data keuangan telah disinkronkan dengan server SIAKAD UPB!');
}
