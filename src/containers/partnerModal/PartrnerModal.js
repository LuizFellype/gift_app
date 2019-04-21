import React, { useState, useRef } from 'react'
import { Growl } from 'primereact/growl'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Input, useInput } from '../../components'
import { VARIABLES, MESSAGES, INPUTPROPS, validations } from '../../utils'
import { Storage, addPartner } from '../../services'
import './PartnerModal.css'

const { GENERIC } = MESSAGES.ERRORS
const userSaved = Storage.get(VARIABLES.USER_KEY)

const PartnerForm = ({ showGrowl }) => {
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
    } catch (err) {
      showGrowl(GENERIC.CONTENT)
      console.log({ err })
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

const UserData = ({ data, disconnect }) => {
  const disconnectPartner = async () => {
    disconnect(false) // TODO: disconnect partner
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
  const { partner } = userSaved.user
  const [isTherePartner, setIsTherePartner] = useState(!!partner)

  return isTherePartner ? (
    <UserData data={partner} disconnect={setIsTherePartner} />
  ) : (
    <PartnerForm showGrowl={showGrowl} />
  )
}

export const PartnerModal = ({ visible, onModal }) => {
  const growl = useRef(null)
  const showGrowl = (message, isErrorMsg = true) =>
    growl.current.show({
      severity: isErrorMsg ? 'error' : 'success',
      summary: isErrorMsg ? GENERIC.TITLE : MESSAGES.SUCCESS.GENERIC.TITLE,
      detail: message
    })

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
        <Modalcontent showGrowl={showGrowl} />
      </Dialog>
    </>
  )
}
