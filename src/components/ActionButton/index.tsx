import { Link } from "react-router-dom";

type ActionButtonProps = {
  text: string;
  icon: React.ReactNode;
  color: "primary" | "white" | "transparent";
  url?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
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
  onClick,
  disabled = false,
  type = "button",
}: ActionButtonProps) {
  const className = `flex items-center justify-center gap-2 rounded-2xl border p-2 transition ${
    disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
  } ${colorClasses[color]}`;

  if (url) {
    return (
      <Link
        to={url}
        className={disabled ? `${className} pointer-events-none` : className}
      >
        {icon}
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
}
