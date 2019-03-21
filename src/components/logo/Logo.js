import React from 'react'
import './Logo.css'

const logoSrc =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/2000px-No-logo.svg.png'

export const Logo = () => {
  return (
    <div className='logo'>
      <div className='img'>
        <img className='mb-4' alt='Logo' src={logoSrc} width='300' />
      </div>
    </div>
  )
}
