import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './EditPopupLogin.css';

function EditPopupLogin(props) {
    function submitLogin(e) {
        e.preventDefault();
        props.login(props.values.email, props.values.password);
    }
    return (


        <PopupWithForm

            isOpen={props.isOpen}
            onClose={props.onClose}
            textButton="Войти"
            title="Вход"
            click="Зарегестрироваться"
            replacementPopup={props.replacementPopup}
            isValid={props.isValid}
            submit={submitLogin}
        >

            <div className="popup__inputs">
                <span className="popup__input_title">Email</span>
                <input className="popup__input" name="email" type="email" placeholder="Введите почту" required onChange={props.handleValid} value={props.values.email || ''}></input>
                <span className="popup__input_error">{props.error.email}</span>
                <span className="popup__input_title">Пароль</span>
                <input className="popup__input" name="password" type="password" placeholder="Введите пароль" required onChange={props.handleValid} value={props.values.password || ''}></input>
                <span className="popup__input_error">{props.error.password}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditPopupLogin;