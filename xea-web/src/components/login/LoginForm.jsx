import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap'

// TODO: must be defined and enforced.
const passwordConfig = {
  length: 6,
  regex: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}')
}

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.getValidationState = this.getValidationState.bind(this)
    this.renderField = this.renderField.bind(this)
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

  renderField (
    { name, placeholder, input, label, type, className,
      meta: { touched, pristine, error, valid, active } }
  ) {
    return (
      <FormGroup validationState={this.getValidationState({ error, pristine, active })}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          {...input}
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
          name="email"
          label="Email"
          placeholder="example@email.com"
          component={this.renderField}
          type="email"
          className="form-control"
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
//   return { errorMessage: state.loginError.message }
// }

const validate = (values) => {
  const errors = {}
  const pc = passwordConfig

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < pc.length) {
    errors.password = `Password must have al lest ${passwordConfig.length} characters`
  }
  return errors
}

const formOptions = {
  form: 'login',
  validate
}

export default reduxForm(formOptions)(LoginForm)
