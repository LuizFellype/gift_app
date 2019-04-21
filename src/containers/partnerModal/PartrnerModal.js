import React, { useState, useRef } from 'react'
import { Growl } from 'primereact/growl'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Input, useInput } from '../../components'
import { VARIABLES, MESSAGES, INPUTPROPS, validations } from '../../utils'
import { Storage, addPartner, disconnect } from '../../services'
import './PartnerModal.css'

const { GENERIC } = MESSAGES.ERRORS
const getUserSaved = () => Storage.get(VARIABLES.USER_KEY)

const PartnerForm = ({ showGrowl, _connect }) => {
  const recognizeIdField = useInput(INPUTPROPS.recognizeId)

  const handleSubmit = async e => {
    e.preventDefault()
    const recognizeId = recognizeIdField.value.trim()
    try {
      const response = await addPartner(recognizeId)
      if (!validations.partnerResponse(showGrowl, response)) return

      const successMessage = MESSAGES.SUCCESS.PARTNER.CONNECTED(
        response.data.addPartner.partner.name
      )
      showGrowl(successMessage, false)
      _connect()
      recognizeIdField.onChange({ currentTarget: { value: '' } })
    } catch (err) {
      showGrowl(GENERIC.CONTENT)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input {...recognizeIdField} />
        <div className='dialog-footer'>
          <Button type='submit' icon='pi pi-search' label='Procurar pelo ID' />
        </div>
      </form>
    </>
  )
}

const UserData = ({ showGrowl, data, _disconnect }) => {
  const disconnectPartner = async () => {
    const { data, errors } = await disconnect()

    if (!data) {
      if (errors.message === 'You are not connected with someone') {
        return showGrowl(MESSAGES.ERRORS.PARTNER.IM_ALONE)
      }

      return showGrowl(MESSAGES.ERRORS.GENERIC.CONTENT)
    }
    showGrowl(MESSAGES.SUCCESS.PARTNER.DISCONNECTED, false)
    _disconnect()
  }

  return (
    <div className='user-data-container'>
      <div>
        <div style={{ paddingBottom: '8px' }}>
          <strong>SEU(SUA) PARCEIRO(A)</strong>
        </div>
        <div style={{ paddingBottom: '12px' }}>
          <strong>Nome:</strong> {data.name}
        </div>
      </div>
      <Button
        onClick={disconnectPartner}
        icon='pi pi-times'
        label='Desconectar desta pessoa'
        className='p-button-danger'
      />
    </div>
  )
}

const Modalcontent = ({ showGrowl }) => {
  const { partner } = getUserSaved().user
  const [isTherePartner, setIsTherePartner] = useState(!!partner)

  return isTherePartner ? (
    <UserData
      showGrowl={showGrowl}
      data={partner}
      _disconnect={() => setIsTherePartner(false)}
    />
  ) : (
    <PartnerForm
      showGrowl={showGrowl}
      _connect={() => setIsTherePartner(true)}
    />
  )
}

export const PartnerModal = React.memo(({ visible, onModal }) => {
  const growl = useRef(null)
  const showGrowl = (message, isErrorMsg = true) => {
    growl.current.show({
      severity: isErrorMsg ? 'error' : 'success',
      summary: isErrorMsg ? GENERIC.TITLE : MESSAGES.SUCCESS.GENERIC.TITLE,
      detail: message
    })
    // setTimeout(async () => onModal(), 500)
  }

  return (
    <>
      <Growl ref={growl} />
      <Dialog
        header='Quer compartilhar seus desejos ? ;)'
        visible={visible}
        onHide={onModal}
        className='dialog-modal'
        modal
      >
        <div style={{ paddingBottom: '15px' }}>
          <strong>SEU(SUA) ID: </strong> {getUserSaved().user.recognizeId}
        </div>
        <Modalcontent showGrowl={showGrowl} />
      </Dialog>
    </>
  )
})
