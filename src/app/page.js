import Image from 'next/image'
import LoginPage from './pages/loginPage.js'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage/>
    </main>
  )
}
