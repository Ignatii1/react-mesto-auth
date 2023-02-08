function Login() {
  return (
    <div className="auth">
      <form className="form auth__container" noValidate>
        <div className="auth__forms">
          <h2 className="auth__title">ВХОД</h2>
          <input
            className="auth__input auth__email"
            type="email"
            placeholder="Email"
          ></input>
          <input
            className="auth__input auth__password"
            type="password"
            placeholder="Пароль"
          ></input>
        </div>
        <button className="auth__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login
