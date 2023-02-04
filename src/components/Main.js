import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'

function Main(props) {
  const {
    onEditProfile,
    onAddCard,
    onEditAvatar,
    handleCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img
            src={`${currentUser.avatar}`}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__name-container">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Edit"
            onClick={onEditProfile}
          ></button>
        </div>
        <p className="profile__description">{currentUser.about}</p>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add"
          onClick={onAddCard}
        ></button>
      </section>

      <section className="photo-grid">
        {cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main
