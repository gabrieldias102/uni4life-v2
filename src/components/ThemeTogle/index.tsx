import { useTheme } from "../../contexts/ThemeContext";
import { CgDarkMode } from "react-icons/cg";

interface ThemeToggleProps {
  onlySwitch?: boolean;
}

export function ThemeToggle({ onlySwitch = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  if (onlySwitch) {
    return (
      <button
        onClick={toggleTheme}
        title="Alternar Tema"
        className="flex items-center w-16 h-8 p-1 rounded-full bg-ink border border-black/10 dark:border-white/10 cursor-pointer transition-colors duration-300 shadow-lg"
      >
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-full bg-surface shadow-md border border-black/5 dark:border-white/5 transform transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
          }`}
        >
          <span className="text-[10px]">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </div>
      </button>
    );
  }

  return (
    <div 
      onClick={toggleTheme} 
      className="flex cursor-pointer min-w-0 items-center justify-between gap-2 rounded-2xl px-4 py-3 text-sm transition hover:bg-soft hover:text-primary lg:mx-1 lg:rounded-full"
    >
      <div className="flex sm:hidden items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
        <CgDarkMode/>
        <span>
          {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
        </span>  
      </div>

      <div
        title="Alternar Tema"
        className="flex items-center w-16 h-8 p-1 rounded-full bg-ink border border-black/10 dark:border-white/10 transition-colors duration-300 shadow-lg"
      >
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-full bg-surface shadow-md border border-black/5 dark:border-white/5 transform transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
          }`}
        >
          <span className="text-[10px]">{theme === 'dark' ? '🌙' : '☀️'}</span>
        </div>
      </div>
    </div>
  );
}