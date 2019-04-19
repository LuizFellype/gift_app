import React from 'react'
import { Button } from 'primereact/button'
import { Input, useInput } from '../../components'
import { INPUTPROPS } from '../../utils'

// eslint-disable-next-line react/display-name
export const ProductForm = React.memo(() => {
  const product = useInput(INPUTPROPS.product)
  const place = useInput(INPUTPROPS.place)

  return (
    <div className='form'>
      <div className='new-product-block'>
        <Input {...product} />
        <Input {...place} />
      </div>
      <div className='product-underform'>
        <Button label='Adicionar' />
      </div>
    </div>
  )
})
