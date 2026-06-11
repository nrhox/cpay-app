import BRAND from "../../assets/CPay_Logo.svg";
import GITHUB_LOGO from "../../assets/GitHub_Logo.svg";
import GOOGLE_LOGO from "../../assets/Goggle_Logo.svg";
import Card from "../../components/ui/Card";
import { BASE_URL_BACKEND } from "../../utils/axios";

type tProvider = {
  label: string;
  name: string;
  brandLogo: string;
};

const listProviders: tProvider[] = [
  {
    brandLogo: GITHUB_LOGO,
    label: "Github",
    name: "github",
  },
  {
    brandLogo: GOOGLE_LOGO,
    label: "Google",
    name: "google",
  },
];

export default function LoginPage() {
  return (
    <main className="bg-background grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <img src={BRAND} className="h-14" alt="cpay" />
        <p className="paragraph text-primary mt-1">
          Masuk ke digital wallet dan banking workspace Anda.
        </p>
        <div className="mt-4">
          <p className="paragraph text-primary mb-2">Masuk dengan</p>
          <div className="space-y-2">
            {listProviders.map((provider) => (
              <a
                key={provider.name}
                href={`${BASE_URL_BACKEND}/api/auth/${provider.name}`}
                className="border-light-gray bg-surface flex items-center rounded-lg border px-3 py-2 text-base shadow-sm select-none hover:bg-gray-100 active:bg-gray-200"
              >
                <img
                  src={provider.brandLogo}
                  alt={provider.name + " logo"}
                  className="mr-4 h-8"
                />
                {provider.label}
              </a>
            ))}
          </div>
        </div>
      </Card>
    </main>
  );
}
