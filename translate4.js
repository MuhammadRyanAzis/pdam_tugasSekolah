const fs = require('fs');
const path = require('path');

const dict = {
  // HeroSection.tsx
  '>PUBLIC WATER SERVICE<': '>LAYANAN AIR PUBLIK<',
  '>Clean water delivered reliably — managing public utility services for a smarter, more sustainable community.<': '>Air bersih yang disalurkan secara andal — mengelola layanan utilitas publik untuk komunitas yang lebih cerdas dan berkelanjutan.<',
  '>Register Now<': '>Daftar Sekarang<',
  '>CUSTOMERS<': '>PELANGGAN<',
  '>SUPPORT<': '>DUKUNGAN<',
  '>UPTIME<': '>WAKTU AKTIF<',
  
  // ServicesSection.tsx
  '>WHAT WE OFFER<': '>APA YANG KAMI TAWARKAN<',
  '>Everything you need for clean water management — in one place.<': '>Semua yang Anda butuhkan untuk manajemen air bersih — di satu tempat.<',
  '>Clean Water Supply<': '>Pasokan Air Bersih<',
  '>Reliable daily clean water distribution to every household in the service area.<': '>Distribusi air bersih harian yang andal ke setiap rumah tangga di area layanan.<',
  '>Bill Payment<': '>Pembayaran Tagihan<',
  '>Pay your monthly water bill quickly and securely through our online portal.<': '>Bayar tagihan air bulanan Anda dengan cepat dan aman melalui portal online kami.<',
  '>New Connection<': '>Sambungan Baru<',
  '>Apply for a new water line connection for your home or business easily.<': '>Ajukan sambungan saluran air baru untuk rumah atau bisnis Anda dengan mudah.<',
  '>Complaint Handling<': '>Penanganan Keluhan<',
  '>Submit issues and track resolution status in real time through your account.<': '>Kirim masalah dan lacak status penyelesaian secara real-time melalui akun Anda.<',
  '>All services available 24/7 online<': '>Semua layanan tersedia 24/7 secara online<',
  
  // TestimonialsSection.tsx
  '>WHAT CUSTOMERS SAY<': '>APA KATA PELANGGAN<',
  '>Trusted by thousands of households across the region.<': '>Dipercaya oleh ribuan rumah tangga di seluruh wilayah.<',
  '>Since switching to PDAM Baru, our water supply has been uninterrupted. The online bill payment is so convenient.<': '>Semenjak beralih ke PDAM Baru, pasokan air kami tidak pernah terganggu. Pembayaran tagihan online sangat mudah.<',
  '>Verified<': '>Terverifikasi<',
  '>AVERAGE RATING<': '>RATA-RATA PENILAIAN<',
  '>REVIEWS<': '>ULASAN<',
  '>SATISFACTION RATE<': '>TINGKAT KEPUASAN<',
  
  // AboutSection.tsx
  '>GET TO KNOW US<': '>KENALI KAMI LEBIH DEKAT<',
  '>Decades of dedication to clean water for all.<': '>Puluhan tahun dedikasi untuk air bersih bagi semua.<',
  '>Our History<': '>Sejarah Kami<',
  ">PDAM Baru was founded with a single mission: ensure every household has access to safe, clean water. Over the decades we've grown from a small local utility into a trusted public service institution serving thousands across the region.<": ">PDAM Baru didirikan dengan satu misi: memastikan setiap rumah tangga memiliki akses ke air bersih dan aman. Selama beberapa dekade, kami telah berkembang dari utilitas lokal kecil menjadi institusi layanan publik tepercaya yang melayani ribuan pelanggan di seluruh wilayah.<",
  '>Founded in Malang<': '>Didirikan di Malang<',
  '>Began serving 200 households in the core district.<': '>Mulai melayani 200 rumah tangga di distrik inti.<',
  '>Regional Expansion<': '>Ekspansi Regional<',
  '>Extended pipeline network across 5 sub-districts.<': '>Memperluas jaringan pipa di 5 kecamatan.<',
  '>Digital Platform Launch<': '>Peluncuran Platform Digital<',
  '>Launched online billing and customer portal.<': '>Meluncurkan portal penagihan dan pelanggan online.<',
  '>PHONE<': '>TELEPON<',
  '>EMAIL<': '>EMAIL<',
  '>ADDRESS<': '>ALAMAT<',
  '>FOLLOW US<': '>IKUTI KAMI<',
  '>Customer Service Open<': '>Layanan Pelanggan Buka<',
  
  // FooterSection.tsx
  '>Modernizing water management for a sustainable future. Reliable, clean, and accessible water for all.<': '>Memodernisasi manajemen air untuk masa depan yang berkelanjutan. Air yang andal, bersih, dan mudah diakses untuk semua.<',
  '>EXPLORE<': '>JELAJAHI<',
  '>SUPPORT<': '>DUKUNGAN<',
  '>Help Center<': '>Pusat Bantuan<',
  '>Service Status<': '>Status Layanan<',
  '>Contact Us<': '>Hubungi Kami<',
  '>Terms of Service<': '>Syarat dan Ketentuan<',
  '>Privacy Policy<': '>Kebijakan Privasi<',
  '>CONTACT<': '>KONTAK<',
  '>All rights reserved.<': '>Hak Cipta Dilindungi.<',
  '>All systems operational<': '>Semua sistem operasional<',
  '>Designed with <': '>Didesain dengan <',
  '> for better water systems.<': '> untuk sistem air yang lebih baik.<',
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
    
    // Testimonials quotes could be wrapped in double quotes in JSX
    content = content.replace(/"Since switching to PDAM Baru, our water supply has been uninterrupted. The online bill payment is so convenient."/g, '"Semenjak beralih ke PDAM Baru, pasokan air kami tidak pernah terganggu. Pembayaran tagihan online sangat mudah."');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Translated Phase 4: ${filePath}`);
    }
  });
});
