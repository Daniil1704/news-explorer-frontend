import React, { useState } from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../utils/context/CurrentUserContex.js';
function SavedNewsHeader(props) {

    const [keywords, setKeywords] = useState([]);
    const currentUser = React.useContext(CurrentUserContext);
    function saveNameArticles(number) {

        if (number >= 5 || number === 0)
            return 'сохраненных статей';

        if (number > 1 && number < 5)
            return 'сохраненные статьи';

        if (number === 1)
            return 'сохраненная статья';
    }
    React.useEffect(() => {
        const keywordArray = props.arrayArticles.map(i => i = i.keyword)
            .reduce((first, present) => {
                first[present] = (first[present] || 0) + 1;
                return first;
            }, {});

        const keywordsArr = Object.keys(keywordArray).sort((a, b) => keywordArray[b] - keywordArray[a]);
        setKeywords(keywordsArr);
    }, [props.arrayArticles]);

    function keywordText(number) {
        let keywordsText = '-и другим';
        if (number.toString().endsWith('1') && !number.toString().endsWith('11')) {
            keywordsText = '-му другому';
        } else if (number.toString().endsWith('2') && !number.toString().endsWith('12')) {
            keywordsText = '-м другим';
        } else if (number.toString().endsWith('3') && !number.toString().endsWith('13')) {
            keywordsText = '-м другим';
        } else if (number.toString().endsWith('4') && !number.toString().endsWith('14')) {
            keywordsText = '-м другим';
        }
        return keywordsText;
    }
    return (
        <section className="saved-news-header">
            <div className="saved-news-header__container">
                <p className="saved-news-header__subtitle">Сохраненные статьи</p>
                <h3 className="saved-news-header__title">{currentUser.name}, у вас {props.lengthArticles} {saveNameArticles(props.lengthArticles)}</h3>
                {
                    keywords.length <= 3
                        ?
                        <p className="saved-news-header__found ">По ключевым словам:
                            {
                                keywords.map((keyword, i) => {
                                    return i < keywords.length - 1
                                        ?
                                        <b key={i}>&ensp;{keyword},</b>
                                        :
                                        <b key={i}>&ensp;{keyword}</b>
                                })
                            }
                        </p>
                        :
                        <p className="saved-news-header__found">По ключевым словам:
                            {
                                keywords.map((keyword, i) => {
                                    if (i === 0) {
                                        return <b key={i}>&ensp;{keyword},</b>
                                    } else if (i === 1) {
                                        return <b key={i}>&ensp;{keyword}</b>
                                    }
                                })
                            } и <b>{keywords.length - 2}{keywordText(keywords.length - 2)}</b>
                        </p>

                }
            </div>
        </section >
    )
}

export default SavedNewsHeader;