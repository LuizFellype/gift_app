import React, { useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { ProductForm, ProductList } from '../../containers'
import { useHomeFlow } from '../../reducers/productsReducer'
import { me } from '../../services/__mocks__/Client'
import { VARIABLES } from '../../utils'
import { Storage } from '../../services'
import './Home.css'

const style = {
  buttonToScrol: {
    width: '45%'
  },
  buttonRefresh: {
    width: '10%'
  }
}

// eslint-disable-next-line react/display-name
export const Home = React.memo(() => {
  const [state, setState] = useHomeFlow()
  const tableContainer = useRef()

  const attData = async () => {
    try {
      const { data } = await me()
      if (!data) {
        const { user } = Storage.get(VARIABLES.USER_KEY)
        return setState(user)
      }
      setState(data.user)
    } catch (err) {
      const { user } = Storage.get(VARIABLES.USER_KEY)
      setState(user)
    }
  }

  useEffect(() => {
    attData()
  }, [])

  const scrollTableContainer = left =>
    tableContainer.current.scrollTo({ left, behavior: 'smooth' })

  return (
    <>
      <ProductForm />

      <div className='options-block'>
        <Button
          onClick={attData}
          icon='pi pi-refresh'
          style={style.buttonRefresh}
          className='p-button-success'
        />
        <Button
          onClick={() => scrollTableContainer(0)}
          label='Meus presentes'
          style={style.buttonToScrol}
        />
        <Button
          onClick={() => scrollTableContainer(1000)}
          label={state.partnerName}
          style={style.buttonToScrol}
        />
      </div>

      <div className='tables-container' ref={tableContainer}>
        <div className='tables-block'>
          <ProductList products={state.userProducts} />
          <ProductList products={state.partnerProducts} />
        </div>
      </div>
    </>
  )
})
