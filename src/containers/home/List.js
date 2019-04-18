import React from 'react'
import PropTypes from 'prop-types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

// eslint-disable-next-line react/display-name
export const ProductList = React.memo(({ products = [] }) => (
  <div className='table-block'>
    <DataTable value={products} autoLayout responsive>
      <Column field='productName' header='Nome do produto' sortable />
      <Column field='url' header='Loja/Lugar' sortable />
    </DataTable>
  </div>
))

ProductList.propTypes = {
  products: PropTypes.array.isRequired
}
