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
        `mx-1 flex min-w-0 flex-row items-center gap-2 rounded-4xl p-3 hover:bg-soft hover:text-primary ${
          isActive ? "text-primary bg-soft" : ""
        }`
      }
    >
      {children}
      <p className="truncate">{text}</p>
    </NavLink>
  );
}
