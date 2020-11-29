import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
    return (
        <section className="saved-news-header">
            <div className="saved-news-header__container">
                <p className="saved-news-header__subtitle">Сохраненные статьи</p>
                <h3 className="saved-news-header__title">Грета, у вас 5 сохраненных статей</h3>
                <p className="saved-news-header__found">По ключевым словам: <b>Природа, Тайга</b> и <b>2-м другим</b> </p>
            </div>
        </section>
    )
}

export default SavedNewsHeader;