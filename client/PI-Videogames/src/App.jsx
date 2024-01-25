import {BrowserRouter, Routes, Route, Form } from "react-router-dom"
import './App.css'
import { Home } from "./Views/Home/Home.jsx"
import { Create } from "./Views/Form/Create.jsx"
import { Landing } from "./Views/Landing/Landing.jsx"
import {Detail} from "./Views/Detail/Detail.jsx"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getVideogames } from "./Redux/Actions/actions"

function App() {
const dispatch=useDispatch();

useEffect(()=>{
  dispatch(getVideogames)
},[dispatch])
  return (
    
      <div>
       <BrowserRouter>
       <Routes>
        {/* <Route path="/navbar/:input" element={< />}/> */}
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
       </Routes>
       </BrowserRouter>
      </div>
      
   
  )
}

export default App
