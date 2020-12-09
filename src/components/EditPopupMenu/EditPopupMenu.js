import React from 'react'
import './EditPopupMenu.css';
import { useLocation, Link, NavLink } from 'react-router-dom';
import logout from '../../images/logout.png'
import { CurrentUserContext } from '../../utils/context/CurrentUserContex.js';

function EditPopupMenu(props) {
    const { pathname } = useLocation();

    const currentUser = React.useContext(CurrentUserContext);

    const savedNewsButton = `${pathname === '/saved-news' ? 'header__mobile_button-dark-active' : 'header__mobile_button-dark'
        }`;
    const whiteButton = `${pathname === '/saved-news' ? 'header__mobile_button-active' : 'header__mobile_button'
        }`;
    const textButton = `${props.loggedIn ? `${currentUser.name}` : `Авторизоваться`}`;
    return (

        <div className={` popup__mobile ${props.isOpen && 'popup__mobile_opened'}`}>
            <div className="header__mobile_container">
                <div className="header__mobile">
                    <Link to="/" className={`header__mobile_logo`}>NewsExplorer</Link>
                    <button type="button" onClick={props.onClose} className="popup__mobile_close"></button>
                </div>
                <div className="header__mobile_menu">
                    <nav className="navigation__mobile">
                        <ul className="navigation__mobile_links">
                            <li className="navigation__mobile_links-line">
                                <NavLink className={`navigation__mobile_link `} exact to="/">Главная</NavLink>
                            </li>
                            <li className="navigation__mobile_links-line">
                                <NavLink className={`${props.loggedIn ? `navigation__mobile_link` : 'navigation__mobile_link-disable'}`} to="/saved-news">Сохраненные статьи</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__mobile_position">
                        <button type="button" onClick={props.loggedIn ? props.exitAuth : props.handleEditLoginClick} className={`header__mobile_button ${whiteButton}`}>{textButton}
                            {props.loggedIn && <img className="navigation__image-exit" src={logout} alt="Кнопка выхода"></img>}
                        </button>

                        <button onClick={props.exitAuth} type="button" className={`header__mobile_button-dark ${savedNewsButton}`}>
                            {textButton}
                            <img className="header__mobile_button-dark-img" src={logout} alt="Кнопка выхода" />

                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditPopupMenu;