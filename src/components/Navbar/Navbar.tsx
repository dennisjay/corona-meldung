import React, { useState } from "react"
import { Link } from "gatsby"
import { IoIosSearch, IoIosClose } from "react-icons/io"
import { DrawerProvider } from "../Drawer/DrawerContext"
import Menu from "./Menu"
import MobileMenu from "./MobileMenu"
import SearchContainer from "../../containers/SearchContainer/SearchContainer"
import HeaderWrapper, {
  NavbarWrapper,
  Logo,
  MenuWrapper,
  NavSearchButton,
  NavSearchWrapper,
  SearchCloseButton,
  NavSearchFromWrapper,
} from "./Navbar.style"
import LogoImage from "../../images/logo.png"
import Button from "../Button/Button";

type NavbarProps = {
  className?: string
}

const MenuItems = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Mehr Erfahren",
    url: "/idea",
  },
  {
    label: "Team",
    url: "/about",
  },
  // {
  //   label: "Kontakt",
  //   url: "/contact",
  // }
  //   label: "404 Page",
  //   url: "/404",
  // },
]

const Navbar: React.FunctionComponent<NavbarProps> = ({
  className,
  ...props
}) => {
  const [state, setState] = useState({
    toggle: false,
    search: "",
  })

  const toggleHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    })
  }

  // Add all classs to an array
  const addAllClasses = ["header"]

  // className prop checking
  if (className) {
    addAllClasses.push(className)
  }

  return (
    <HeaderWrapper className={addAllClasses.join(" ")} {...props}>
      <NavbarWrapper className="navbar">
        <DrawerProvider>
          <MobileMenu items={MenuItems} logo={LogoImage} />
        </DrawerProvider>
        <Logo>
          <Link to="/">
            <img src={LogoImage} alt="logo"/>
          </Link>
        </Logo>
        <MenuWrapper>
          <Menu items={MenuItems} />
        </MenuWrapper>
        <a href={'/fragebogen'}><Button title="Jetzt Daten spenden" href={'/fragebogen'} /></a>
      </NavbarWrapper>

    </HeaderWrapper>
  )
}

export default Navbar
