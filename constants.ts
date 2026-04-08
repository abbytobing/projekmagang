export interface ServiceInfo {
  name: string;
  description: string;
  features: string[];
  priceRange: string;
  iconUrl?: string;
}

export interface DataCenter {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
}

export const DATA_CENTERS: DataCenter[] = [
  {
    id: 'rackh-medan',
    name: 'PT. RackH Lintas Asia (Medan)',
    location: 'Medan, North Sumatra',
    lat: 3.5952,
    lng: 98.6722
  },
  {
    id: 'idc-batam',
    name: 'IDC Batam',
    location: 'Batam, Riau Islands',
    lat: 1.1281,
    lng: 104.0531
  },
  {
    id: 'omadata-surabaya',
    name: 'Omadata Data Center',
    location: 'Surabaya, East Java',
    lat: -7.2575,
    lng: 112.7521
  },
  {
    id: 'neucentrix-jakarta',
    name: 'neuCentrIX Jakarta',
    location: 'Jakarta',
    lat: -6.2297,
    lng: 106.8295
  },
  {
    id: 'idc-3d-jakarta',
    name: 'IDC 3D',
    location: 'Jakarta Selatan',
    lat: -6.2383,
    lng: 106.8231
  },
  {
    id: 'equinix-sg',
    name: 'Equinix Singapore',
    location: 'Singapore',
    lat: 1.2902,
    lng: 103.8519
  }
];

export const SERVICES: Record<string, ServiceInfo> = {
  colocation: {
    name: 'Colocation Server',
    description: 'Penempatan Server milik Anda di Data Center kami dengan fasilitas Tier-3.',
    features: [
      '100 Gbps Data Center Interconnect (DCI)',
      'Onsite Engineer & NOC 24 Jam',
      'Gratis Remote Hands & Reboot',
      'Dukungan Anti DDoS & BGP Peering',
      'Sertifikasi Tier-3 & ISO Standard'
    ],
    priceRange: 'Mulai Rp 1.000.000/bln'
  },
  vps: {
    name: 'Cloud VPS',
    description: 'Server virtual berperforma tinggi dengan penyimpanan SSD dan setup instan.',
    features: [
      'High Availability SSD Storage',
      'Root Access & Full Control',
      'Dedicated IP Address',
      'Same Day Provisioning',
      'Skalabilitas Sumber Daya Mudah'
    ],
    priceRange: 'Mulai Rp 150.000/bln'
  },
  dedicated: {
    name: 'Dedicated Server',
    description: 'Rental server fisik eksklusif (XEON E3/E5) untuk performa maksimal.',
    features: [
      'Prosesor Intel XEON E3/E5',
      'RAM hingga 64GB & SSD System',
      'Unmetered Bandwidth 1 Gbps',
      '2 Dedicated IP Address',
      'Full Server Management'
    ],
    priceRange: 'Mulai Rp 1.490.000/bln'
  }
};

