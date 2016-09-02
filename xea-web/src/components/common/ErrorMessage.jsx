import React from 'react'

function ErrorMessage (props) {
  return (
    <div className="form__error-wrapper text-danger bg-danger">
      <p className="form__error">
        {props.error}
      </p>
    </div>
  )
}

ErrorMessage.propTypes = {
  error: React.PropTypes.string
}

export default ErrorMessage
