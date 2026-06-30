const fs = require('fs');
const path = require('path');

const dict = {
  // Strings used in objects/variables
  '"Home"': '"Beranda"',
  '"Services"': '"Layanan"',
  '"Testimonials"': '"Testimoni"',
  '"About"': '"Tentang"',
  
  // Login / Register in buttons
  '>Login<': '>Masuk<',
  '>Register<': '>Daftar<',
  '>Navigation<': '>Navigasi<',
  '>Account<': '>Akun<',
  
  // Other potential strings in components
  '>System Error<': '>Sistem Eror<',
  '>Try Again<': '>Coba Lagi<',
  '>Return to Home<': '>Kembali ke Beranda<',
  '>INITIALIZING SYSTEM...<': '>MENGINISIALISASI SISTEM...<',
  '>Target Not Found<': '>Target Tidak Ditemukan<',
  '>The requested system node does not exist or has been relocated.<': '>Node sistem yang diminta tidak ada atau telah dipindahkan.<',
  '>A critical error occurred while processing your request.<': '>Kesalahan kritis terjadi saat memproses permintaan Anda.<',
  
  // Landing Page Text
  '>Seamlessly manage your water bills<': '>Kelola tagihan air Anda dengan mudah<',
  '>Register and login to track your monthly usage, view pending payments, and stay up to date.<': '>Daftar dan masuk untuk melacak penggunaan bulanan, melihat tagihan tertunda, dan mendapatkan pembaruan.<',
  '>Start Free<': '>Mulai Gratis<',
  '>Learn More<': '>Pelajari Lebih Lanjut<',
  '>Trusted by over 10,000+ residents.<': '>Dipercaya oleh lebih dari 10.000 penduduk.<',
  
  '>Secure Payment<': '>Pembayaran Aman<',
  '>Pay your bills securely via bank transfer or e-wallets.<': '>Bayar tagihan Anda dengan aman melalui transfer bank atau dompet elektronik.<',
  '>Transparent Usage<': '>Penggunaan Transparan<',
  '>View your historical water usage statistics and bills.<': '>Lihat statistik penggunaan air dan tagihan historis Anda.<',
  '>Instant Receipts<': '>Struk Instan<',
  '>Get instant digital receipts directly on your phone.<': '>Dapatkan struk digital instan langsung di ponsel Anda.<',
  
  '>What our customers say<': '>Apa kata pelanggan kami<',
  '>PDAM Baru has made it so much easier for me to manage my monthly water payments. Highly recommended!<': '>PDAM Baru sangat memudahkan saya mengelola pembayaran air bulanan. Sangat disarankan!<',
  '>The digital receipts are a game changer. I no longer have to keep paper records.<': '>Struk digital sangat membantu. Saya tidak perlu lagi menyimpan catatan kertas.<',
  '>Customer service is top notch and the dashboard is beautiful.<': '>Layanan pelanggan sangat memuaskan dan dasbornya sangat bagus.<',
  
  '>Your Partner in Clean Water<': '>Mitra Anda untuk Air Bersih<',
  '>We are committed to providing clean water and transparent billing to all residents.<': '>Kami berkomitmen menyediakan air bersih dan tagihan yang transparan untuk semua warga.<',
  
  '>All rights reserved.<': '>Hak Cipta Dilindungi.<',
  '>Quick Links<': '>Tautan Singkat<',
  '>Legal<': '>Hukum<',
  '>Privacy Policy<': '>Kebijakan Privasi<',
  '>Terms of Service<': '>Syarat dan Ketentuan<',
  '>Contact Us<': '>Hubungi Kami<',
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
      const escapedEng = eng.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedEng, 'g');
      content = content.replace(regex, ind);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Translated Phase 3: ${filePath}`);
    }
  });
});
