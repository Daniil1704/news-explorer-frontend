import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader.js';
import { CurrentUserContext } from '../../utils/context/CurrentUserContex.js';
import {
  register,
  authorize,
  getInfo,
  getMyArticles,
  buildArticle,
  deleteArticle
} from '../../utils/MainApi.js';



function App() {
  const history = useHistory();
  const [currentUser, setCurrenUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [myArticles, setMyArticles] = useState([]);
  const [lengthMyArticles, setLengthMyArticles] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [activeFlag, setActiveFlag] = useState(false);
  const [textErrorForm, setTextErrorForm] = useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  // const [textErrorForm, setTextErrorForm] = useState('');
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isEditPopupLogin, setIsEditPopupLogin] = useState(false);
  const [isEditPopupRegister, setIsEditPopupRegister] = useState(false);
  const [isEditPopupInfo, setIsEditPopupInfo] = useState(false);
  const [isEditPopupMenu, setIsEditPopupMenu] = useState(false);
  // ________________________________________________________Токен________________________________________________________________

  function getToken() {

    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      setLoggedIn(true)
      history.push('/')
      getSaveArticles();
      setCurrenUser(JSON.parse(localStorage.getItem('user')));
      setArticles(JSON.parse(localStorage.getItem('articles')));
    }
  }
  // ___________________________________________________________________________________________________________________________________


  // ________________________________________________________Регистрация________________________________________________________________

  function registerUser(email, password, name) {
    setIsLoading(true);
    register(email, password, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setIsEditPopupInfo(true);
          history.push('/');
        }
      })
      .catch((err) => {
        setTextErrorForm(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ___________________________________________________________________________________________________________________________________
  // ________________________________________________________Авторизация________________________________________________________________
  function authorizationLogin(email, password) {
    setIsLoading(true);
    authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);

        if (res) {
          getInfo(res.token)
            .then((data) => {
              localStorage.setItem('user', JSON.stringify(data));
              setCurrenUser(data);
              setLoggedIn(true)
              closeAllPopups();
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        setError(false)
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  // ___________________________________________________________________________________________________________________________________

  // ________________________________________________________Открытие попапов________________________________________________________________
  function getSaveArticles() {
    getMyArticles()
      .then((res) => {
        if (res) {
          setMyArticles(res);
          setLengthMyArticles(res.length);
          setKeyword(res.keyword)
        } else {
          setMyArticles([]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function saveArticle(article, keyword) {
    if (loggedIn) {
      buildArticle(article, keyword)
        .then((data) => {
          if (data) {

            getSaveArticles();
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  function deleteArticle(article) {
    deleteArticle(article)
      .then((data) => {
        const myArticleArray = myArticles.filter((i) => (i._id !== article._id));
        setMyArticles(myArticleArray);
        setLengthMyArticles(myArticleArray.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  // ___________________________________________________________________________________________________________________________________

  // ________________________________________________________Открытие попапов________________________________________________________________
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
  // ___________________________________________________________________________________________________________________________________
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <div className="bg">
              <Header
                isOpen={isEditPopupMenu}
                onClose={closeAllPopups}
                handleEditMenuClick={handleEditMenuClick}
                handleEditLoginClick={handleEditLoginClick}
                loggedIn={loggedIn}

              >

              </Header>
              <SearchForm

              >

              </SearchForm>
            </div>
            <Preloader

            >
            </Preloader>
            {/* <NotFoud
              isOpen={isEditNotFound}
              searchError={searchError}
            >
            </NotFoud> */}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
