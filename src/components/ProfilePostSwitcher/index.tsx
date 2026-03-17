import { useState } from "react";

type PostView = "published" | "republished";

export default function ProfilePostSwitcher() {
  const [activeView, setActiveView] = useState<PostView>("published");

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl bg-white rounded-2xl p-4">
      <div className="grid grid-cols-2 rounded-2xl bg-gray-100 p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveView("published")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            activeView === "published"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Publicados
        </button>

        <button
          type="button"
          onClick={() => setActiveView("republished")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            activeView === "republished"
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
