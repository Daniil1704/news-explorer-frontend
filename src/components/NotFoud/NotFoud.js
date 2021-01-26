import React from 'react';
import './NotFoud.css';
import notFoundImg from '../../images/not-found.png';

function NotFound(props) {

    return (
        <section className={`not-found ${props.isOpen ? 'not-found_active' : ''}`}>
            <img className="not-found__image" src={notFoundImg} alt="Не найдено"></img>
            <h3 className="not-found__title">Ничего не найдено</h3>
            <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
        </section>
    )
}

export default NotFound;