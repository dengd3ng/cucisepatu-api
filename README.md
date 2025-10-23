# REST API Layanan Cuci Sepatu

Ini adalah proyek REST API sederhana untuk mengelola daftar barang (sepatu) pada layanan laundry/cuci sepatu. Dibuat menggunakan Node.js, Express.js, dan Supabase.

## 🌟 Fitur Utama

-   **CRUD:** Create, Read, Update, Delete data sepatu.
-   **Database:** Terhubung dengan database Supabase (PostgreSQL).
-   **Filtering:** Mendukung filter data berdasarkan status (`/items?status=Selesai`).
-   **Deployment:** Siap di-deploy ke Vercel.

## 💾 Struktur Data (Tabel `sepatu`)

| Kolom | Tipe | Deskripsi |
| :--- | :--- | :--- |
| `id` | `int8` | Primary Key, Auto-increment |
| `created_at` | `timestamptz`| Waktu data dibuat |
| `nama_pelanggan` | `text` | Nama pemilik sepatu |
| `nama_sepatu` | `text` | Merek/jenis sepatu |
| `status` | `text` | Status pengerjaan (Misal: "Masuk", "Dicuci", "Selesai", "Diambil") |

## 🚀 Contoh Request & Response API

**Base URL:** `[GANTI DENGAN LINK VERCEL ANDA]`

---

### 1. Create: Tambah Item Sepatu Baru

Menambahkan sepatu baru ke daftar antrian. Status default akan diatur ke "Masuk".

-   **Endpoint:** `POST /items`
-   **Body (JSON):**
    ```json
    {
      "nama_pelanggan": "Budi Santoso",
      "nama_sepatu": "Nike Air Force 1"
    }
    ```
-   **Response (201 Created):**
    ```json
    {
      "id": 1,
      "created_at": "2025-10-23T10:00:00.000Z",
      "nama_pelanggan": "Budi Santoso",
      "nama_sepatu": "Nike Air Force 1",
      "status": "Masuk"
    }
    ```

---

### 2. Read: Dapatkan Semua Item

Mengambil seluruh daftar sepatu yang ada di database.

-   **Endpoint:** `GET /items`
-   **Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "created_at": "2025-10-23T10:00:00.000Z",
        "nama_pelanggan": "Budi Santoso",
        "nama_sepatu": "Nike Air Force 1",
        "status": "Dicuci"
      },
      {
        "id": 2,
        "created_at": "2025-10-23T09:00:00.000Z",
        "nama_pelanggan": "Ani",
        "nama_sepatu": "Converse All Star",
        "status": "Selesai"
      }
    ]
    ```

---

### 3. Read (Filter): Dapatkan Item Berdasarkan Status

Mengambil daftar sepatu yang sudah selesai dicuci.

-   **Endpoint:** `GET /items?status=Selesai`
-   **Response (200 OK):**
    ```json
    [
      {
        "id": 2,
        "created_at": "2025-10-23T09:00:00.000Z",
        "nama_pelanggan": "Ani",
        "nama_sepatu": "Converse All Star",
        "status": "Selesai"
      }
    ]
    ```

---

### 4. Update: Ubah Status Item

Mengubah status sepatu dengan ID tertentu (misal: dari "Dicuci" menjadi "Selesai").

-   **Endpoint:** `PUT /items/1`
-   **Body (JSON):**
    ```json
    {
      "status": "Selesai"
    }
    ```
-   **Response (200 OK):**
    ```json
    {
      "id": 1,
      "created_at": "2025-10-23T10:00:00.000Z",
      "nama_pelanggan": "Budi Santoso",
      "nama_sepatu": "Nike Air Force 1",
      "status": "Selesai"
    }
    ```

---

### 5. Delete: Hapus Item

Menghapus data sepatu (misal: jika sudah diambil pelanggan).

-   **Endpoint:** `DELETE /items/1`
-   **Response:** `204 No Content`

## ⚙️ Instalasi & Menjalankan Lokal

1.  Clone repository ini:
    ```bash
    git clone [https://github.com/](https://github.com/)[NAMA_AKUN_GITHUB]/[NAMA_REPO].git
    cd [NAMA_REPO]
    ```
2.  Install dependensi:
    ```bash
    npm install
    ```
3.  Buat file `.env` di root proyek.
4.  Isi file `.env` dengan kredensial Supabase Anda:
    ```env
    SUPABASE_URL=https://<your-project-id>.supabase.co
    SUPABASE_ANON_KEY=<your-anon-key>
    ```
5.  Jalankan server (mode development):
    ```bash
    node index.js
    ```
6.  API akan berjalan di `http://localhost:3000`.

## 🌐 Link Deploy Vercel

API ini telah di-deploy dan dapat diakses publik melalui link berikut:


(https://cucisepatu-api.vercel.app/)
