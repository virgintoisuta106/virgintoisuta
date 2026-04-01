// Fungsi utama untuk memeriksa scientific notation
function isScientificNotation(str) {
  if (!str || typeof str !== 'string') return false;
  
  const trimmed = str.trim();
  if (trimmed === '') return false;

  const regex = /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/;
  return regex.test(trimmed);
}

// Fungsi ketika tombol Run diklik atau Enter ditekan
function runCheck() {
  const inputField = document.getElementById('input');
  const resultDiv = document.getElementById('result');

  const value = inputField.value.trim();

  if (value === '') {
    resultDiv.textContent = "⚠️ Silakan masukkan angka terlebih dahulu";
    resultDiv.className = "result";
    return;
  }

  const isScientific = isScientificNotation(value);

  if (isScientific) {
    resultDiv.innerHTML = `✅ YES <br><small style="font-size:18px;">Ini adalah Scientific Notation yang valid</small>`;
    resultDiv.className = "result yes";
  } else {
    resultDiv.innerHTML = `❌ NO <br><small style="font-size:18px;">Ini BUKAN Scientific Notation yang valid</small>`;
    resultDiv.className = "result no";
  }
}

// ==================== FILE MENU IMPLEMENTATION ====================

function fileMenu() {
  // Buat menu dropdown sederhana menggunakan prompt konfirmasi
  const choice = prompt(
    "File Menu:\n\n" +
    "1. New (Bersihkan input)\n" +
    "2. Open (Muat dari teks)\n" +
    "3. Save (Simpan hasil sebagai .txt)\n" +
    "4. Exit (Tutup aplikasi)\n\n" +
    "Masukkan nomor pilihan (1-4):"
  );

  if (choice === null) return; // Jika user cancel

  switch (choice.trim()) {
    case "1":
      newFile();
      break;
    case "2":
      openFile();
      break;
    case "3":
      saveFile();
      break;
    case "4":
      exitApp();
      break;
    default:
      alert("Pilihan tidak valid! Masukkan angka 1 sampai 4.");
  }
}

// Fitur New - Membersihkan input dan result
function newFile() {
  if (confirm("Buat file baru? Semua input akan dihapus.")) {
    document.getElementById('input').value = '';
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = "Masukkan angka baru...";
    resultDiv.className = "result";
    alert("✅ File baru telah dibuat.");
  }
}

// Fitur Open - Memuat teks ke input
function openFile() {
  const loadedText = prompt("Masukkan teks/nomor yang ingin dibuka:");
  if (loadedText !== null && loadedText.trim() !== "") {
    document.getElementById('input').value = loadedText.trim();
    alert("✅ Teks berhasil dimuat ke input.");
    // Otomatis scan setelah open
    setTimeout(() => runCheck(), 300);
  } else if (loadedText !== null) {
    alert("Input kosong, tidak ada yang dimuat.");
  }
}

// Fitur Save - Menyimpan input + hasil sebagai file .txt
function saveFile() {
  const inputValue = document.getElementById('input').value.trim();
  const resultDiv = document.getElementById('result');
  const resultText = resultDiv.textContent || "Belum ada hasil";

  if (!inputValue) {
    alert("Tidak ada data untuk disimpan. Masukkan angka terlebih dahulu.");
    return;
  }

  const content = 
    "Scientific Notation Scanner\n" +
    "===========================\n\n" +
    "Input          : " + inputValue + "\n" +
    "Hasil          : " + resultText + "\n" +
    "Tanggal        : " + new Date().toLocaleString('id-ID') + "\n\n" +
    "Dibuat dengan Scientific Notation Scanner";

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `scientific-notation-result_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);

  alert("✅ Hasil berhasil disimpan sebagai file .txt");
}

// Fitur Exit - Konfirmasi keluar
function exitApp() {
  if (confirm("Keluar dari aplikasi?\n\nPerubahan yang belum disimpan akan hilang.")) {
    window.close();
    // Jika tidak bisa close (karena dibuka di tab), tampilkan pesan
    setTimeout(() => {
      alert("Silakan tutup tab browser secara manual.");
    }, 500);
  }
}

// ==================== MENU LAINNYA ====================

function editMenu() {
  const choice = prompt(
    "Edit Menu:\n\n" +
    "1. Clear Input\n" +
    "2. Copy Result\n" +
    "3. Select All Input\n\n" +
    "Masukkan nomor pilihan (1-3):"
  );

  if (choice === null) return;

  switch (choice.trim()) {
    case "1":
      document.getElementById('input').value = '';
      alert("Input telah dibersihkan.");
      break;
    case "2":
      copyResult();
      break;
    case "3":
      document.getElementById('input').select();
      alert("Input telah diseleksi semua.");
      break;
    default:
      alert("Pilihan tidak valid!");
  }
}

function copyResult() {
  const resultDiv = document.getElementById('result');
  const textToCopy = resultDiv.textContent.trim();

  if (!textToCopy || textToCopy.includes("Masukkan angka")) {
    alert("Tidak ada hasil yang bisa dicopy.");
    return;
  }

  navigator.clipboard.writeText(textToCopy)
    .then(() => alert("✅ Hasil berhasil dicopy ke clipboard!"))
    .catch(() => alert("Gagal menyalin. Browser tidak mendukung."));
}

function showAbout() {
  alert("Scientific Notation Scanner\n\n" +
        "Versi 2.1\n\n" +
        "Aplikasi ini memeriksa apakah sebuah angka ditulis dalam bentuk Scientific Notation.\n\n" +
        "Fitur File Menu sudah diimplementasikan:\n" +
        "• New, Open, Save, Exit\n\n" +
        "Dibuat sesuai permintaan Anda.");
}

// Event Listener saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input');
  
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      runCheck();
    }
  });
});