import React, { PureComponent } from 'react'

class Header extends PureComponent {
  render () {
    const { title } = this.props
    return (
      <div style={{ backgroundColor: 'blue' }}>
        <h1>{title}</h1>
      </div>
    )
  }
}

export default Header
