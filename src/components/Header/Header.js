import React from 'react';
import './Header.css'
import { useLocation, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js'
import logout from '../../images/logout-dark.png'
import logoutWhite from '../../images/logout.png'
import { CurrentUserContext } from '../../utils/context/CurrentUserContex.js';

function Header(props) {

    const { pathname } = useLocation();
    const currentUser = React.useContext(CurrentUserContext);
    const blackLogo = `${pathname === '/saved-news' ? 'header__logo_dark' : 'header__logo'
        }`;
    const blackBurger = `${pathname === '/saved-news' ? 'header__burger_dark' : 'header__burger'
        }`;
    const blackButton = `${pathname === '/saved-news' ? 'header__button_dark-active' : 'header__button_dark'
        }`;
    const whiteButton = `${pathname === '/saved-news' ? 'header__button-active' : 'header__button'
        }`;
    const textButton = `${props.loggedIn ? `${currentUser.name}` : `Авторизоваться`}`;


    return (
        <header className="header">
            <Link to="/" className={`header__logo ${blackLogo}`}>NewsExplorer</Link>
            <button type="button" onClick={props.handleEditMenuClick} className={`header__burger ${blackBurger}`} ></button>
            <div className="header__container">
                <Navigation
                    loggedIn={props.loggedIn}
                >

                </Navigation>


                <button onClick={props.loggedIn ? props.exitAuth : props.handleEditLoginClick} type="button" className={`header__button ${whiteButton}`}>{textButton}
                    {props.loggedIn && <img className="header__button_white-img" src={logoutWhite} alt="Кнопка выхода" />}
                </button>

                <button onClick={props.exitAuth} type="button" className={`header__button_dark ${blackButton}`}>
                    {textButton}
                    <img className="header__button_dark-img" src={logout} alt="Кнопка выхода" />

                </button>

            </div>

        </header>
    )
}

export default Header;