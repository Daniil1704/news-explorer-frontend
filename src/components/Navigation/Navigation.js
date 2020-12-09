import React from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import './Navigation.css'


function Navigation(props) {
    const { pathname } = useLocation();
    const blackNav = `${pathname === '/saved-news' ? 'navigation__link_dark' : 'navigation__link'}`;

    return (
        <nav className="navigation">
            <ul className="navigation__links">
                <li className="navigation__links-line">
                    <NavLink activeClassName="navigation__link_active" className={`navigation__link ${blackNav}`} exact to="/">Главная</NavLink>
                </li>
                <li className="navigation__links-line">
                    <NavLink activeClassName="navigation__link_active-dark" className={`${props.loggedIn ? `navigation__link ${blackNav}` : 'navigation__link_disable'}`} to="/saved-news">Сохраненные статьи</NavLink>

                </li>
            </ul>
        </nav>
    )
}

export default Navigation;