import React, { useState } from 'react'
import './NewsCard.css';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

    const {
        saveArticles,
        loggedIn,
    } = props;
    const [activeFlag, setActiveFlag] = useState(false);
    const { pathname } = useLocation();
    const keywordActive = `${pathname === '/saved-news' ? 'news-card__keyword_active' : 'news-card__keyword'}`;
    const deleteButton = `${pathname === '/saved-news' ? 'news-card__button_delete' : 'news-card__button'}`;
    const button = `${pathname === '/saved-news' ? 'news-card__button_delete' : `${loggedIn && activeFlag ? 'news-card__button news-card__button_saved' : 'news-card__button news-card__button_no-saved'}`}`;


    function buttonClick() {
        props.updateArrArticles(props.article, props.keyword, props.article);
    }
    React.useEffect(() => {

        if (loggedIn === true) {

            if (saveArticles) {
                setActiveFlag(
                    saveArticles.find((i) => i.title === props.title) !== undefined
                );
            }
        }
    }, [saveArticles, props.title, activeFlag, loggedIn])
    function nowDate(date) {

        const dateForm = new Date(date);

        const monthRoster = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];

        const year = dateForm.getFullYear();
        const month = dateForm.getMonth();
        const monthReall = monthRoster[month];
        const days = dateForm.getDate();
        const nowDate = `${days} ${monthReall}, ${year}`;
        return nowDate;
    }
    return (
        <article className="news-card">
            <p className={`news-card__keyword ${keywordActive}`}>{props.keyword}</p>
            {loggedIn ? (<button onClick={buttonClick} className={`news-card__button ${deleteButton} ${button}`}></button>) : <button onClick={props.handleEditRegisterClick} className="news-card__button news-card__button_no-saved"></button>}
            <img onError={(e) => { e.target.src = " https://neuronsk.ru/upload/medialibrary/771/771dad7444a2937b6085360951e048b1.png "; }} className="news-card__image" src={props.image ? props.image : "https://neuronsk.ru/upload/medialibrary/771/771dad7444a2937b6085360951e048b1.png"} alt={props.title}></img>
            <a className="news-card__link" href={props.link} target="_blank" rel="noreferrer">
                <p className="news-card__date">{nowDate(props.date)}</p>
                <h2 className="news-card__title">{props.title}</h2>
                <p className="news-card__about">{props.text}</p>
                <p className="news-card__resours">{props.source || props.source.name}</p>
            </a>
        </article>
    )
}

export default NewsCard;