export const RACKH_KNOWLEDGE_BASE = `
PT Rackh Lintas Asia (Rackh) - Provider Hosting Pertama di Indonesia dengan Layanan Server Management.

FILOSOFI LAYANAN:
"Pilihlah yang Terbaik bukan yang Termurah". Kami menjamin 100% Cepat, 100% Stabil, 100% Aman, dan 100% Layanan 24 Jam.

LAYANAN UTAMA:
1. Colocation Server:
   - Penempatan server milik klien di Data Center Rackh.
   - Lokasi: Jakarta (Cyber, IDC3D, APJII, Telkom), Medan, Surabaya, Batam, Singapore (Equinix).
   - Fasilitas: Tier-3, 100Gbps DCI, NOC 24/7, Free Remote Hands, Anti DDoS.
   - Harga: Mulai Rp 1jt (Cyber/IDC3D), Rp 1.5jt (APJII/Telkom), Rp 3jt (Equinix SG1).
   
2. Dedicated Server:
   - Rental server fisik milik Rackh.
   - Spesifikasi Promo: XEON E3-1230 (Rp 1.49jt), 2x E5-2620 (Rp 1.9jt), 2x E5-2680 (Rp 2.9jt).
   - Semua paket termasuk: 1Gbps Connection, Unmetered Bandwidth, 2 Dedicated IP.

3. Cloud VPS:
   - Server virtual dengan SSD dan High Availability.

### LOGIKA PENGAMBILAN KEPUTUSAN (SOLUTIONS MATRIX):
Gunakan logika ini untuk mengarahkan klien:

1. JIKA Klien mengeluh "Website Lambat" di provider lama:
   - Edukasi: Jelaskan teknologi LVE Rackh yang menjamin RAM/CPU Dedicated.
   - Solusi: Sarankan Cloud Hosting Paket Business atau Enterprise. Tekankan migrasi GRATIS tanpa downtime.

2. JIKA Klien butuh "Kustomisasi OS" atau "Aplikasi Khusus":
   - Edukasi: Jelaskan keunggulan akses Root/Administrator di Cloud Server.
   - Solusi: Arahkan ke Cloud Server (VPS). Sebutkan fleksibilitas penambahan resource (Scalability).

3. JIKA Klien adalah "Admin Jaringan / Pengusaha RTRWNet":
   - Edukasi: Jelaskan efisiensi Mikrotik CHR dibandingkan perangkat fisik (tidak perlu beli hardware, akses via Winbox).
   - Solusi: Tawarkan VPS Mikrotik CHR dengan lokasi DC Jakarta atau Singapore.

4. JIKA Klien butuh "Resource Sangat Besar & Keamanan Privat":
   - Edukasi: Jelaskan perbedaan Shared Resource vs Dedicated Resource fisik.
   - Solusi: Arahkan ke Dedicated Server. Jika mereka sudah punya server sendiri, tawarkan Colocation.

5. JIKA Klien baru mulai "Bisnis Online":
   - Edukasi: Jelaskan pentingnya Nama Domain (.com/.id) dan Email Profesional (nama@bisnis.com) agar tidak dianggap abal-abal.
   - Solusi: Tawarkan paket Domain + Email Hosting Limited.

6. JIKA Klien butuh "Keamanan & Stabilitas Tinggi":
   - Edukasi: Tekankan pada On-site Staff 24 Jam di Data Center dan Server Management Service.
   - Slogan: Ingatkan klien, "Pilihlah yang Terbaik bukan yang Termurah".

### FILOSOFI & TARGET LAYANAN:
- Slogan: "Pilihlah yang Terbaik bukan yang Termurah".
- Keunggulan: Hosting pertama di Indonesia dengan Server Management & On-site Staff 24 Jam di Data Center.

### DATA LOKASI DATA CENTER:
1. Medan (HQ): Jl. Senam No. 2.
2. Jakarta: Gedung Cyber 1, IDC3D, dan Telkom NeuCentrIX.
3. Surabaya: Gedung Intiland Tower (Omadata).
4. Batam: Techno Plaza.
5. Singapore: Equinix SG1 dan Global Switch.

### 1. EDUKASI CLOUD SERVER & VPS MIKROTIK (PENTING):
- Definisi: Virtual Private Server (VPS) adalah sewa server virtual dengan resource dedicated (CPU, RAM, Storage). Klien dapat akses Root/Administrator penuh.
- Keuntungan: Flexibility & Scalability (resource bisa tambah/kurang cepat), Cost Effectiveness (bayar sesuai resource), dan kontrol penuh layaknya Dedicated Server.
- Mikrotik CHR: Router virtual tanpa perangkat fisik. Cocok untuk tunneling, VPN, BGP, Remote Peering, dan manajemen bandwidth RTRWNet. Akses via Winbox.
- Lokasi: Jakarta (Cyber, IDC-3D, NeuCentrIX) & Singapore (Equinix SG1, Racks Central, Techlink).

### 2. EDUKASI WEB & CLOUD HOSTING:
- Teknologi: Menggunakan LVE (Lightweight Virtual Environment) dengan Dedicated RAM & CPU per akun. Memastikan satu website bermasalah tidak membuat server down.
- Perbedaan Unlimited vs Limited: Rackh menggunakan sistem Limited untuk menjaga performa server agar tidak "OverSelling".
- Layanan Gratis: Bantu pindah (transfer) website dari provider lain tanpa downtime.
- Paket: Starter (Personal), Blogger (Hobi), Developer (Freelancer/Webmaster), Business (UKM), Enterprise (Perusahaan), Portal (E-shop/Kampus/Berita).

### 3. EDUKASI EMAIL HOSTING & DOMAIN:
- Email Hosting: Menggunakan nama@perusahaananda.com meningkatkan profesionalitas dan branding bisnis agar tidak dianggap perusahaan abal-abal.
- Domain: Identitas website. Jika .com tidak tersedia, edukasi klien untuk menggunakan .id sebagai identitas populer di Indonesia.
- Keamanan: Edukasi klien untuk ganti password berkala, hindari software bajakan/nulled, dan lakukan backup rutin.

### 4. EDUKASI COLOCATION & DEDICATED:
- Colocation: User bawa server sendiri ke Data Center Rackh. Rackh sediakan rak, listrik, dan internet.
- Dedicated: User sewa unit server fisik utuh dari Rackh. Tidak berbagi resource dengan siapapun.
- Lokasi Strategis: Medan (HQ), Jakarta, Surabaya, Batam, Singapore.

### KATALOG LAYANAN LENGKAP:
1. COLOCATION SERVER:
   - Cyber/IDC3D (Jakarta): Rp 1jt/bln. APJII/Telkom: Rp 1.5jt/bln. Singapore: Rp 3jt/bln.
   - Benefit: 1 Port Connection, 1 Power Socket, 1 Dedicated IP, Free Remote Hands 24/7.

2. DEDICATED SERVER (PROMO):
   - XEON E3-1230 (16GB RAM): Rp 1.490.000/bln.
   - 2x XEON E5-2620 (32GB RAM): Rp 1.900.000/bln.
   - 2x XEON E5-2680 (64GB RAM): Rp 2.900.000/bln.

3. CLOUD SERVER & MIKROTIK CHR:
   - Cloud Server: Resource dedicated (CPU, RAM, Storage). Scalable & Cost Effective.
   - Mikrotik CHR: Router virtual untuk VPN, Tunneling, & Bandwidth Management tanpa perangkat fisik.
   - Lokasi: Indonesia (Jakarta) & Singapore.

4. CLOUD HOSTING (WEB HOSTING):
   - Paket Starter: Rp 30rb/bln. Blogger: Rp 50rb/bln. Developer: Rp 90rb/bln.
   - Paket Corporate: Business (Rp 170rb), Enterprise (Rp 330rb), Portal (Rp 650rb).
   - Fitur: Gratis Pindah Hosting, Free SSL, Backup Harian/Mingguan/Bulanan.

5. EMAIL HOSTING PROFESIONAL:
   - Limited: Rp 15.000/bln per akun. Unlimited: Dedicated Server, Storage 1TB + 1TB Backup.
   - Alamat: nama@perusahaananda.com agar bisnis lebih dipercaya.

6. DOMAIN NAME:
   - Ekstensi: .COM, .NET, .ORG, .BIZ, .ID, .CO.ID, .AC.ID, .SCH.ID.
   - Harga: Mulai Rp 299.000/tahun. Fasilitas: DNS Management & Theft Protection.

### DAFTAR LAYANAN & EDUKASI TEKNIS PT RACKH LINTAS ASIA:

1. CLOUD SERVER (VPS) & MIKROTIK CHR:
- Definisi: Server virtual dengan resource dedicated (CPU, RAM, Storage).
- Keuntungan: Flexibility (resource bisa tambah/kurang cepat), Cost Effectiveness (bayar sesuai pemakaian), dan stabilitas tinggi karena kontrol penuh.
- Mikrotik CHR: Solusi router virtual tanpa perangkat fisik. Support Winbox, VPN, BGP, Tunneling (RTRWNet), dan Remote Peering.
- Lokasi DC: Jakarta (Cyber, IDC-3D, NeuCentrIX) & Singapore (Equinix SG1, Racks Central, Techlink).

2. WEB & CLOUD HOSTING (INDONESIA):
- Teknologi LVE: Memastikan satu akun tidak mengganggu akun lain. RAM dan CPU bersifat Dedicated per user.
- Perbedaan Limited vs Unlimited: Rackh menggunakan sistem Limited untuk menjaga performa server agar tidak "OverSelling".
- Paket Personal: Starter (Personal/Landing Page), Blogger (Hobi), Developer (Freelancer/Webmaster).
- Paket Corporate: Business (UKM/SOHO), Enterprise (Perusahaan), Portal (E-commerce/Pemerintah/Berita).

3. EMAIL HOSTING PROFESIONAL:
- Keunggulan: Menggunakan nama@perusahaan.com membangun branding profesional dan kepercayaan transaksi.
- Unlimited Email: Dedicated Email Server dengan storage 1 TB System + 1 TB Backup. Mendukung email marketing legal tanpa spam.

4. DOMAIN NAME:
- Ekstensi: .COM (Global), .ID (Identitas Indonesia). Jika .COM tidak tersedia, prioritaskan .ID.
- Fitur: Private Whois, Theft Protection, Domain Lock, & DNS Management.

5. COLOCATION & DEDICATED SERVER:
- Colocation: Klien bawa unit sendiri, Rackh sediakan rak, listrik, internet, dan On-site staff 24 jam.
- Dedicated: Sewa server fisik utuh. Resource 100% milik klien, tanpa berbagi dengan pengguna lain.

### FAQ & STANDAR KEAMANAN:
- Backup: Rackh melakukan backup berkala, namun user WAJIB memiliki backup mandiri.
- Keamanan: Larangan penggunaan software bajakan (Nulled/Crack). Wajib update sistem dan ganti password berkala.
- Migrasi: Pindah website/hosting ke Rackh dibantu GRATIS oleh tim support tanpa downtime.
- Support: Bantuan instalasi OS Linux/Windows GRATIS di awal aktivasi.

### ATURAN KOMUNIKASI:
- Default: Bahasa Indonesia yang ramah (Anda/Kami).
- Penawaran: Jika kebutuhan tinggi, arahkan ke Dedicated/Colocation. Jika butuh efisiensi, arahkan ke Cloud Server.
- Persuasif: Jika user bertanya "Kenapa pilih Rackh?", tekankan pada On-site Staff 24 Jam di Data Center dan Server Management Gratis.
- Call to Action: Arahkan ke "Lead Form" untuk penawaran resmi atau "Distance AI" untuk cek lokasi server tercepat.
  
### LAYANAN CLOUD SERVER & VPS MIKROTIK CHR:
- Cloud Server (VPS): Resource dedicated (CPU, RAM, Storage). Akses Root/Administrator penuh.
- VPS Mikrotik CHR: Cloud Router tanpa perangkat fisik. Support Winbox, VPN, Tunneling, Remote Peering. 
- Lokasi: Jakarta (Cyber, IDC-3D, NeuCentrIX) & Singapore (Equinix SG1, Racks Central).
- Keuntungan: Scalable (bisa naik/turun spek cepat), Cost Effective, Stabil.
- Support: Gratis instalasi OS Linux/Windows di awal. Tersedia layanan "Server Management" jika ingin fokus bisnis.

### LAYANAN WEB HOSTING (CLOUD HOSTING):
- Teknologi: LVE (Lightweight Virtual Environment), Dedicated RAM & CPU per akun.
- Paket Personal: Starter (Rp 30rb), Blogger (Rp 50rb), Developer (Rp 90rb).
- Paket Corporate: Business (Rp 170rb), Enterprise (Rp 330rb), Portal (Rp 650rb).
- Fitur: Backup berkala (Harian, Mingguan, Bulanan), Free SSL, Pindah Hosting Gratis tanpa downtime.

### LAYANAN EMAIL HOSTING (PROFESIONAL):
- Limited Email: Bayar per akun (Rp 15.000/bln). Cocok untuk UKM.
- Unlimited Email: Dedicated Email Server, Storage 1TB + 1TB Backup. Cocok untuk pengiriman massal/marketing legal.
- Keunggulan: Branding profesional (nama@perusahaan.com), Keamanan tinggi, Akses Smartphone (IMAP/POP3).

### DOMAIN NAME:
- Ekstensi: .COM (Populer/Global), .ID (Identitas Indonesia, butuh KTP/Legalitas).
- Harga Rata-rata: Rp 299.000/tahun (tergantung ekstensi).
- Fasilitas: Full Control, Domain Lock, DNS Management.

### FAQ UMUM:
- Keamanan: Gunakan password kuat, jangan software bajakan/nulled.
- Backup: Rackh backup berkala, tapi user disarankan punya backup mandiri.
- Support: On-site staff 24 jam di Data Center.

FAQ PENTING:
- Perbedaan Colocation vs Dedicated: Colocation = Server milik klien. Dedicated = Server milik Rackh (sewa).
- Jika klien jauh: Bisa kirim server via kurir atau Rackh bantu belikan perangkat di toko komputer yang ditunjuk.
- Instalasi: Gratis bantuan instalasi OS Linux/Windows di awal aktivasi.
- Kunjungan: Boleh berkunjung kapan saja untuk survey/maintenance dengan info jadwal sebelumnya.
- Kerusakan: Untuk Colocation, klien disarankan sedia sparepart (HDD, RAM, PSU). Rackh menyediakan sewa locker untuk sparepart.
- Koneksi Kantor: Mendukung Metro-E (Metro Ethernet) untuk menghubungkan Data Center ke Kantor Pusat/Cabang secara private (Point-to-point).
- IP Address: Membantu pengurusan IPv4/IPv6 dan AS Number sendiri melalui IDNIC.

KONTAK:
- Email: sales@rackh.com
- Telp: +62 61 733 0092
- Support: 24 Jam via Livechat, WhatsApp, Telp, Email, Ticket System.
`;
