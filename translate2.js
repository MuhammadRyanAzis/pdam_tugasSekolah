const fs = require('fs');
const path = require('path');

const dict = {
  '>Back to Payments<': '>Kembali ke Pembayaran<',
  '>Back to Dashboard<': '>Kembali ke Dasbor<',
  '>Submit Payment Proof<': '>Kirim Bukti Pembayaran<',
  '>No Payments Found<': '>Tidak Ada Pembayaran Ditemukan<',
  '>Payment #': '>Pembayaran #',
  '>Bill ID:': '>ID Tagihan:',
  '>Cancel<': '>Batal<',
  '>Delete Now<': '>Hapus Sekarang<',
  '>Pay Bill<': '>Bayar Tagihan<',
  '>No Bills Found<': '>Tidak Ada Tagihan Ditemukan<',
  '>Profile Not Found<': '>Profil Tidak Ditemukan<',
  '>Back to Sign In<': '>Kembali ke Masuk<',
  '>Customer User<': '>Pengguna Pelanggan<',
  '>View My Bills<': '>Lihat Tagihan Saya<',
  'label="Service Address"': 'label="Alamat Layanan"',
  '>Return to Customer List<': '>Kembali ke Daftar Pelanggan<',
  '>Register <': '>Daftar <',
  '>New Customer<': '>Pelanggan Baru<',
  '>Service Plan<': '>Paket Layanan<',
  '>Customer not found<': '>Pelanggan tidak ditemukan<',
  '>Customer Details<': '>Detail Pelanggan<',
  '>Are you sure you want to delete this customer?<': '>Apakah Anda yakin ingin menghapus pelanggan ini?<',
  '>This action cannot be undone.<': '>Tindakan ini tidak dapat dibatalkan.<',
  '>Yes, Delete<': '>Ya, Hapus<',
  '>No, Cancel<': '>Tidak, Batal<',
  '>Search<': '>Cari<',
  '>Clear<': '>Bersihkan<',
  '>All Months<': '>Semua Bulan<',
  '>All Years<': '>Semua Tahun<',
  '>View Details<': '>Lihat Detail<',
  '>Return to Admin Dashboard<': '>Kembali ke Dasbor Admin<',
  '>View Profile<': '>Lihat Profil<',
  '>Admin System<': '>Sistem Admin<',
  '>Total Income<': '>Total Pendapatan<',
  '>Manage Customers<': '>Kelola Pelanggan<',
  '>Manage Bills<': '>Kelola Tagihan<',
  '>Manage Services<': '>Kelola Layanan<',
  '>Manage Payments<': '>Kelola Pembayaran<',
  '>Pending Approvals<': '>Menunggu Persetujuan<',
  '>Water Management System<': '>Sistem Manajemen Air<',
  '>Easy, transparent, and reliable water billing.<': '>Tagihan air yang mudah, transparan, dan andal.<',
  '>Get Started<': '>Mulai Sekarang<',
  '>Our Services<': '>Layanan Kami<',
  '>Why Choose Us?<': '>Mengapa Memilih Kami?<',
  'Total Customers': 'Total Pelanggan',
  'Active Services': 'Layanan Aktif',
  'Total Revenue': 'Total Pendapatan',
  'Pending Payments': 'Pembayaran Tertunda',
  'Recent Bills': 'Tagihan Terbaru',
  'Total Bills': 'Total Tagihan',
  'My Bills': 'Tagihan Saya',
  'My Payments': 'Pembayaran Saya',
  'Payment History': 'Riwayat Pembayaran',
  
  // Attributes / placeholders not caught by generic regex
  'placeholder="Search name or ID..."': 'placeholder="Cari nama atau ID..."',
  'placeholder="Search bills..."': 'placeholder="Cari tagihan..."',
  'placeholder="Search..."': 'placeholder="Cari..."',
};

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const foldersToProcess = ['app', 'components'];

foldersToProcess.forEach(folder => {
  walkDir(path.join(__dirname, folder), (filePath) => {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    for (const [eng, ind] of Object.entries(dict)) {
      // Avoid regex injection
      const escapedEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedEng, 'g');
      content = content.replace(regex, ind);
    }
    
    // Also run dynamic regex for "Customer #<number>" and "Payment #<number>" if not already in dict
    content = content.replace(/>Customer\s+#/g, '>Pelanggan #');
    content = content.replace(/Customer\s+#/g, 'Pelanggan #');
    content = content.replace(/Payment\s+#/g, 'Pembayaran #');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Translated Phase 2: ${filePath}`);
    }
  });
});
