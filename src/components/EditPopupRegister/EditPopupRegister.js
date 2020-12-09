import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import './EditPopupRegister.css';

function EditPopupRegister(props) {
    function submitRegister(e) {
        e.preventDefault();
        props.registerUser(props.values.email, props.values.password, props.values.name)
        console.log(props.values.email)
    }
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            textButton="Зарегестрироваться"
            title="Регистрация"
            click="Войти"
            replacementPopup={props.replacementPopup}
            isValid={props.isValid}
            submit={submitRegister}
        >

            <div className="popup__inputs">
                <span className="popup__input_title">Email</span>
                <input className="popup__input" name="email" type="email" placeholder="Введите почту" minLength="2" maxLength="60" onChange={props.handleValid} value={props.values.email || ''} required ></input>
                <span className="popup__input_error">{props.error.email}</span>
                <span className="popup__input_title">Пароль</span>
                <input className="popup__input" name="password" type="password" placeholder="Введите пароль" minLength="10" onChange={props.handleValid} value={props.values.password || ''} required></input>
                <span className="popup__input_error">{props.error.password}</span>
                <span className="popup__input_title">Имя</span>
                <input className="popup__input" name="name" type="name" placeholder="Введите своё имя" minLength="2" maxLength="30" onChange={props.handleValid} value={props.values.name || ''} required></input>
                <span className="popup__input_error">{props.error.name}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditPopupRegister;   