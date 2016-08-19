import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { loginRequest, logoutRequest } from '../../actions/authActions'

import LoginForm from './LoginForm'

class LogInAndOut extends Component {
  constructor (props) {
    super(props)

    this.state = { showModal: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    console.log('handleLogout')
    this.props.logoutRequest(this.props.token)
  }

  handleLogin (props) {
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

  renderLogOut () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <button
            className="btn btn-link navbar-btn btn-as-navbar-link"
            onClick={this.handleLogout}
          >
            Log out
          </button>
        </li>
      </ul>
    )
  }

  renderLogIn () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <button
            className="btn btn-link navbar-btn btn-as-navbar-link"
            onClick={this.open}
          >
            Log in
          </button>
        </li>
        <Modal bsSize="small" show={this.state.showModal} onHide={this.close} >
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleFormSubmit={this.handleLogin} />
          </Modal.Body>
        </Modal>
      </ul>
    )
  }

  render () {
    if (this.props.token) {
      console.log('Log out')
      return this.renderLogOut()
    }
    console.log('Log in')
    return this.renderLogIn()
  }
}

LogInAndOut.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  token: PropTypes.string
}

function mapStateToProps (state) {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { loginRequest, logoutRequest })(LogInAndOut)
