'use client'

import { useTheme } from 'next-themes'
import Footer from './footer'
import Header from './header'

function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      {theme === 'dark'
        ? (
            <></>
          )
        : (
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
              <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
            </div>
          )}
      <Header />
      <main className="mt-16">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
