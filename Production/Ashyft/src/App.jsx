import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canvas from './Sections/Canvas'
import Foundation from './Pages/Foundation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Foundation/>
    </>
  )
}

export default App
