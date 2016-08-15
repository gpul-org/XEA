import React from 'react'
import '../../styles/main-page.css'

class SearchMenu extends React.Component {
  find () {
    console.log('find')
  }

  render () {
    return (
      <div className="form-inline col-md-offset-3 col-md-7">
        <div className="">
          <div className="col-md-10">
            <input className="input-search-bar form-control" />
          </div>
          <div className="col-md-2">
            <input className="btn btn-default" type="submit" value="Find" onClick={this.find} />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchMenu
