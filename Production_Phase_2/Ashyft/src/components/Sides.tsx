import React from 'react'

const Sides = (props) => {

  return (
    <div className=' justify-self-center rounded-lg flex flex-col items-center gap-0'>
        <img src={props.location} alt="Home" className='w-[30px]' id='SideIcon'/>
        <h3 id='SiderText'>{props.label.toUpperCase()}</h3>
    </div>
  )
}

export default Sides
