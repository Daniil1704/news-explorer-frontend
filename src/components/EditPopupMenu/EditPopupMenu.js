import React from 'react'
import './EditPopupMenu.css';
import { useLocation, Link, NavLink } from 'react-router-dom';
import logout from '../../images/logout.png'

function EditPopupMenu(props) {
    const { pathname } = useLocation();


    const savedNewsButton = `${pathname === '/saved-news' ? 'header__mobile_button-dark-active' : 'header__mobile_button-dark'
        }`;
    const whiteButton = `${pathname === '/saved-news' ? 'header__mobile_button-active' : 'header__mobile_button'
        }`;
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
                                <NavLink className={`navigation__mobile_link `} to="/saved-news">Сохраненные статьи</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="header__mobile_position">
                        <button type="button" onClick={props.handleEditLoginClick} className={`header__mobile_button ${whiteButton}`}>Авторизация</button>
                        <Link className="header__mobile_button-dark-link" to="/">
                            <button type="button" className={`header__mobile_button-dark ${savedNewsButton}`}>
                                Грета
                    <img className="header__mobile_button-dark-img" src={logout} />

                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditPopupMenu;