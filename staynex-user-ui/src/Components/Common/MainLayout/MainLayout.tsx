import { Outlet, useLocation } from 'react-router-dom'
import './MainLayout.scss'
import Header from '../Header/Header'
import FooterWallet from '../Footer/Footer'
import Footer from '../FooterR/Footer'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const MainLayout = () => {
  const isLogin = useSelector((state: any) => state.user.walletAddress)
  const location=useLocation()
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [location.key]);
  return (
    <>
      <Header />
      <div className="main_Layout">
        <Outlet />
      </div>
      {isLogin ? <FooterWallet /> : <Footer />}
    </>
  )
}

export default MainLayout
