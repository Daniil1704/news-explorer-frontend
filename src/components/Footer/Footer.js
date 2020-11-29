import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import github from '../../images/git.png';
import facebook from '../../images/facebook.png';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>
            <div className="footer__container">
                <div className="footer__links">
                    <Link className="footer__link" to="/">Главная</Link>
                    <a className="footer__link" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                </div>
                <div className="footer__icons">
                    <a className="footer__icon" href="https://github.com/Daniil1704" target="_blank" rel="noreferrer"><img className="footer__icon-img" src={github} alt="GitHub"></img></a>
                    <a className="footer__icon" href="https://ru-ru.facebook.com/" target="_blank" rel="noreferrer"><img className="footer__icon-img" src={facebook} alt="Facebook"></img></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;