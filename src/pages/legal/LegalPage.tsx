import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router";
import { ContactInfo, LegalData } from "../../constants/legal";

export default function LegalPage() {
  const navigate = useNavigate();
  const tableOfContent = LegalData.map((v) => ({ id: v.id, title: v.title }));

  return (
    <main className="bg-neutral-bg min-h-screen py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="px-4 sm:px-0">
          <button
            onClick={() => navigate(-1)}
            className="text-neutral-text mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
        </div>

        <article className="border-neutral-muted bg-neutral-surface space-y-8 border-y px-4 py-8 sm:rounded-lg sm:border sm:p-12">
          <header className="border-neutral-muted text-neutral-text border-b pb-5">
            <h1 className="heading">Kebijakan & Ketentuan Layanan</h1>
            <p className="paragraph mt-3">
              Dokumen resmi Kebijakan Privasi dan Ketentuan Layanan CPay Bank.
              Sebagai platform simulasi transaksi keuangan fiktif, dokumen ini
              mengatur batasan layanan dan perlindungan data uji coba Anda.
            </p>
            <div className="subheading mt-6 flex flex-col font-medium sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-1.5">
                <span>Diperbarui: 13 Juni 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Status: Simulasi (Uang Mainan)</span>
              </div>
            </div>
          </header>

          <nav className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <span className="subheading">Lompat ke bagian:</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {tableOfContent.map((heading, i) => (
                <a
                  href={"#" + heading.id}
                  key={i}
                  className="subheading text-primary hover:underline"
                >
                  {i + 1}. {heading.title}
                </a>
              ))}
            </div>
          </nav>

          {LegalData.map((section, i) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-6 space-y-8"
            >
              <div className="border-neutral-muted text-neutral-text border-b pb-4">
                <h2 className="subheading">
                  {i + 1}. {section.title}
                </h2>
                {section.description && (
                  <p className="paragraph text-neutral-text mt-2">
                    {section.description}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                {section.contents.map((content, i) => (
                  <div key={i} className="group">
                    <div className="space-y-2">
                      <h3 className="subheading">{content.title}</h3>
                      <ul className="space-y-1.5 pl-2">
                        {content.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="paragraph text-neutral-text flex items-start gap-2"
                          >
                            <span className="bg-neutral-text mt-2 inline-block h-1 w-1 shrink-0 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section id="contact" className="border-neutral-muted border-t pt-4">
            <div className="text-neutral-text pb-2">
              <h2 className="subheading">Kontak</h2>
              <p className="paragraph text-neutral-text mt-2">
                Pertanyaan seputar kebijakan privasi dan permintaan penghapusan
                akun dapat diajukan via
              </p>
            </div>

            <div className="space-y-6">
              <ul className="space-y-1.5 pl-2">
                {ContactInfo.map((contact, idx) => (
                  <li
                    key={idx}
                    className="paragraph text-neutral-text flex items-start gap-2"
                  >
                    <span className="bg-neutral-text mt-2 inline-block h-1 w-1 shrink-0 rounded-full" />
                    {contact.platform}:{" "}
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:underline"
                    >
                      @{contact.username}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <footer className="border-neutral-muted border-t pt-8">
            <div className="flex gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <Info className="mt-0.5 shrink-0 text-amber-600" size={20} />
              <div className="space-y-1">
                <h4 className="subheading text-amber-900">
                  Pernyataan Batasan Tanggung Jawab (Disclaimer)
                </h4>
                <p className="paragraph indent-6 text-amber-800">
                  Aplikasi CPay Bank adalah simulasi murni. Semua transaksi,
                  top-up, saldo, dan data finansial di dalamnya bersifat virtual
                  dan mainan demi edukasi dan pengetesan sistem. Data OAuth Anda
                  dilindungi secara penuh dan hanya digunakan untuk
                  mengidentifikasi sesi di dalam aplikasi.
                </p>
              </div>
            </div>
          </footer>
        </article>

        <div className="text-neutral-text mt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} CPay Bank.</p>
        </div>
      </div>
    </main>
  );
}
