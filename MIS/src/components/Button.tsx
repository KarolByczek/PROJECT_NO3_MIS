import React from 'react'

interface ButtonProps {
    className: string;
    buttonContent: string;
};

const Button:React.FC<ButtonProps> = ({className, buttonContent}) => {
  return (
    <button className={className}>
      {buttonContent}
    </button>
  )
}

export default Button
