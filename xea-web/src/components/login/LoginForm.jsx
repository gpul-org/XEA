import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
    this.renderField = this.renderField.bind(this)
  }

  componentDidMount () {
    const username = this.username
    /* eslint-disable react/no-find-dom-node */
    ReactDOM.findDOMNode(username).focus()
    /* eslint-enable react/no-find-dom-node */
  }

  getValidationState ({ active, pristine, error }) {
    console.log(`pristine: ${pristine}\nerror: ${error}\nactive: ${active}`)
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
      console.log('wtf:', value)
      return previousValue
    }
    return value
  }

  renderField (
    { name, placeholder, input, label, type, className,
      meta: { touched, pristine, error, valid, active } }
  ) {
    return (
      <FormGroup validationState={this.getValidationState({ error, pristine, active })}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          {...input}
          ref={c => { this[`${name}`] = c }}
          type={type}
          placeholder={placeholder || name}
        />
        {touched && error && !pristine && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
    )
  }

  render () {
    const { handleSubmit, reset, pristine, submitting, valid } = this.props
    return (
      <form onSubmit={handleSubmit(this.props.handleFormSubmit)}>
        <Field
          name="username"
          label="User name"
          placeholder="username"
          component={this.renderField}
          type="text"
          className="form-control"
          normalize={this.usernameNormalicer}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Password"
          component={this.renderField}
          type="password"
          className="form-control"
        />
        <div>
          <button
            disabled={pristine || submitting || !valid}
            className="btn btn-primary"
          >
            Login
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
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
  valid: PropTypes.bool,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleFormSubmit: PropTypes.func
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
  console.log(`username: ${username}, password: ${password}`)
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

export default reduxForm(formOptions)(LoginForm)
