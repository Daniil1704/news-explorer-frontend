import React from 'react';
import './SavedNews.css';
import NewsCard from '../NewsCard/NewsCard.js';

function SavedNews(props) {
    return (
        props.arrayArticles.length > 0
            ?
            <section className="saved-news">

                <div className="news-card-list__container">
                    {
                        props.arrayArticles.map((article, key) => (
                            <NewsCard
                                article={article}
                                date={article.date}
                                articlesNews={props.articles}
                                saveArticles={props.saveArticles}
                                image={article.image}
                                link={article.link}
                                title={article.title}
                                text={article.text}
                                source={article.source.name || article.source}
                                updateArrArticles={props.updateArrArticles}
                                key={key}
                                keyword={article.keyword}
                                loggedIn={props.loggedIn}


                            />
                        ))
                    }
                </div>
            </section>
            : ''
    )
}

export default SavedNews;