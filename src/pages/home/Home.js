import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { ProductForm, ProductList } from '../../containers'
import { me } from '../../services/__mocks__/Client'
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
  const [userData, setUserData] = useState({})
  const [partnerData, setPartnerData] = useState({})
  const tableContainer = useRef()

  const attData = async () => {
    try {
      const { data } = await me()
      const { partner = {}, products } = data.user

      if (partner && partner.id) {
        setPartnerData(partner)
      }
      setUserData({ products })
    } catch (err) {
      console.log({ err })
    }
  }

  useEffect(() => {
    attData()
  }, [])

  const scrollTableContainer = left =>
    tableContainer.current.scrollTo({ left, behavior: 'smooth' })

  const partnerButtonLabel =
    (partnerData && partnerData.name) || 'Presentes dele(a)'

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
          label={partnerButtonLabel}
          style={style.buttonToScrol}
        />
      </div>

      <div className='tables-container' ref={tableContainer}>
        <div className='tables-block'>
          <ProductList products={userData.products || []} />
          <ProductList products={partnerData.products || []} />
        </div>
      </div>
    </>
  )
})
