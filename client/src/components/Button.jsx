import React from 'react'
import './styles/button.css'

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium', 'btn--mobile', 'btn--large', 'btn--wide']
const COLORS = ['primary', 'blue', 'red', 'green', 'ouicar', 'getaround']

export const Button = ({children, type, onClick, buttonStyle, buttonSize, buttonColor}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    const checkButtonColor = COLORS.includes(buttonColor) ? buttonColor : null;


    return(
    <button onClick={onClick} type={type} className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor}`}>{children}</button>
    );
}
