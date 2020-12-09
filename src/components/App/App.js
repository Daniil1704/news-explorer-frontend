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
import EditPopupInfo from '../EditPopupInfo/EditPopupInfo.js';
import { searchNewsApi } from '../../utils/NewsApi';
import EditPopupMenu from '../EditPopupMenu/EditPopupMenu.js';
import Preloader from '../Preloader/Preloader.js';
import NotFoud from '../NotFoud/NotFoud.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
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
  const [arrayArticles, setArrayArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [lengthArticles, setLengthArticles] = useState(0);
  const [activeFlag, setActiveFlag] = useState(false);
  const [textErrorForm, setTextErrorForm] = useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditNotFound, setIsEditNotFound] = useState(false);
  const [isEditPopupLogin, setIsEditPopupLogin] = useState(false);
  const [isEditPopupRegister, setIsEditPopupRegister] = useState(false);
  const [isEditPopupInfo, setIsEditPopupInfo] = useState(false);
  const [isEditPopupMenu, setIsEditPopupMenu] = useState(false);
  const [isEditPreloader, setIsEditPreloader] = useState(false);
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
  React.useEffect(() => {
    getToken();
  }, [loggedIn]);
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
  function login(email, password) {
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

  function exitAuth() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setArticles([]);
    setLoggedIn(false);
    history.push('/');
  }
  // ___________________________________________________________________________________________________________________________________

  // ________________________________________________________Карточки________________________________________________________________
  React.useEffect(() => {
    setKeyword(localStorage.getItem('keyword'));
  }, [keyword]);

  function getSaveArticles() {
    getMyArticles()
      .then((res) => {
        if (res) {
          setArrayArticles(res);
          setLengthArticles(res.length);
          setKeyword(res.keyword)
        } else {
          setArrayArticles([]);
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

  function deleteArrArticle(article) {
    deleteArticle(article)
      .then((data) => {
        const myArticleArr = arrayArticles.filter((i) => (i._id !== article._id));
        setArrayArticles(myArticleArr);
        setLengthArticles(myArticleArr.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function searchNewsClick(keyword) {

    setIsEditPreloader(true)

    setArticles([]);
    localStorage.removeItem('articles');
    localStorage.removeItem('keyword');
    setIsEditNotFound(false);


    searchNewsApi(keyword)
      .then((data) => {

        localStorage.setItem('articles', JSON.stringify(data.articles));
        localStorage.setItem('keyword', keyword);

        setArticles(data.articles);
        setKeyword(keyword);

        if (data.articles.length === 0) {
          setIsEditNotFound(true)
        }
      })
      .catch((err) => {
        console.log(err.status);
        setIsEditNotFound(true);
      })
      .finally(() => setIsEditPreloader(false));
  }
  // ___________________________________________________________________________________________________________________________________

  // ________________________________________________________Попапы________________________________________________________________
  function handleEditLoginClick() {
    setIsEditPopupLogin(true);
    setIsEditPopupMenu(false);
    setIsEditPopupInfo(false);
  }

  function handleEditRegisterClick() {
    setIsEditPopupRegister(true);


  }

  function handleAddInfoClick() {
    setIsEditPopupInfo(false);

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
      cleaningForm()
    }
    if (isEditPopupRegister) {
      setIsEditPopupRegister(false);
      cleaningForm()

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

  function handleValid(e) {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  }
  function cleaningForm() {
    setValues({});
    setIsValid(false);
    setError({});
  }
  function updateArrArticles(article, keyword, arrayArticle) {

    const myArrayArticle = arrayArticles.find((i) => {

      if (arrayArticle) {
        return i.title === arrayArticle.title && i.text === arrayArticle.text;
      }
      if (article) {
        return i.title === article.title && i.text === article.description;
      }

    });

    if (myArrayArticle) {
      deleteArrArticle(myArrayArticle);
    } else {
      saveArticle(article, keyword);
    }
  }

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
                isEditPopupLogin={isEditPopupLogin}
                isEditPopupRegister={isEditPopupRegister}
                loggedIn={loggedIn}
                exitAuth={exitAuth}


              >

              </Header>
              <SearchForm
                EditSearchNews={searchNewsClick}
              >

              </SearchForm>
            </div>
            <Preloader
              isOpen={isEditPreloader}
            >
            </Preloader>
            <NotFoud
              isOpen={isEditNotFound}
            >
            </NotFoud>
            <Main
              articles={articles}
              saveArticles={arrayArticles}
              keyword={keyword}
              loggedIn={loggedIn}
              setActiveFlag={setActiveFlag}
              activeFlag={activeFlag}
              updateArrArticles={updateArrArticles}
              handleEditRegisterClick={handleEditRegisterClick}
            >
            </Main>
          </Route>

          <Route path="/saved-news">
            <Header
              isOpen={isEditPopupMenu}
              onClose={closeAllPopups}
              handleEditMenuClick={handleEditMenuClick}
              handleEditLoginClick={handleEditLoginClick}
              isEditPopupLogin={isEditPopupLogin}
              isEditPopupRegister={isEditPopupRegister}
              loggedIn={loggedIn}
              exitAuth={exitAuth}
            >

            </Header>
            <SavedNewsHeader
              arrayArticles={arrayArticles}
              lengthArticles={lengthArticles}
            >

            </SavedNewsHeader>
            <ProtectedRoute path="/saved-news"
              loggedIn={loggedIn}
              component={SavedNews}

              handleEditMenuClick={handleEditMenuClick}
              exitAuth={exitAuth}
              arrayArticles={arrayArticles}
              updateArrArticles={updateArrArticles}
            >
            </ProtectedRoute>


          </Route>
        </Switch>
        <Footer>

        </Footer>
        <section className="popups">
          <EditPopupRegister
            isOpen={isEditPopupRegister}
            onClose={closeAllPopups}
            replacementPopup={replacementPopup}
            registerUser={registerUser}
            error={error}
            values={values}
            handleValid={handleValid}
            isValid={isValid}
          >

          </EditPopupRegister>
          <EditPopupLogin
            isOpen={isEditPopupLogin}
            onClose={closeAllPopups}
            replacementPopup={replacementPopup}
            login={login}
            error={error}
            values={values}
            handleValid={handleValid}
            isValid={isValid}
          >

          </EditPopupLogin>
          <EditPopupMenu
            isOpen={isEditPopupMenu}
            handleEditMenuClick={handleEditMenuClick}
            onClose={closeAllPopups}
            handleEditLoginClick={handleEditLoginClick}
            loggedIn={loggedIn}
            exitAuth={exitAuth}
          >

          </EditPopupMenu>
          <EditPopupInfo
            isOpen={isEditPopupInfo}
            onClose={closeAllPopups}
            handleEditLoginClick={handleEditLoginClick}
            isEditPopupLogin={isEditPopupLogin}

          >

          </EditPopupInfo>
        </section>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
