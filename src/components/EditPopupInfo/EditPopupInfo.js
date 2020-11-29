import React from 'react';
import './EditPopupInfo.css';

function EditPopupInfo(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__close"></button>
                <h3 className="popup__title-info">Пользователь успешно зарегистрирован!</h3>
                <button onClick={() => props.handleEditLoginClick()} type="button" className="popup__button-info">Войти</button>
            </div>
        </div>
    )
}

export default EditPopupInfo;