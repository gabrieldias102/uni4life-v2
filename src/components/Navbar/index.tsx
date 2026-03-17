import NavbarItem from "../NavbarItem";
import { FaAddressBook, FaHouse } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsBoxArrowDown } from "react-icons/bs";

export default function Navbar() {
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

      <div className="flex items-center gap-2">
        <img
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=John Doe"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <p className="text-sm text-black font-semibold">Nome Teste</p>
        <BsBoxArrowDown size={20} className="rotate-270" />
      </div>
    </nav>
  );
}
