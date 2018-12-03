import React, { PureComponent } from 'react'
import './Login.css'

class Login extends PureComponent {
    state = {
      formProblem: false,
      login: true,
      email: '',
      password: ''
    }

    componentDidMount () {
      this.props.allProps.setHeaderTitle(undefined)
      this.allProps = { ...this.props.allProps }
    }

    handleValue = event => {
      const value = event.currentTarget.value

      if (event.target.id === 'Senha') {
        this.setState({ password: value })
        return
      }

      this.setState({ email: value })
    }

    changeForm = () => this.setState({ login: !this.state.login, formProblem: false })

    handleForm = () => {
      const { login, email, password } = this.state

      if (!email.includes('@') || !email.includes('.') || password.length <= 3) {
        this.setState({ formProblem: true })
        return
      }

      if (!login) {
        // Create a count
        // Log in if created else return the error
        return
      }

      // logging in
      const accountConfirmation = true

      if (!accountConfirmation) {
        this.setState({ handleForm: false })
        return
      }
      
      this.allProps.history.push('/presentes')
    }

    render () {
      const { login, formProblem } = this.state
      return (
        <div className='loginWrapper'>
          <div className='loginForm'>
            {
              formProblem
                ? <p>Email ou Senha invalido</p>
                : <p />
            }
            <Form
              handleForm={this.handleForm}
              changeForm={this.changeForm} login={login}
              handleValue={this.handleValue} />
          </div>
        </div>
      )
    }
}

const Form = ({ changeForm, login, handleForm, handleValue }) => (
  <React.Fragment>
    <div className='inputContainer'>
      <Input label='Email' type='email' handleValue={handleValue} required />
      <Input label='Senha' type='password' handleValue={handleValue} required />
    </div>

    <div className='formDone'>
      <p onClick={changeForm}>{login ? 'Nao tenho conta' : 'Ja tenho conta'}</p>
      <button onClick={handleForm}>
        {login ? 'Entrar' : 'Criar Conta'}
      </button>
    </div>
  </React.Fragment>
)

const Input = ({ label, type, handleValue }) => (
  <div className='inputs'>
    <label id={label}>{label}</label>
    <input id={label} type={type} placeholder={label} onChange={handleValue} />
  </div>
)

export default Login
