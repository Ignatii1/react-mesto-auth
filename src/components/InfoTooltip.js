import successImage from '../images/success.svg'
import failImage from '../images/fail.svg'

function InfoTooltip(props) {
  const { isOpen, onClose, isSuccess, name } = props
  const title = `${
    isSuccess
      ? 'Вы успешно зарегистрированы'
      : 'Что-то пошло не так! Попробуйте ещё раз.'
  }`
  const image = `${isSuccess ? successImage : failImage}`
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__content popup__container">
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt="" src={image} />
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip
