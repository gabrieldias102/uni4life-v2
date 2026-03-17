export type ProfilePostView = "published" | "republished";

type ProfilePostSwitcherProps = {
  value: ProfilePostView;
  onChange: (view: ProfilePostView) => void;
};

export default function ProfilePostSwitcher({
  value,
  onChange,
}: ProfilePostSwitcherProps) {
  return (
    <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-white p-4">
      <div className="grid grid-cols-2 rounded-2xl bg-gray-100 p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onChange("published")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            value === "published"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Publicados
        </button>

        <button
          type="button"
          onClick={() => onChange("republished")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            value === "republished"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Republicados
        </button>
      </div>
    </div>
  );
}
