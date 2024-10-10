import React from 'react'
import Form from '../components/LoginPage/Form'
import About from '../components/LoginPage/About'
import Hero from '../components/LoginPage/Hero'
import { useRef } from 'react'

const Login = () => {
  const rf = useRef(null)

  const scrollToAbout = ()=>{
    rf.current.scrollIntoView({behavior: "smooth"})
  }
  return (
    <div>
      {/* <Form/> */}
      
      <Hero scrollfunc={scrollToAbout}/>
      <div ref={rf}>
        <About />
      </div>
      
      
    </div>
  )
}

export default Login