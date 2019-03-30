import React, { useState, useRef } from 'react'
import { Growl } from 'primereact/growl'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Logo } from '../../components/logo/Logo'
import { MESSAGES, validations } from '../../utils'
import './Login.css'

export const Login = ({ history }) => {
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const growl = useRef()

  const onLoginSubmit = async event => {
    event.preventDefault()

    if (!formValidation(username, password)) return

    setLoginError('')
    setLoading(true)

    try {
      // Log in
    } catch (err) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.FAIL)
      setLoading(false)
      return
    }

    setLoading(false)

    growl.show({
      severity: 'success',
      summary: MESSAGES.SUCCESS.GENERIC.TITLE,
      detail: MESSAGES.SUCCESS.AUTH.LOGIN
    })
    setTimeout(() => history.push('/'))
  }

  const formValidation = (username, password) => {
    setLoading(false)

    if (!validations.isEmail(username)) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.INVALID_EMAIL)
      return false
    }

    if (!password) {
      setLoginError(MESSAGES.ERRORS.AUTH.LOGIN.EMPTY_PASSWORD)
      return false
    }
  }

  return (
    <div className='p-grid p-fluid login-container'>
      <Growl ref={growl} />
      <div className='p-col-12 p-lg-4 p-md-6 p-sm-8 p-xs-12'>
        <Logo />
        <div className='card card-w-title login-card'>
          <h1 className='login-card-title'>LOGIN</h1>
          <form onSubmit={onLoginSubmit}>
            <div className='p-grid'>
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
                  type='submit'
                  label='Entrar'
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
          </form>
        </div>
      </div>
    </div>
  )
}
