import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';
import Сard from '../../utils/data/card.js';

function NewsCardList() {

    return (
        <section className="news-card-list">
            <h2 className="news-card-list__title">Результаты поиска</h2>
            <div className="news-card-list__container">
                {
                    Сard.map((article, key) => (
                        <NewsCard article={article} key={key} />
                    ))
                }
            </div>
            <button className="news-card-list__button">Показать еще</button>
        </section>
    )
}

export default NewsCardList;