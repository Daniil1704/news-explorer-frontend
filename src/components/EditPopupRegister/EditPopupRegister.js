import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './EditPopupRegister.css';

function EditPopupRegister(props) {
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            textButton="Зарегестрироваться"
            title="Регистрация"
            click="Войти"
            replacementPopup={props.replacementPopup}
        >

            <div className="popup__inputs">
                <span className="popup__input_title">Email</span>
                <input className="popup__input" name="userEmail" type="email" placeholder="Введите почту" required></input>
                <span className="popup__input_error"></span>
                <span className="popup__input_title">Пароль</span>
                <input className="popup__input" name="userPassword" type="password" placeholder="Введите пароль" required></input>
                <span className="popup__input_error"></span>
                <span className="popup__input_title">Имя</span>
                <input className="popup__input" name="userName" type="name" placeholder="Введите своё имя" required></input>
                <span className="popup__input_error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditPopupRegister;