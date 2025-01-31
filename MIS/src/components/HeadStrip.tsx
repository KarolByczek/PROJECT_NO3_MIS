import React from 'react'
import Button from './Button.tsx';

const HeadStrip = () => {
  return (
    <div className='headstrip'>
      <div className='left_subimage_container'>
        <img className='headstrip_subimage left_subimage' src="src/assets/instrument-user-bckg01.jpg" alt="An image of an instrument user." />
      </div>
      <div className='headstrip_subimage middle_subimage'>
        <img src="src/assets/exclamatory-fireworks.png" alt="Conspicuous image of fireworks." />
        <p>
          This Year's Bestsellers!
        </p>
        <Button className='buy_now' buttonContent='Buy Now &#10140;' />
      </div>
      <div className='right_subimage_container'>
        <img className='headstrip_subimage right_subimage' src="src/assets/instrument-user-bckg02.jpg" alt="An image of an instrument user." />
      </div>
    </div>
  )
}

export default HeadStrip
