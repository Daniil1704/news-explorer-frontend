import React from 'react'
import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {
    const { pathname } = useLocation();
    const keywordActive = `${pathname === '/saved-news' ? 'news-card__keyword_active' : 'news-card__keyword'}`;
    const deleteButton = `${pathname === '/saved-news' ? 'news-card__button_delete' : 'news-card__button'}`;
    return (
        <article className="news-card">
            <p className={`news-card__keyword ${keywordActive}`}>{props.article.keyword}</p>
            <button className={`news-card__button ${deleteButton}`}></button>
            <img className="news-card__image" src={props.article.image} alt="картинка"></img>
            <a className="news-card__link" href={props.article.link} target="_blank" rel="noreferrer">
                <p className="news-card__date">{props.article.date}</p>
                <h2 className="news-card__title">{props.article.title}</h2>
                <p className="news-card__about">{props.article.about}</p>
                <p className="news-card__resours">{props.article.source}</p>
            </a>
        </article>
    )
}

export default NewsCard;