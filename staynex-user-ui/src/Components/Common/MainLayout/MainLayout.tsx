import { Outlet } from 'react-router-dom'
import './MainLayout.scss'
import Header from '../Header/Header'
import FooterWallet from '../Footer/Footer'
import Footer from '../FooterR/Footer'
import { useSelector } from 'react-redux'

const MainLayout = () => {
  const isLogin = useSelector((state: any) => state.user.walletAddress)

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
