import { useTheme } from 'next-themes';
import nightwind from 'nightwind/helper';
import SunIcon from '../../public/svg/SunIcon';

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    nightwind.beforeTransition()
    if (theme !== 'dark') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return <button onClick={toggle} type="button" aria-label='Toggle Theme'><SunIcon /></button>
}