import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { loginRequest } from '../../actions/authActions'

import LoginForm from './LoginForm'

class LoginModal extends Component {
  constructor (props) {
    super(props)

    this.state = { showModal: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit (props) {
    console.log('handleFormSubmit')
    this.close()
    this.props.loginRequest(props)
  }

  close () {
    console.log('closing')
    this.setState({ showModal: false })
  }

  open () {
    console.log('opening')
    this.setState({ showModal: true })
  }

  render () {
    const btnAsLinkStyle = {
      outline: 'none',
      textDecoration: 'none',
      fontWeight: 300
    }
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <button className="btn btn-link navbar-btn" style={btnAsLinkStyle}onClick={this.open}>
            Log in
          </button>
        </li>
        <Modal show={this.state.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleFormSubmit={this.handleFormSubmit} />
          </Modal.Body>
        </Modal>
      </ul>
    )
  }
}

LoginModal.propTypes = {
  loginRequest: PropTypes.func.isRequired
}

export default connect(null, { loginRequest })(LoginModal)
