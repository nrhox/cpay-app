import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import BRAND from "../../assets/CPay_Logo.svg";
import GITHUB_LOGO from "../../assets/GitHub_Logo.svg";
import GOOGLE_LOGO from "../../assets/Goggle_Logo.svg";
import AlertError from "../../components/allert/AlertError";
import Loading from "../../components/general/loading";
import Card from "../../components/ui/Card";
import { ParseErrorKey } from "../../constants/ErrorKey";
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
  const [param] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const errMsg = param.get("error");

  return (
    <main className="bg-background grid min-h-screen place-items-center px-4">
      <Card className="w-full max-w-md">
        <img src={BRAND} className="h-14" alt="cpay" />
        <p className="paragraph text-primary mt-1 mb-2">
          Masuk ke digital wallet dan banking workspace Anda.{" "}
          <Link
            to="/legal"
            className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
          >
            Lihat Kebijakan & Ketentuan
          </Link>
        </p>
        {errMsg && errMsg !== "" && (
          <AlertError message={ParseErrorKey(errMsg)} />
        )}
        {!loading ? (
          <div className="mt-2">
            <p className="paragraph text-primary mb-2">Masuk dengan</p>
            <div className="space-y-2">
              {listProviders.map((provider) => (
                <a
                  onClick={() => {
                    param.set("error", "");
                    setLoading(true);
                  }}
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
        ) : (
          <Loading />
        )}
      </Card>
    </main>
  );
}
