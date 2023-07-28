import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import headerLogo from "../../../Assets/Images/logo.svg";
import { Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import CommonButton from "../CommonButton/CommonButton";
import { WEB3_ONBOARDING_API_KEY } from "../../../Constant";
import { init, useConnectWallet } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { walletAddress, walletDetails } from "../../../Redux/Slices/user.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const injected = injectedModule();

const infuraKey = "<INFURA_KEY>";
const apiKey = WEB3_ONBOARDING_API_KEY;
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// const wcV2InitOptions = {
//     /**
//      * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
//      */
//     projectId: 'abc123...',
//     /**
//      * Chains required to be supported by all wallets connecting to your DApp
//      */
//     requiredChains: [1, 56],
//     /**
//      * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
//      * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
//      * To connect with WalletConnect
//      */
//     dappUrl: 'http://localhost:3000/'
//   }
// const walletConnect = walletConnectModule(wcV2InitOptions)

// initialize Onboard
init({
  apiKey,
  wallets: [injected],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl,
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Polygon",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
    {
      id: "0x381931",
      token: "METAL",
      label: "Metal C-Chain",
      rpcUrl: "https://api.metalblockchain.org/ext/bc/C/rpc",
    },
  ],
});
const Header = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state?.user?.walletAddress);

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  let ethersProvider: any;

  useEffect(() => {
    dispatch(walletAddress({}));
  }, [disconnect]);

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
    dispatch(walletAddress(ethersProvider.provider.selectedAddress));
    // dispatch(walletDetails(wallet))
  }
  const countrylist = [
    {
      name: "India",
    },
    {
      name: "USA",
    },
    {
      name: "UK",
    },
  ];

  return (
    <>
      <header className="site_header sticky-top">
        <Navbar expand="xl" className="">
          <Container>
            <div className="site_header_search d-flex align-items-center">
              <Link to="/">
                <img src={headerLogo} alt="Logo" />
              </Link>
              <Form.Control type="text" placeholder="Search" />
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
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              {/* <CommonButton title="Connect Wallet" /> */}
              <CommonButton
                disabled={connecting}
                onClick={() =>
                  window?.ethereum?.isMetaMask
                    ? wallet
                      ? disconnect(wallet)
                      : connect()
                    : (window.location.href = "https://metamask.io/download/")
                }
                title={
                  connecting
                    ? "Connecting..."
                    : wallet 
                    ? "Disconnect wallet"
                    : "Connect Wallet"
                }
              />
              <Navbar.Toggle
                className="ms-3"
                aria-controls="basic-navbar-nav"
              />
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
