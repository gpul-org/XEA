import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { loginRequest, logoutRequest } from '../../actions/authActions'

import LoginForm from './LoginForm'
import UserMenu from './UserMenu'

class LogInAndOut extends Component {
  constructor (props) {
    super(props)

    this.state = { showModal: false }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  // componentWillMount () {
  //   const { inProgress, errorMessage } = this.props
  //   const showModal = inProgress || errorMessage
  //   this.setState({ showModal })
  // }

  componentWillReceiveProps (nextProps) {
    const { inProgress, errorMessage } = nextProps
    let showModal = false
    if (inProgress || errorMessage) {
      showModal = true
    }
    this.setState({ showModal })
  }

  handleLogout () {
    this.props.logoutRequest(this.props.token)
  }

  handleLogin (props) {
    this.setState({ username: props.username })
    this.props.loginRequest(props)
  }

  close () {
    // If login in progress or messageError we prevent closing modal.
    if (!this.props.inProgress) {
      this.setState({ showModal: false })
    }
  }

  open () {
    this.setState({ showModal: true })
  }

  renderLogOut () {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <UserMenu username={this.state.username} handleLogout={this.handleLogout} />
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
        <Modal
          bsSize="small"
          show={this.state.showModal} onHide={this.close}
        >
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm error={this.props.errorMessage} handleFormSubmit={this.handleLogin} />
          </Modal.Body>
        </Modal>
      </ul>
    )
  }

  render () {
    if (this.props.token) {
      return this.renderLogOut()
    }
    return this.renderLogIn()
  }
}

LogInAndOut.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  logoutRequest: PropTypes.func.isRequired,
  token: PropTypes.string,
  errorMessage: PropTypes.string,
  inProgress: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    token: state.auth.token,
    inProgress: state.auth.inProgress,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, { loginRequest, logoutRequest })(LogInAndOut)
