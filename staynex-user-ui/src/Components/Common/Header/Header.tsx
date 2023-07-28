import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import headerLogo from "../../../Assets/Images/logo.svg";
import { Container, Dropdown, Form, Nav, Navbar } from "react-bootstrap";
import CommonButton from "../CommonButton/CommonButton";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import { useState } from "react";
const injected = injectedModule();
const modules = [injected];


const Header = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
  const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`;
  const RINKEBY_RPC_URL = `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`;
  const [walletDetails, setWalletDetails] = useState<any>([]);

  const onboard = Onboard({
    wallets: modules, // created in previous step
    chains: [
      {
        id: "0x1", // chain ID must be in hexadecimel
        token: "ETH",
        namespace: "evm",
        label: "Ethereum Mainnet",
        rpcUrl: MAINNET_RPC_URL,
      },
      {
        id: "0x3",
        token: "tROP",
        namespace: "evm",
        label: "Ethereum Ropsten Testnet",
        rpcUrl: ROPSTEN_RPC_URL,
      },
      {
        id: "0x4",
        token: "rETH",
        namespace: "evm",
        label: "Ethereum Rinkeby Testnet",
        rpcUrl: RINKEBY_RPC_URL,
      },
    ],
    appMetadata: {
      name: "My App",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      description: "My app using Onboard",
      recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" },
      ],
    },
  });
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

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      setWalletDetails(wallets);
      dispatch(walletDetails(wallets))
    } catch (error) {
    }
  };

  const disconnectWallet = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    setWalletDetails([])
  };
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
              {walletDetails && walletDetails.length ? (
                <CommonButton
                  title={"Disconnect wallet"}
                  onClick={disconnectWallet}
                />
              ) : (
                <CommonButton
                  title={"Connect wallet"}
                  onClick={connectWallet}
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
  );
};

export default Header;
