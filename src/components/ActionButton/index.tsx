import { Link } from "react-router-dom";

type ActionButtonProps = {
  text: string;
  icon: React.ReactNode;
  color: "primary" | "white" | "transparent";
  url?: string;
};

const colorClasses = {
  primary: "border-primary bg-primary text-white",
  white: "border-gray-200 bg-white text-gray-700",
  transparent: "border-gray-200 bg-transparent text-gray-700",
};

export default function ActionButton({
  text,
  icon,
  color,
  url,
}: ActionButtonProps) {
  const className = `flex cursor-pointer items-center justify-center gap-2 rounded-2xl border p-2 ${colorClasses[color]}`;

  if (url) {
    return (
      <Link to={url} className={className}>
        {icon}
        {text}
      </Link>
    );
  }

  return (
    <button className={className}>
      {icon}
      {text}
    </button>
  );
}
