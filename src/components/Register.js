import { useState } from 'react'

function Register(props) {
  const { onSubmit } = props
  const [inputs, setInputs] = useState([])

  function handleChange(e) {
    const { name, value } = e.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(inputs.email, inputs.password)
  }
  return (
    <div className="auth">
      <form className="form auth__container" onSubmit={handleSubmit} noValidate>
        <div className="auth__forms">
          <h2 className="auth__title">Регистрация</h2>
          <input
            className="auth__input auth__email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            className="auth__input auth__password"
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={handleChange}
          ></input>
        </div>
        <button className="auth__submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <a href="/sign-in" className="auth__login-link">
        Уже зарегистрированы? Войти
      </a>
    </div>
  )
}

export default Register
