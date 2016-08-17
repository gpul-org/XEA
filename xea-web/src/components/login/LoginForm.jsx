import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

// TODO: must be defined and enforced.
const passwordConfig = {
  length: 6,
  regex: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}')
}

class LoginForm extends Component {

  renderField ({ input, label, type, name, className, meta: { touched, error } }) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...input} type={type} className={className} placeholder={label} id={name} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    )
  }

  render () {
    const { handleSubmit, reset, pristine, submitting, valid } = this.props
    return (
      <form onSubmit={handleSubmit(this.props.handleFormSubmit)}>
        <Field
          name="email"
          label="Email"
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
