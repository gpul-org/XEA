import React, { Component } from 'react'
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
    loginRequest(props)
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
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a onClick={this.open}>Log in</a>
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
}

export default LoginModal
