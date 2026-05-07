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
        `flex min-w-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-soft hover:text-primary lg:mx-1 lg:rounded-full ${
          isActive ? "text-primary bg-soft" : ""
        }`
      }
    >
      {children}
      <p className="truncate">{text}</p>
    </NavLink>
  );
}
