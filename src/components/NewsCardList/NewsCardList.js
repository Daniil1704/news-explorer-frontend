import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard.js';


function NewsCardList(props) {
    const [arrayNewArticles, setArrayNewArticles] = useState([]);
    const [disabledButton, setDisabledButton] = useState(true)
    React.useEffect(() => {
        props.articles && setArrayNewArticles(props.articles.slice(0, 3));
        console.log(props.articles)
    }, [props.articles]);

    function moreArticle() {
        setArrayNewArticles(props.articles.slice(0, arrayNewArticles.length + 3));

        if (setArrayNewArticles.length >= props.articles.length - 3) {
            setDisabledButton(false);
        }
    }

    return (

        arrayNewArticles.length > 0
            ?
            <section className="news-card-list">
                <h2 className="news-card-list__title">Результаты поиска</h2>
                <div className="news-card-list__container">
                    {
                        arrayNewArticles.map((article, key) => (
                            <NewsCard
                                article={article}
                                date={article.publishedAt}
                                articlesNews={props.articles}
                                saveArticles={props.saveArticles}
                                image={article.urlToImage}
                                link={article.url}
                                title={article.title}
                                text={article.description}
                                source={article.source.name}
                                updateArrArticles={props.updateArrArticles}
                                key={key}
                                keyword={props.keyword}
                                loggedIn={props.loggedIn}
                                handleEditRegisterClick={props.handleEditRegisterClick}

                            />
                        ))
                    }
                </div>
                <button onClick={moreArticle} className={`news-card-list__button ${disabledButton ? '' : 'news-card-list__button_disabled'}`}>Показать еще</button>
            </section>
            : ''
    )
}

export default NewsCardList;