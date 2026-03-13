import NavbarItem from "../NavbarItem";
import { FaHouse, FaAddressBook } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsBoxArrowDown } from "react-icons/bs";

export default function Navbar() {
  return (
    <>
      <nav className="bg-white border-b text-gray-500 flex justify-around w-screen">
        <div className="p-4">
          <p className="font-bold text-xl text-primary">Uni4Life</p>
        </div>
        <section className="flex flex-row gap-4">
          <NavbarItem text="Feed">
            <FaHouse />
          </NavbarItem>
          <NavbarItem text="Conexões">
            <FaAddressBook />
          </NavbarItem>
          <NavbarItem text="Publicar">
            <IoMdAddCircleOutline />
          </NavbarItem>
          <NavbarItem text="Perfil">
            <CgProfile />
          </NavbarItem>
        </section>
        <div className="p-4 flex flex-row gap-2 items-center">
          <div>
            <p className="text-sm text-black">Nome</p>
          </div>

          <BsBoxArrowDown size={20} className="rotate-270" />
        </div>
      </nav>
    </>
  );
}
