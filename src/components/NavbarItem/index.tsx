type NavbarItemProps = {
  children: React.ReactNode;
  text: string;
};

export default function NavbarItem({ text, children }: NavbarItemProps) {
  return (
    <div className="flex flex-row items-center gap-2 p-2 hover:text-primary hover:bg-soft rounded-2xl cursor-pointer bg-red m-2">
      {children}
      <p> {text} </p>
    </div>
  );
}
