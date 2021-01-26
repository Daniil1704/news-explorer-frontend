import React from 'react'
import './PopupWithForm.css';
function PopupWithForm(props) {
    const buttonDisabled = `${props.isValid ? 'popup__save' : 'popup__save popup__save_disabled'
        }`;
    return (

        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <form onSubmit={props.submit} className="popup__container" >
                <button type="button" onClick={props.onClose} className="popup__close"></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button type="submit" className={buttonDisabled} >{props.textButton}</button>
                <p className="popup__text">или <span className="popup__click" onClick={props.replacementPopup} >{props.click}</span></p>
            </form>
        </div>
    )
}
export default PopupWithForm;