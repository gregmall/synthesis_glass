import React from 'react'
import { ReactTyped } from 'react-typed'
const About = () => {
  return (
    <div>
      <ReactTyped
      strings={[
        "American Made",
        "Highest Quality",
        "Since 1997",
      ]}
      typeSpeed={40}
      backSpeed={50}
      loop
    />
    </div>
  )
}

export default About