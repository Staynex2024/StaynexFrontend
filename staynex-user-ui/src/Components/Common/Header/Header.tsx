import './Header.scss'
import { Link, NavLink } from 'react-router-dom'
// import { useDispatch } from "react-redux";
// import { Dispatch } from "redux";
import headerLogo from "../../../Assets/Images/logo.svg";
import { Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import { useConnectWallet, init } from "@web3-onboard/react";
import CommonButton from "../CommonButton/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { walletAddress, walletDetails } from "../../../Redux/Slices/user.slice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callApiPostMethod } from "../../../Redux/Actions/api.action";
import { APIURL } from "../../../Utils";

const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";
const injected = injectedModule();
const infuraKey = "b9002ae31947492c96e3ff7fc63116b2";
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// initialize Onboard
// eslint-disable-next-line no-undef
init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl,
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org',
    },
  ],
})

const Header = () => {
  const dispatch: any = useDispatch();
  const navigate: any = useNavigate();
  const address = useSelector((state: any) => state?.user?.walletAddress);
  const [{ wallet, connecting }, connect, disconnect]: any = useConnectWallet();

  let ethersProvider: any;

  useEffect(() => {
    handleWalletConnect();
  }, [wallet]);

  const handleWalletConnect = async () => {
    if (wallet) {
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      ethersProvider.getSigner().signMessage("hello");
      dispatch(walletAddress(wallet.accounts[0].address));



      // const addressToSend = wallet?.accounts?.[0].address;
      // const result = await callApiPostMethod(
      //   APIURL?.CUSTOMER_LOGIN,
      //   addressToSend,
      //   {},
      //   false
      // );
    }
  };
  const countrylist = [
    {
      name: 'India',
    },
    {
      name: 'USA',
    },
    {
      name: 'UK',
    },
  ]

  useEffect(() => {
    const handleWalletConnect = async () => {
      const addressToSend = address;
      const result = await dispatch(callApiPostMethod(APIURL?.CUSTOMER_LOGIN, { walletAddress: addressToSend }, {}, false))
      if (result?.data === true) {
        navigate("/auth/profile-pass")
      }

    }
    if (address !== '') {
      handleWalletConnect();
    }
  }, [address]);

  return (
    <>
      <header className="site_header sticky-top">
        <Navbar expand="xl" className="">
          <Container>
            <div className="site_header_search d-flex align-items-center">
              <Link to="/">
                <img src={headerLogo} alt="Logo" />
              </Link>
              <Form.Control type="text" placeholder="Anywhere" />
            </div>
            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav className="">
                <NavLink className="nav-link" to="/about-us">
                  StaynexPass
                </NavLink>
                <NavLink className="nav-link" to="/club">
                  StaynexClub
                </NavLink>
                <NavLink className="nav-link" to="/global-partner">
                  Global partners
                </NavLink>
                <NavLink className="nav-link" to="/list-property">
                  List your property
                </NavLink>
              </Nav>
            </Navbar.Collapse>
            <div className="d-flex justify-content-between justify-content-md-end align-items-center">
              <Dropdown className="country_Dropdown mx-1 mx-sm-4">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  MYR
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {countrylist.map((data, i) => {
                    return (
                      <Dropdown.Item key={i} href="#">
                        <span>{data.name}</span>
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* <CommonButton title="Connect Wallet" /> */}

              {address ? (
                <CommonButton
                  title={"Disconnect"}
                  // disabled={connecting}
                  onClick={() => {
                    wallet && disconnect(wallet);
                    dispatch(walletAddress(""));
                  }}
                />
              ) : (
                <CommonButton
                  title={connecting ? "Connecting" : "Connect wallet"}
                  disabled={connecting}
                  onClick={() => connect()}
                />
              )}

              <Navbar.Toggle
                className="ms-3"
                aria-controls="basic-navbar-nav"
              />
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  )
}

export default Header
