# Dokumentasi dashboard-sim-pelajar

## Pendahuluan

Proyek ini di buat dengan bantuan bioler plate dari Laravel React Inertia Boilerplate. Boilerplate ini dirancang untuk membantu Anda memulai proyek Laravel tanpa harus memulai dari awal. Dengan menggunakan boilerplate ini, Anda akan mendapatkan fitur-fitur berikut:

Laravel Breeze: Sistem autentikasi yang mudah digunakan.
Autentikasi: Proses login dan registrasi pengguna.
API: Pembuatan dan pengelolaan API.
Roles and Permissions: Manajemen hak akses pengguna.
Media Library: Pengelolaan file media.
Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:

-   PHP >= 7.4
-   Composer
-   Node.js & npm
-   MySQL atau database lainnya

Boilerplate didapatkan dari repo berikut

```
https://github.com/username/laravel-react-inertia-boilerplate.git
```

### Instalasi

1. Install Dependencies
   Jalankan perintah berikut untuk menginstal dependencies PHP dan JavaScript:

```
composer install
npm install
```

2.  Konfigurasi Environment
    Salin file .env.example menjadi .env dan sesuaikan konfigurasi database serta pengaturan lainnya:

```
cp .env.example .env
php artisan key:generate

```

3. Migrasi dan Seeder
   Jalankan migrasi database dan seeder untuk membuat tabel-tabel yang diperlukan:

```
php artisan migrate --seed --Seeder=DatabaseSeeder
```

4. Link Storage
   Jalankan symlink untuk menghubungkan folder storage public:

```
php artisan storage:link
```

5. Build Frontend
   Build aset-aset frontend menggunakan perintah berikut:

```
npm run dev
```

6. Jalankan Server
   Jalankan server pengembangan Laravel:

```
php artisan serve
```

Dan jalankan Vite untuk hot module replacement:

```
npm run dev
```