import React from 'react'
import SearchMenu from '../search/SearchMenu'

function MainPage () {
  return (
    <div>
      <h2 className="text-center">Welcome to Xea</h2>
      <div className="row">
        <SearchMenu />
      </div>
      <p className="row text-center">
        Here you could see a list with near events
      </p>
    </div>
  )
}

export default MainPage
