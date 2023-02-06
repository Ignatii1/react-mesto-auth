import React from 'react'
import logo from '../images/logo.svg'

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__logo">
        <img src={logo} alt="Логотип Место" className="header__logo-img" />
      </a>
    </header>
  )
}

export default Header
