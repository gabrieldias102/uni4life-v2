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
    <div className="w-full rounded-2xl bg-cards p-3 shadow-sm sm:mt-8 sm:p-4">
      <div className="grid grid-cols-2 rounded-2xl bg-highlight p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onChange("published")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            value === "published"
              ? "bg-cards text-primary shadow-sm"
              : "text-text-tertiary hover:text-gray-200"
          }`}
        >
          Publicados
        </button>

        <button
          type="button"
          onClick={() => onChange("republished")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            value === "republished"
              ? "bg-cards text-primary shadow-sm"
              : "text-text-tertiary hover:text-gray-200"
          }`}
        >
          Republicados
        </button>
      </div>
    </div>
  );
}
