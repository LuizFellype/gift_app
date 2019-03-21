import React, { PureComponent } from 'react'
import { Growl } from 'primereact/growl'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Logo } from '../../components/logo/Logo'
import { MESSAGES, validations } from '../../utils'
import './Login.css'

export class Login extends PureComponent {
  state = {
    loading: false,
    loginError: '',
    username: '',
    password: ''
  }

  onLoginSubmit = async event => {
    event.preventDefault()
    const { username, password } = this.state

    if (!this.formValidation(username, password)) return

    this.setState({
      loginError: '',
      loading: true
    })

    try {
      // Log in
    } catch (err) {
      this.setState({
        loginError: MESSAGES.ERRORS.AUTH.LOGIN.FAIL,
        loading: false
      })
      return
    }
    this.setState({
      loading: false
    })
    this.growl.show({
      severity: 'success',
      summary: MESSAGES.SUCCESS.GENERIC.TITLE,
      detail: MESSAGES.SUCCESS.AUTH.LOGIN
    })
    setTimeout(() => this.props.history.push('/'), 1000)
  }

  formValidation = (username, password) => {
    if (!validations.isEmail(username)) {
      this.setState({
        loginError: MESSAGES.ERRORS.AUTH.LOGIN.INVALID_EMAIL,
        loading: false
      })
      return false
    }
    if (!password) {
      this.setState({
        loginError: MESSAGES.ERRORS.AUTH.LOGIN.EMPTY_PASSWORD,
        loading: false
      })
      return false
    }
  }

  render() {
    const { loginError } = this.state

    return (
      <div className='p-grid p-fluid login-container'>
        <Growl ref={el => (this.growl = el)} />
        <div className='p-col-12 p-lg-4 p-md-6 p-sm-8 p-xs-12'>
          <Logo />
          <div className='card card-w-title login-card'>
            <h1 className='login-card-title'>LOGIN</h1>
            <form onSubmit={this.onLoginSubmit}>
              <div className='p-grid'>
                <div className='p-col-12 login-form-group'>
                  <label htmlFor='username'>Email</label>
                  <InputText
                    id='username'
                    type='email'
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </div>
                <div className='p-col-12 login-form-group'>
                  <label htmlFor='password'>Senha</label>
                  <Password
                    id='password'
                    value={this.state.password}
                    feedback={false}
                    onChange={e => this.setState({ password: e.target.value })}
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
                    disabled={this.state.loading}
                  />
                </div>
                {this.state.loading && (
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
}
