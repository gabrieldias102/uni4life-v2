import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaAddressBook, FaHouse } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAuth } from "../../contexts/useAuth";
import NavbarItem from "../NavbarItem";
import { ThemeToggle } from "../ThemeTogle";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const displayName = user?.displayName?.trim() || user?.email || "Usuario";
  const avatarSeed = encodeURIComponent(displayName);
  const emailLabel = user?.email || "Sessao ativa";

  async function handleLogout() {
    setIsMobileMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-20 border-b border-black/5 bg-cards/95 text-text-tertiary backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/feed" className="min-w-0" onClick={closeMobileMenu}>
            <div className="flex min-w-0 items-center">
              <p className="text-xl font-bold text-primary sm:text-2xl">
                Uni4Life
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 text-gray-700 transition hover:border-primary hover:text-primary lg:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <section className="hidden min-w-0 flex-1 justify-center lg:flex">
          <NavbarItem text="Feed" to="/feed">
            <FaHouse />
          </NavbarItem>
          <NavbarItem text="Conexões" to="/conections">
            <FaAddressBook />
          </NavbarItem>
          <NavbarItem text="Publicar" to="/publish">
            <IoMdAddCircleOutline />
          </NavbarItem>
          <NavbarItem text="Perfil" to="/profile">
            <CgProfile />
          </NavbarItem>
        </section>

        <div className="hidden items-center gap-3 lg:flex">
          <img
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div className="min-w-0 max-w-52">
            <p className="truncate text-sm font-semibold text-text-primary">
              {displayName}
            </p>
            <p className="truncate text-xs text-text-tertiary">{emailLabel}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-g transition hover:border-primary hover:text-primary"
          >
            Sair
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div
            id="mobile-navigation-menu"
            className="overflow-hidden rounded-3xl border border-[#f1dfd6] bg-navbar shadow-sm lg:hidden"
          >
            <div className="flex items-center gap-3 border-b border-[#f1dfd6] px-4 py-4">
              <img
                src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`}
                alt="Avatar"
                className="h-11 w-11 rounded-full"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {displayName}
                </p>
                <p className="truncate text-xs text-text-tertiary">{emailLabel}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <div onClick={closeMobileMenu}>
                <NavbarItem text="Feed" to="/feed">
                  <FaHouse />
                </NavbarItem>
              </div>
              <div onClick={closeMobileMenu}>
                <NavbarItem text="Conexões" to="/conections">
                  <FaAddressBook />
                </NavbarItem>
              </div>
              <div onClick={closeMobileMenu}>
                <NavbarItem text="Publicar" to="/publish">
                  <IoMdAddCircleOutline />
                </NavbarItem>
              </div>
              <div onClick={closeMobileMenu}>
                <NavbarItem text="Perfil" to="/profile">
                  <CgProfile />
                </NavbarItem>
              </div>
              <div>
                <ThemeToggle/>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 rounded-2xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
              >
                Sair
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
