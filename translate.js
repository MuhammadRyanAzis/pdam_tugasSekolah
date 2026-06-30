const fs = require('fs');
const path = require('path');

const dict = {
  // Navigation / Menus
  '>Admin Dashboard<': '>Dasbor Admin<',
  '>Customer Dashboard<': '>Dasbor Pelanggan<',
  '>Customers<': '>Pelanggan<',
  '>Services<': '>Layanan<',
  '>Bills<': '>Tagihan<',
  '>Payments<': '>Pembayaran<',
  '>Profile<': '>Profil<',
  '>Logout<': '>Keluar<',
  '>Home<': '>Beranda<',
  '>About<': '>Tentang<',
  '>Testimonials<': '>Testimoni<',
  
  // Auth
  '>Sign In<': '>Masuk<',
  '>Sign Up<': '>Daftar<',
  '>Welcome Back<': '>Selamat Datang Kembali<',
  '>Access your PDAM account<': '>Akses akun PDAM Anda<',
  '>Create an Account<': '>Buat Akun<',
  '>Join PDAM for easy water billing<': '>Bergabung dengan PDAM untuk kemudahan tagihan air<',
  "Don't have an account?": "Belum punya akun?",
  "Already have an account?": "Sudah punya akun?",
  '>Username<': '>Nama Pengguna<',
  '>Password<': '>Kata Sandi<',
  '>Full Name<': '>Nama Lengkap<',
  '>Phone Number<': '>Nomor Telepon<',
  '>Detailed Address<': '>Alamat Lengkap<',
  '>Address<': '>Alamat<',
  
  // Placeholders
  'placeholder="Enter username"': 'placeholder="Masukkan nama pengguna"',
  'placeholder="Enter password"': 'placeholder="Masukkan kata sandi"',
  'placeholder="Create password"': 'placeholder="Buat kata sandi"',
  'placeholder="Enter full name"': 'placeholder="Masukkan nama lengkap"',
  'placeholder="Enter phone number"': 'placeholder="Masukkan nomor telepon"',
  'placeholder="Full residential or property address"': 'placeholder="Alamat rumah atau properti lengkap"',
  'placeholder="Search bills..."': 'placeholder="Cari tagihan..."',
  'placeholder="Search customers..."': 'placeholder="Cari pelanggan..."',
  'placeholder="Search services..."': 'placeholder="Cari layanan..."',
  'placeholder="Enter bill amount"': 'placeholder="Masukkan jumlah tagihan"',

  // Buttons / Actions
  '>Submit<': '>Kirim<',
  '>Save<': '>Simpan<',
  '>Cancel<': '>Batal<',
  '>Edit<': '>Ubah<',
  '>Delete<': '>Hapus<',
  '>Verify<': '>Verifikasi<',
  '>Reject<': '>Tolak<',
  '>Add<': '>Tambah<',
  '>Update<': '>Perbarui<',
  '>Pay Now<': '>Bayar Sekarang<',
  '>Add New Customer<': '>Tambah Pelanggan Baru<',
  '>Add New Bill<': '>Tambah Tagihan Baru<',
  '>Add New Service<': '>Tambah Layanan Baru<',
  '>Add Customer<': '>Tambah Pelanggan<',
  '>Add Bill<': '>Tambah Tagihan<',
  '>Add Service<': '>Tambah Layanan<',

  // Tables / Headers
  '>Customer Name<': '>Nama Pelanggan<',
  '>Amount<': '>Jumlah<',
  '>Status<': '>Status<',
  '>Action<': '>Aksi<',
  '>Actions<': '>Aksi<',
  '>Month<': '>Bulan<',
  '>Year<': '>Tahun<',
  '>Date<': '>Tanggal<',
  '>Method<': '>Metode<',
  '>Proof<': '>Bukti<',
  '>ID<': '>ID<',
  '>Service Name<': '>Nama Layanan<',
  '>Description<': '>Deskripsi<',
  '>Price<': '>Harga<',

  // Statuses
  '>Pending<': '>Tertunda<',
  '>Verified<': '>Terverifikasi<',
  '>Rejected<': '>Ditolak<',
  '>Paid<': '>Lunas<',
  '>Unpaid<': '>Belum Lunas<',
  '>Active<': '>Aktif<',
  '>Inactive<': '>Nonaktif<',
  
  // Dashboard Cards
  '>Total Customers<': '>Total Pelanggan<',
  '>Active Services<': '>Layanan Aktif<',
  '>Total Revenue<': '>Total Pendapatan<',
  '>Pending Payments<': '>Pembayaran Tertunda<',
  '>Recent Bills<': '>Tagihan Terbaru<',
  '>Total Bills<': '>Total Tagihan<',
  '>My Bills<': '>Tagihan Saya<',
  '>My Payments<': '>Pembayaran Saya<',
  '>Payment History<': '>Riwayat Pembayaran<',
  
  // Landing Page specifics
  '>Water Management System<': '>Sistem Manajemen Air<',
  '>Easy, transparent, and reliable water billing<': '>Tagihan air yang mudah, transparan, dan andal<',
  '>Get Started<': '>Mulai Sekarang<',
  '>Our Services<': '>Layanan Kami<',
  '>Why Choose Us?<': '>Mengapa Memilih Kami?<',
  
  // Toasts / Errors / Texts
  '"Failed to register"': '"Gagal mendaftar"',
  '"Failed to login"': '"Gagal masuk"',
  '"Login successful"': '"Berhasil masuk"',
  '"Registration successful"': '"Pendaftaran berhasil"',
  '"Customer added successfully"': '"Pelanggan berhasil ditambahkan"',
  '"Bill added successfully"': '"Tagihan berhasil ditambahkan"',
  '"Service added successfully"': '"Layanan berhasil ditambahkan"',
  '"Successfully deleted"': '"Berhasil dihapus"',
  '"Failed to delete"': '"Gagal menghapus"',
  '"Are you sure you want to delete this?"': '"Apakah Anda yakin ingin menghapusnya?"',
  
  // Misc
  '>No data available<': '>Tidak ada data tersedia<',
  '>Loading...<': '>Memuat...<',
  '>No pending bills found.<': '>Tidak ada tagihan tertunda.<',
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
      // Create a global replacement regex avoiding regex injection risks by escaping special chars
      const escapedEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedEng, 'g');
      content = content.replace(regex, ind);
    }
    
    // Some general regex replacements for common prefixes/suffixes
    content = content.replace(/>Edit\s([A-Za-z]+)</g, (match, p1) => {
        if(p1 === 'Customer') return '>Ubah Pelanggan<';
        if(p1 === 'Bill') return '>Ubah Tagihan<';
        if(p1 === 'Service') return '>Ubah Layanan<';
        return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Translated: ${filePath}`);
    }
  });
});
