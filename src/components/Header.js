import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import logo from '../images/logo.svg'

function Header(props) {
  const { loggedIn, onSignOut, email } = props
  return (
    <header className="header">
      <a href="#" className="header__logo">
        <img src={logo} alt="Логотип Место" className="header__logo-img" />
      </a>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__logout-container">
              <p className="header__email">{email}</p>
              <button
                className="header__button-exit"
                onClick={onSignOut}
                type="button"
              >
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  )
}

export default Header
