const messageMap: Record<string, string> = {
  err_oauth_unsupport: "Metode login tidak didukung.",
  err_oauth_invalid_state:
    "Validasi keamanan gagal atau sesi habis. Silakan login kembali.",
  err_oauthh_empty_auth_code: "Kode login tidak ditemukan. Silakan coba lagi.",
  err_oauth_auth_process_failed:
    "Gagal memproses login. Silakan coba lagi nanti.",
  err_oauth_email_not_verify:
    "Email belum diverifikasi. Pastikan akun Anda aktif.",
  err_in_complate_user_register: "anda belum melengkapi formulir",
  err_github_api: "terjadi kesalahan saat masuk menggunakan github",

  err_oauth_google_limit_or_cancel:
    "Akses ditolak atau kuota Google aplikasi ini habis. Silakan gunakan akun GitHub.",
  err_oauth_google_bad_request:
    "Terjadi kesalahan sistem pada login Google. Silakan coba lagi nanti.",
  err_oauth_google_invalid_scope:
    "Izin akses Google tidak valid. Silakan hubungi pengembang.",
  err_oauth_google_unsupported_type:
    "Metode login Google tidak didukung. Silakan hubungi pengembang.",
  err_oauth_google_server_down:
    "Server Google sedang gangguan. Silakan coba lagi atau gunakan GitHub.",
  err_oauth_google_retry_later:
    "Layanan Google sedang sibuk. Silakan coba sesaat lagi atau gunakan GitHub.",
  err_oauth_google_code_expired_or_used:
    "Sesi login Google kedaluwarsa. Silakan klik tombol login kembali.",
  err_oauth_google_wrong_client_credentials:
    "Kesalahan konfigurasi internal Google. Silakan gunakan GitHub.",
  err_oauth_google_callback_url_mismatch:
    "Rute pengalihan Google tidak cocok. Silakan hubungi pengembang.",

  err_oauth_github_user_cancelled:
    "Anda membatalkan proses login menggunakan akun GitHub.",
  err_oauth_github_suspended:
    "Aplikasi ditangguhkan sementara oleh GitHub. Silakan hubungi pengembang.",
  err_oauth_github_callback_url_mismatch:
    "Rute pengalihan GitHub tidak cocok. Silakan hubungi pengembang.",
  err_oauth_github_bad_request:
    "Terjadi kesalahan sistem pada login GitHub. Silakan coba lagi nanti.",
  err_oauth_github_invalid_scope:
    "Izin akses GitHub tidak valid. Silakan hubungi pengembang.",
};

export function ParseErrorKey(key: string): string {
  const errMsg = messageMap[key] || undefined;
  if (errMsg) {
    return errMsg;
  }

  return messageMap["err_oauth_auth_process_failed"] || "coba lagi nanti.";
}
