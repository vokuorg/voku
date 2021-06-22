import React from 'react'
//CSS
import './BalloonButton.css'

const BalloonButton = ({ side, text, classNames, onClick }) => {
    return (
        <button onClick={onClick} className={ `balloon ${side} ${classNames}` }>
            { text }
        </button>
    )
}

export default BalloonButton;