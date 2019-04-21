import React, { useState, useRef } from 'react'
import { Growl } from 'primereact/growl'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Logo } from '../../components/logo/Logo'
import { MESSAGES, validations } from '../../utils'
import { login, regiserUser } from '../../services'
import './Login.css'

export const Login = ({ history, location }) => {
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const growl = useRef()
  const isRegister = location.pathname !== '/login'

  const onLoginSubmit = async (event, goToOtherPage = false) => {
    if (goToOtherPage) {
      const path = location.pathname === '/login' ? '/registrar' : '/login'
      return history.replace(path)
    }
    event.preventDefault()

    if (!formValidation(username, password)) return

    setLoginError('')
    setLoading(true)
    if (isRegister) {
      try {
        await regiserUser(name, username, password)
        growl.current.show({
          severity: 'success',
          summary: MESSAGES.SUCCESS.GENERIC.TITLE,
          detail: MESSAGES.SUCCESS.AUTH.REGISTER
        })
        setTimeout(() => {
          setLoading(false)
          history.push('/login')
        })
        return
      } catch (err) {
        return growl.current.show({
          severity: 'error',
          summary: MESSAGES.ERRORS.GENERIC.TITLE,
          detail: MESSAGES.ERRORS.GENERIC.CONTENT
        })
      }
    }

    try {
      await login(username, password)
    } catch (err) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.FAIL)
      setLoading(false)
      return
    }

    setLoading(false)

    growl.current.show({
      severity: 'success',
      summary: MESSAGES.SUCCESS.GENERIC.TITLE,
      detail: MESSAGES.SUCCESS.AUTH.LOGIN
    })
    setTimeout(() => history.push('/'))
  }

  const formValidation = (username, password) => {
    if (!validations.isEmail(username)) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.INVALID_EMAIL)
      return false
    }

    if (!password) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.EMPTY_PASSWORD)
      return false
    }

    return true
  }

  return (
    <div className='p-grid p-fluid login-container'>
      <Growl ref={growl} />
      <div className='p-col-12 p-lg-4 p-md-6 p-sm-8 p-xs-12'>
        <Logo />
        <div className='card card-w-title login-card'>
          <h1 className='login-card-title'>LOGIN</h1>
          <div onSubmit={onLoginSubmit}>
            <div className='p-grid'>
              {!isRegister || (
                <div className='p-col-12 login-form-group'>
                  <label htmlFor='name'>Seu Nome</label>
                  <InputText
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              )}
              <div className='p-col-12 login-form-group'>
                <label htmlFor='username'>Email</label>
                <InputText
                  id='username'
                  type='email'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className='p-col-12 login-form-group'>
                <label htmlFor='password'>Senha</label>
                <Password
                  id='password'
                  value={password}
                  feedback={false}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {loginError && (
                <div className='p-col-12'>
                  <Message severity='error' text={loginError}>
                    {}
                  </Message>
                </div>
              )}
              <div className='p-col-12 container-login-button'>
                <Button
                  onClick={e => onLoginSubmit(e, true)}
                  label={isRegister ? 'Cancelar' : 'Registrar'}
                  icon={isRegister ? 'pi pi-times' : ''}
                  className={`ogin-btn ${
                    isRegister ? 'p-button-danger' : 'p-button-success'
                  }`}
                  disabled={loading}
                />
                <Button
                  onClick={onLoginSubmit}
                  label={isRegister ? 'Registar' : 'Entrar'}
                  className='login-btn'
                  disabled={loading}
                />
              </div>
              {loading && (
                <div className='login-loading'>
                  <ProgressSpinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
