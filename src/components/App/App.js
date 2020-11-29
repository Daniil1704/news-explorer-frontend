import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import SavedNews from '../SavedNews/SavedNews.js';
import EditPopupRegister from '../EditPopupRegister/EditPopupRegister.js';
import EditPopupLogin from '../EditPopupLogin/EditPopupLogin.js';
// import EditPopupInfo from '../EditPopupInfo/EditPopupInfo.js';EditPopupMenu
import EditPopupMenu from '../EditPopupMenu/EditPopupMenu.js';



function App() {

  const [isEditPopupLogin, setIsEditPopupLogin] = useState(false);
  const [isEditPopupRegister, setIsEditPopupRegister] = useState(false);
  const [isEditPopupInfo, setIsEditPopupInfo] = useState(false);
  const [isEditPopupMenu, setIsEditPopupMenu] = useState(false);

  function handleEditLoginClick() {
    setIsEditPopupLogin(true);
    setIsEditPopupMenu(false);
  }

  function handleEditRegisterClick() {
    setIsEditPopupRegister(true);
  }

  function handleAddInfoClick() {
    setIsEditPopupInfo(true);
  }
  function handleEditMenuClick() {
    setIsEditPopupMenu(true);

  }

  function closeAllPopups() {
    if (isEditPopupMenu) {
      setIsEditPopupMenu(false);

    }
    if (isEditPopupLogin) {
      setIsEditPopupLogin(false);

    }
    if (isEditPopupRegister) {
      setIsEditPopupRegister(false);

    }
    if (isEditPopupInfo) {
      setIsEditPopupInfo(false);
    }
  }

  function replacementPopup() {

    if (isEditPopupLogin) {
      handleEditRegisterClick();
      closeAllPopups();
    }
    else if (isEditPopupRegister) {
      handleEditLoginClick();
      closeAllPopups();
    }

  }

  React.useEffect(() => {

    function handleEscClose(event) {
      if (event.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeOverlay(event) {
      if (event.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeOverlay);
    }
  });
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <div className="bg">
            <Header
              isOpen={isEditPopupMenu}
              onClose={closeAllPopups}
              handleEditMenuClick={handleEditMenuClick}
              handleEditLoginClick={handleEditLoginClick}

            >

            </Header>
            <SearchForm>

            </SearchForm>
          </div>
          <Main />
        </Route>
        <Route path="/saved-news">
          <Header>

          </Header>
          <SavedNewsHeader>

          </SavedNewsHeader>
          <SavedNews>

          </SavedNews>
        </Route>
      </Switch>
      <Footer>

      </Footer>
      <section className="popups">
        <EditPopupRegister
          isOpen={isEditPopupRegister}
          onClose={closeAllPopups}
          replacementPopup={replacementPopup}
        >

        </EditPopupRegister>
        <EditPopupLogin
          isOpen={isEditPopupLogin}
          onClose={closeAllPopups}
          replacementPopup={replacementPopup}
        >

        </EditPopupLogin>
        <EditPopupMenu
          isOpen={isEditPopupMenu}
          handleEditMenuClick={handleEditMenuClick}
          onClose={closeAllPopups}
          handleEditLoginClick={handleEditLoginClick}

        >

        </EditPopupMenu>
        {/* <EditPopupInfo
       
        >

        </EditPopupInfo> */}
      </section>
    </div>
  );
}

export default App;
