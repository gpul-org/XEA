import React from 'react'

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div>
      <h2 className='text-center'>About</h2>
      <p>
        With <span className='fa fa-heart'></span> from XEA contributors and <a target='_blank' href='http://gpul.org/'>GPUL</a> association.
      </p>
    </div>
  )
}

export default AboutPage
