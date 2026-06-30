# 💧 PDAM Frontend

Aplikasi web untuk sistem manajemen **Perusahaan Daerah Air Minum (PDAM)** yang memungkinkan admin mengelola data pelanggan, tagihan, dan layanan, serta pelanggan dapat melihat tagihan dan mengirimkan bukti pembayaran.

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Next.js](https://nextjs.org/) | 16.1.4 | Framework utama (App Router) |
| [React](https://react.dev/) | 19 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Styling |
| [Framer Motion](https://www.framer.com/motion/) | 12 | Animasi |
| [Lucide React](https://lucide.dev/) | — | Icon library |

---

## 📁 Struktur Folder

```
app/
├── page.tsx              # Landing page
├── sign-in/              # Halaman login
├── sign-up/              # Halaman registrasi customer
│
├── admin/                # Dashboard Admin
│   ├── profile/          # Profil admin
│   ├── services/         # Kelola paket layanan
│   ├── customer/         # Kelola data pelanggan
│   ├── bills/            # Kelola tagihan bulanan
│   └── payments/         # Verifikasi pembayaran customer
│
├── customer/             # Dashboard Customer
│   ├── profile/          # Profil pelanggan
│   ├── bills/            # Lihat tagihan sendiri
│   └── payments/         # Riwayat & upload bukti bayar
│
└── components/           # Komponen reusable
    ├── landing/          # Komponen halaman utama
    └── ui/               # Komponen UI umum

helper/
└── cookies.ts            # Utility untuk autentikasi cookie
```

---

## 🚀 Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Buat file environment

Buat file `.env` di root folder:

```env
NEXT_PUBLIC_BASE_URL=https://your-backend-api-url.com
NEXT_PUBLIC_APP_KEY=your_app_key
```

### 4. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 👥 Fitur Per Pengguna

### 🔐 Admin
| Fitur | Deskripsi |
|-------|-----------|
| Manajemen Layanan | Tambah, edit, hapus paket layanan air |
| Manajemen Pelanggan | Tambah, edit, hapus data pelanggan |
| Manajemen Tagihan | Buat tagihan bulanan per pelanggan |
| Verifikasi Pembayaran | Lihat bukti bayar & verifikasi status pembayaran |

### 👤 Customer
| Fitur | Deskripsi |
|-------|-----------|
| Lihat Tagihan | Melihat tagihan bulanan milik sendiri |
| Bayar Tagihan | Upload foto bukti pembayaran |
| Riwayat Pembayaran | Lihat status verifikasi pembayaran |

---

## 🔄 Alur Sistem

```
Customer daftar → Admin buat tagihan → Customer upload bukti bayar → Admin verifikasi
```

```
[Sign Up] ──► [/customer/bills] ──► [Upload Bukti Bayar]
                                              │
                                              ▼
                                    [/admin/payments]
                                    Admin klik "Verify" ✅
```

---

## 🔐 Autentikasi

- Menggunakan **JWT Token** yang disimpan di **HTTP-only cookie**
- Token dikirim otomatis ke setiap request API melalui header `Authorization: Bearer <token>`
- Cookie bersifat `httpOnly` dan `sameSite: strict` untuk keamanan
- Masa aktif token: **24 jam**

---

## 🌐 API Endpoints Yang Digunakan

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/auth/login` | Login user |
| `POST` | `/customers` | Registrasi customer baru |
| `GET` | `/services` | Ambil semua layanan |
| `GET` | `/customers` | Ambil semua pelanggan (admin) |
| `GET` | `/bills/me` | Ambil tagihan milik customer |
| `POST` | `/payments` | Upload bukti pembayaran |
| `GET` | `/payments/me` | Riwayat pembayaran customer |
| `GET` | `/payments` | Semua pembayaran (admin) |
| `PATCH` | `/payments/:id` | Verifikasi pembayaran |

---

## 📝 Scripts

```bash
npm run dev       # Jalankan development server
npm run build     # Build untuk production
npm run start     # Jalankan production server
npm run lint      # Cek error kode
```

---

## 📄 Lisensi

Project ini dibuat untuk keperluan tugas/akademik.# pdam_tugasSekolah
