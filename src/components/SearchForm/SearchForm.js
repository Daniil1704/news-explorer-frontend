import React, { useState } from 'react'
import './SearchForm.css'

function SearchForm(props) {
    const [keyword, setKeyword] = useState('');

    function submitForm(e) {
        e.preventDefault();
        props.EditSearchNews(keyword);

    }

    return (

        <div className="search">
            <form className="search__form" onSubmit={submitForm}>
                <h1 className="search__title">Что творится в мире?</h1>
                <p className="search__about">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <div className="search__container">
                    <input
                        className="search__input"
                        placeholder="Введите тему новости"
                        required
                        onChange={e => setKeyword(e.target.value)}
                    >
                    </input>

                    <button className="search__button">Искать</button>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;