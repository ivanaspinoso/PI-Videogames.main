import {BrowserRouter, Routes, Route, Form } from "react-router-dom"
import './App.css'
import { Home } from "./Views/Home/Home.jsx"
import { Navbar } from "./Components/Navbar/Navbar.jsx"
import { Create } from "./Views/Form/Create.jsx"
import { Detail } from "./Views/Detail/Detail.jsx"
import { Landing } from "./Views/Landing/Landing.jsx"

function App() {

  return (
    
      <div>
       <BrowserRouter>
        <Navbar/>      
       <Routes>
        <Route path="/" Component={Landing}/>
        <Route path="/home" Component={Home}/>
        <Route path="/create" Component={Create}/>
        <Route path="/detail:id" Component={Detail}/>
       </Routes>
       </BrowserRouter>
      </div>
      
   
  )
}

export default App
