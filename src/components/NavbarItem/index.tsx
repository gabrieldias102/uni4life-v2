import { NavLink } from "react-router-dom";

type NavbarItemProps = {
  children: React.ReactNode;
  text: string;
  to: string;
};

export default function NavbarItem({ text, children, to }: NavbarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row items-center gap-2 p-3 hover:text-primary hover:bg-soft rounded-4xl cursor-pointer m-3 ${
          isActive ? "text-primary bg-soft" : ""
        }`
      }
    >
      {children}
      <p> {text} </p>
    </NavLink>
  );
}
