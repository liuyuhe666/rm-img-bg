import Footer from './footer'
import Header from './header'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col justify-between min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
