import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: "#", text: "Create", type: "bordered" },
  { href: "#", text: "Explore", type: "bordered" },
  { href: "/connect", text: "Connect" }
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggle = (status) => {
    status ?
      document.querySelector("body").classList.add("fix") :
      document.querySelector("body").classList.remove("fix");
    setMenuOpen(status);
  }
  return (
    <header className={`header ${menuOpen ? "header--open" : ""}`}>
      <div className="container">
        <Link href="/">
          <a className="header__logo" onClick={() => menuToggle(false)}>
            <img src="/Logo.svg" alt="logo"/>
          </a>
        </Link>
        <input value={menuOpen} checked={menuOpen} type="checkbox" id="burger" className="header__burger" onChange={(e) => menuToggle(e.target.checked)} />
        <label htmlFor="burger" className="header__burger-label"></label>
        <ul className="header__menu">
          {
            links.map(({ href, text, type }) => (
              <li className="header__menu-item" key={text}>
                <Link href={href}>
                  <a className={`header__menu-link ${type ? `header__menu-link--${type}` : ''}`} onClick={() => menuToggle(false)}>
                    {text}
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </header>
  )
}

export default Header;
