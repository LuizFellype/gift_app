import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ProductList } from './List'

afterEach(cleanup)

describe('Product list render withou crash', () => {
  test('Check html sctructure of the component', () => {
    const { asFragment } = render(<ProductList products={[]} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('Product List has wrapper', () => {
    const { getByTestId } = render(<ProductList products={[]} />)
    expect(getByTestId('table-wrapper').className).toContain('table-block')
  })
})
