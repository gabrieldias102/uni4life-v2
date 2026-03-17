import NavbarItem from "../NavbarItem";
import { FaAddressBook, FaHouse } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.displayName?.trim() || user?.email || "Usuario";
  const avatarSeed = encodeURIComponent(displayName);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <nav className="px-32 flex w-full items-center justify-around border-b bg-white  text-gray-500">
      <div className="flex min-w-0 items-center py-4">
        <p className="text-xl font-bold text-primary">Uni4Life</p>
      </div>

      <section className="flex min-w-0 flex-1 justify-center">
        <NavbarItem text="Feed" to="/feed">
          <FaHouse />
        </NavbarItem>
        <NavbarItem text="Conexoes" to="/conections">
          <FaAddressBook />
        </NavbarItem>
        <NavbarItem text="Publicar" to="/publish">
          <IoMdAddCircleOutline />
        </NavbarItem>
        <NavbarItem text="Perfil" to="/profile">
          <CgProfile />
        </NavbarItem>
      </section>

      <div className="flex items-center gap-3">
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}`}
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-black">
            {displayName}
          </p>
          <p className="truncate text-xs text-gray-500">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-primary hover:text-primary"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
