import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import { logoutRequest } from '../../actions/authActions'
import LoginModal from '../login/LoginModal'

class MainToolBar extends Component {
  constructor (props) {
    super(props)

    this.renderAuthComponent = this.renderAuthComponent.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    this.props.logoutRequest()
  }

  renderAuthComponent () {
    console.log('props:', this.props)
    if (this.props.token) {
      // we are already authenticated. We should show log out.
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
    return (<LoginModal />)
  }

  render () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">XEA</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                  <IndexLink to="/">Home</IndexLink>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
              {this.renderAuthComponent()}
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

MainToolBar.propTypes = {
  token: PropTypes.string,
  logoutRequest: PropTypes.func
}

function mapStateToProps (state) {
  return {
    token: state.auth.token
  }
}

export default connect(mapStateToProps, { logoutRequest })(MainToolBar)
