import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

import { dismissAuthErrorMessage } from '../../actions/authActions'
import ErrorMessage from '../common/ErrorMessage'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
    this.renderField = this.renderField.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.dismissErrorMessage = this.dismissErrorMessage.bind(this)
  }

  componentDidMount () {
    console.log('(Loginform): WTF')
    // this.username.focus()
    const username = this.username
    /* eslint-disable react/no-find-dom-node */
    ReactDOM.findDOMNode(username).focus()
    /* eslint-enable react/no-find-dom-node */
  }

  componentWillReceiveProps (nextProps) {
    const { authError } = nextProps
    console.log(`LoginForm (compWilRecProps): ${authError}`)
  }

  getValidationState ({ active, pristine, error }) {
    if (pristine) {
      return 'success'
    }
    if (error) {
      if (active) {
        return 'warning'
      }
      return 'error'
    }
    return 'success'
  }

  usernameNormalicer (value, previousValue) {
    // Prevent user form use whitespaces
    if (/\s+/.test(value)) {
      return previousValue
    }
    return value
  }

  dismissErrorMessage () {
    console.log('LoginForm (dismissError)')
    if (this.props.errorMessage) {
      this.props.dismissAuthErrorMessage()
    }
  }

  handleOnFocus (event) {
    console.log('onFocus:')
    this.dismissErrorMessage()
  }

  handleFormSubmit (props) {
    console.log('LoginForm (handelFormSub) props:', this.props)
    if (this.props.errorMessage) {
      this.dismissErrorMessage()
    }
    this.props.handleFormSubmit(props)
  }

  renderField ({ name, placeholder, input, label, type, onFocus,
    meta: { touched, pristine, error, valid, active } }) {
    console.log('Field input.onFocus:', input.onFocus)
    console.log('Field props.onFocus:', onFocus)
    return (
      <FormGroup validationState={this.getValidationState({ error, pristine, active })}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          {...input}
          onFocus={onFocus}
          ref={c => { this[`${name}`] = c }}
          type={type}
          placeholder={placeholder || name}
        />
        {touched && error && !pristine && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    )
  }

  render () {
    const { handleSubmit, reset, pristine, submitting, valid, errorMessage } = this.props
    return (
      // <form onSubmit={handleSubmit(this.props.handleFormSubmit)}>
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        {errorMessage ? <ErrorMessage error={errorMessage} /> : null}
        <Field
          name="username"
          label="User name"
          placeholder="username"
          component={this.renderField}
          type="text"
          onBlur={event => { console.log(`${this.name} onBlur`) }}
          onFocus={this.handleOnFocus}
          onChange={event => { console.log(`${this.name} onChange`) }}
          normalize={this.usernameNormalicer}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Password"
          component={this.renderField}
          type="password"
        />
        <div>
          <button
            disabled={pristine || submitting || !valid}
            className="btn btn-primary"
          >
            Log in
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={() => {
              reset()
              this.dismissErrorMessage()
            }}
            className="btn btn-warning pull-right"
          >
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  dismissAuthErrorMessage: PropTypes.func
}

// function mapStateToProps (state) {
//   return { errorMessage: state.Error.message }
// }

// TODO: must be defined and enforced.
const passwordConfig = {
  length: 6,
  regex: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}')
}
const usernameConfig = {
  length: 8
}

const validate = ({ username, password }) => {
  const errors = {}

  if (!username) {
    errors.username = 'Required'
  } else if (username.length < usernameConfig.length) {
    errors.username = `Username must be at least ${usernameConfig.length} characters`
  }

  if (!password) {
    errors.password = 'Required'
  } else if (password.length < passwordConfig.length) {
    errors.password = `Password must have al lest ${passwordConfig.length} characters`
  }
  return errors
}

const formOptions = {
  form: 'login',
  validate
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps,
  { dismissAuthErrorMessage })(reduxForm(formOptions)(LoginForm))
