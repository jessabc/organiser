import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react'

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

  return (
    <div className="">
      <Switch
        checked={theme === "light"}
        onChange={toggleTheme}
        className={`${theme === "light" ? 'bg-indigo-600' : 'bg-indigo-200'}
          relative inline-flex h-6 w-11 items-center shrink-0 cursor-pointer rounded-full  border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${theme === "light" ? 'translate-x-6' : 'translate-x-1'}
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
