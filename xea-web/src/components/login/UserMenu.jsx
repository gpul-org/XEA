import React, { PropTypes } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

function UserMenu (props) {
  return (
    <DropdownButton bsStyle="btn btn-link navbar-btn btn-as-navbar-link" title={props.username}>
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={props.handleLogout}>Sign out</MenuItem>
    </DropdownButton>
  )
}

UserMenu.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func
}

export default UserMenu
