import React from 'react'
//CSS
import './BalloonButton.css'

const BalloonButton = ({classNames, side, text}) => {
    return (
        <button className={ `balloon ${side} ${classNames}` }>
            { text }
        </button>
    )
}

export default BalloonButton;