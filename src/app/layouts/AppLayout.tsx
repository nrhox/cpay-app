import clsx from "clsx";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import BRAND from "../../assets/CPay_Logo.svg";
import Button from "../../components/ui/Button";
import { adminNavigation, userNavigation } from "../../constants/navigation";
import { selectCurrentUser, useAuthStore } from "../../stores/auth.store";

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentUser = useAuthStore(selectCurrentUser);
  const navigation = location.pathname.startsWith("/admin")
    ? adminNavigation
    : userNavigation;

  return (
    <div className="bg-neutral-bg h-full w-full">
      <div className="bg-neutral-bg relative mx-auto min-h-screen max-w-7xl">
        <header className="border-neutral-muted bg-neutral-surface sticky top-0 z-40 border-b md:hidden">
          <div className="mx-auto flex items-center justify-between px-4 pt-2 pb-3">
            <Link to={currentUser?.role === 2 ? "/admin" : "/dashboard"}>
              <img src={BRAND} className="h-10" alt="cpay" />
            </Link>
            <Button
              type="button"
              variant="ghost"
              className="md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </Button>
          </div>
        </header>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-[248px_1fr]">
          <aside
            className={clsx(
              "border-neutral-muted md:bg-neutral-bg bg-neutral-surface border-b p-3 md:sticky md:top-0 md:block md:h-screen md:border-none",
              open ? "block" : "hidden",
            )}
          >
            <div className="mb-5 hidden md:block">
              <Link to={currentUser?.role === 2 ? "/admin" : "/dashboard"}>
                <img src={BRAND} className="h-10" alt="cpay" />
              </Link>
            </div>
            <div className="bg-primary-soft mb-4 rounded-lg p-3">
              <p className="text-neutral-text text-sm font-bold">
                {currentUser?.full_name}
              </p>
              <p className="caption text-neutral-text">{currentUser?.email}</p>
            </div>
            <nav className="grid gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/admin"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold",
                      isActive
                        ? "bg-primary text-primary-contrast"
                        : "text-neutral-text hover:bg-primary-soft hover:text-neutral-text",
                    )
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <main className="min-w-0 px-4 py-5 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
