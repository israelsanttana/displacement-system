import Image from 'next/image'
import styles from './page.module.css'
import MiniDrawer from './components/sidebar'

export default function Home() {
  return (
    <main>
      <MiniDrawer />
    </main>
  )
}
