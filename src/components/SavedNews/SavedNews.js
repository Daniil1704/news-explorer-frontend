import React from 'react';
import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard.js';
import savedCard from '../../utils/data/savedCard.js';

function SavedNews() {
    return (
        <section className="saved-news">
            <div className="news-card-list__container">
                {
                    savedCard.map((article, key) => (
                        <NewsCard article={article} key={key} />
                    ))
                }
            </div>
        </section>
    )
}

export default SavedNews;