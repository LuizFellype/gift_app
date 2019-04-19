import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ProductForm } from './ProductForm'
import { INPUTPROPS } from '../../utils'

afterEach(cleanup)

// describe('Product list render withou crash', () => {
test('Should return what is written in the inputs - Product and Store', () => {
  const handleSubmit = jest.fn()
  const { getByTestId, getByLabelText } = render(
    <ProductForm onSubmit={handleSubmit} />
  )

  getByLabelText(INPUTPROPS.product.label).value = 'Product'
  getByLabelText(INPUTPROPS.place.label).value = 'Store'
  getByTestId('submitButton').click()

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    product: 'Product',
    url: 'Store'
  })
})
// })
