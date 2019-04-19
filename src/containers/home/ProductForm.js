import React from 'react'
import { Button } from 'primereact/button'
import { Input, useInput } from '../../components'
import { INPUTPROPS } from '../../utils'

// eslint-disable-next-line react/display-name
export const ProductForm = React.memo(({ onSubmit = () => null }) => {
  const product = useInput(INPUTPROPS.product)
  const place = useInput(INPUTPROPS.place)

  const handleSubimit = e => {
    e.preventDefault()
    const { productName, placeToFind } = e.currentTarget.elements
    onSubmit({ product: productName.value, url: placeToFind.value })
  }

  return (
    <form className='form' onSubmit={handleSubimit}>
      <div className='new-product-block'>
        <Input {...product} />
        <Input {...place} />
      </div>
      <div className='product-underform'>
        <Button label='Adicionar' type='submit' data-testid='submitButton' />
      </div>
    </form>
  )
})
