interface IContent {
  title: string;
  items: string[];
}

interface ISection {
  title: string;
  id: string;
  description?: string;
  contents: IContent[];
}

export const LegalData: ISection[] = [
  {
    id: "PrivacyPolicy",
    title: "Kebijakan Privasi",
    description:
      "Kebijakan privasi ini menjelaskan bagaimana CPay Bank mengumpulkan, menggunakan, dan melindungi informasi Anda dalam platform simulasi ini.",
    contents: [
      {
        title: "Informasi yang Kami Kumpulkan",
        items: [
          "ID Pengguna (Provider ID dari Google/GitHub)",
          "Alamat Email",
          "Nama Lengkap / Nama Pengguna",
          "Foto Profil",
        ],
      },
      {
        title: "Penggunaan Informasi",
        items: [
          "Mengidentifikasi akun secara unik di sistem CPay Bank",
          "Memisahkan data simulasi transaksi antar pengguna agar tidak saling bercampur",
          "Data bersifat privat dan sama sekali tidak dibagikan ke pihak ketiga",
        ],
      },
      {
        title: "Data Simulasi Transaksi",
        items: [
          "Semua data keuangan, saldo, mutasi, transfer, dan pembayaran di dalam CPay Bank adalah simulasi murni (uang mainan)",
          "Hanya ditujukan untuk keperluan edukasi, pembelajaran, dan uji coba fitur",
        ],
      },
      {
        title: "Penghapusan Data",
        items: [
          "Pengguna berhak mengajukan permohonan penghapusan akun secara penuh kapan saja",
          "Penghapusan akun mencakup penghapusan riwayat transaksi simulasi secara permanen dari basis data",
        ],
      },
      {
        title: "Kontak Kami",
        items: [
          "Pertanyaan seputar kebijakan privasi dan permintaan penghapusan akun dapat diajukan via DM Instagram: @jl.nc18",
        ],
      },
    ],
  },
  {
    id: "TermsOfService",
    title: "Ketentuan Layanan",
    description:
      "Ketentuan layanan ini mengatur penggunaan Anda terhadap platform simulasi CPay Bank.",
    contents: [
      {
        title: "Penerimaan Ketentuan",
        items: [
          "Dengan mengakses atau menggunakan CPay Bank, Anda setuju untuk terikat dengan Ketentuan Layanan ini",
        ],
      },
      {
        title: "Deskripsi Layanan",
        items: [
          "Platform simulasi transaksi keuangan fiktif untuk media pembelajaran mandiri",
          "Tidak memproses uang asli dalam bentuk apa pun dan tidak memungut biaya apa pun (gratis)",
          "Seluruh fitur transaksi bersifat simulasi/fiktif murni",
        ],
      },
      {
        title: "Batasan Tanggung Jawab",
        items: [
          "Layanan disediakan 'apa adanya' (as-is) tanpa jaminan ketersediaan data permanen",
          "Pengembang tidak bertanggung jawab atas hilangnya data riwayat simulasi",
          "Pengembang tidak bertanggung jawab atas penyalahgunaan persepsi saldo oleh pihak ketiga di luar aplikasi",
        ],
      },
      {
        title: "Larangan Penggunaan",
        items: [
          "Dilarang menggunakan platform untuk tindakan penipuan (mengelabui pihak lain menggunakan visual saldo simulasi)",
          "Dilarang merusak, memanipulasi, atau mengeksploitasi celah keamanan sistem backend CPay Bank",
        ],
      },
      {
        title: "Perubahan Ketentuan",
        items: [
          "Ketentuan Layanan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya",
          "Perubahan dilakukan demi kepatuhan terhadap kebijakan integrasi Google dan GitHub OAuth",
        ],
      },
    ],
  },
];

interface IContant {
  platform: string;
  url: string;
  username: string;
}

export const ContactInfo: IContant[] = [
  {
    platform: "Instagram",
    username: "jl.nc18",
    url: "https://www.instagram.com/jl.nc18/",
  },
];
