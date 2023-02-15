import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ProtectedRoutes from './ProtectedRoutes'
import InfoTooltip from './InfoTooltip'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then((res) => {
        const [profileInfo, cardsArray] = res
        setCards(cardsArray)
        setCurrentUser(profileInfo)
      })
      .catch(console.log)
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch(console.log)
  }

  function handleDeleteClick(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  function handleUpdateUser(newUserInfo) {
    api
      .updateProfile(newUserInfo)
      .then(setCurrentUser)
      .catch(console.log)
      .finally(closeAllPopups)
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateAvatar(avatarLink)
      .then(setCurrentUser)
      .catch(console.log)
      .finally(closeAllPopups)
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .postCard(cardData)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(console.log)
      .finally(closeAllPopups)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Routes>
          <Route exact path="/" element={<ProtectedRoutes loggedIn={false} />}>
            <Route
              exact
              path="/"
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                />
              }
            />
          </Route>

          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          name="infoTooltip"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={Object.keys(selectedCard).length !== 0}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={true}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
