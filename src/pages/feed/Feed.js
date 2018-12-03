import React, { PureComponent } from 'react'

class Feed extends PureComponent {
  componentDidMount () {
    const { allProps } = this.props
    allProps.setHeaderTitle('FEEEEEDDDDDD MANOO')
  }

  render () {
    const { allProps } = this.props
    return (
      <div>
        FEED
        <button onClick={() => allProps.history.push('/')}>Go Back</button>
      </div>
    )
  }
}

export default Feed
