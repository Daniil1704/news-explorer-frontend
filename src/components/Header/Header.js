import React from 'react';
import './Header.css'
import { useLocation, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js'
import logout from '../../images/logout-dark.png'

function Header(props) {

    const { pathname } = useLocation();
    const blackLogo = `${pathname === '/saved-news' ? 'header__logo_dark' : 'header__logo'
        }`;
    const blackBurger = `${pathname === '/saved-news' ? 'header__burger_dark' : 'header__burger'
        }`;
    const blackButton = `${pathname === '/saved-news' ? 'header__button_dark-active' : 'header__button_dark'
        }`;
    const whiteButton = `${pathname === '/saved-news' ? 'header__button-active' : 'header__button'
        }`;
    return (
        <header className="header">
            <Link to="/" className={`header__logo ${blackLogo}`}>NewsExplorer</Link>
            <button type="button" onClick={props.handleEditMenuClick} className={`header__burger ${blackBurger}`} ></button>
            <div className="header__container">
                <Navigation>

                </Navigation>


                <button type="button" onClick={props.handleEditLoginClick} className={`header__button ${whiteButton}`}>Авторизация</button>
                <Link className="header__button_dark-link" to="/">
                    <button type="button" className={`header__button_dark ${blackButton}`}>
                        Грета
                    <img className="header__button_dark-img" src={logout} />

                    </button>
                </Link>
            </div>

        </header>
    )
}

export default Header;