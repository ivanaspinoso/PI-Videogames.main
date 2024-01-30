import { NavLink} from "react-router-dom"
import React, {useState} from "react"
import { searchByName } from "../../Redux/Actions/actions"
import { useDispatch } from "react-redux"
import s from "./Navbar.module.css"

export const Navbar = () => {
  
    const dispatch =useDispatch()
    const [input, setInput] = useState('')
    
    function handleInput(e){
        e.preventDefault();
        // setInput("")
         setInput(e.target.value)
    }

    const handleSearch = (e)=>{
        e.preventDefault()
        dispatch(searchByName(input))
    }   

    const [click,setClick]=useState(false)
    const handleClick =()=>setClick(!click)
    return(
        <>
        <nav className="navbar" >
            <div className="nav-container">
                <NavLink  to="/"  className="nav-logo">
                    Videogames App
            
                </NavLink>
                <form className={s.form} >
                    <input onChange={handleInput}  type="text" placeholder='Search games' className={s.input}
                    />
                    <button onClick={handleSearch} className={s.search}>Search</button>
                </form>
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink
                             to="/home"   
                             activeclassname="active"
                                className="nav-links"       
                            onClick={handleClick}
                        >
                            Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            
                            to="/create"
                            activeclassname="active"
                                className="nav-links"
                            onClick={handleClick}
                        >
                            Create
                        </NavLink>
                    </li>
                    <li className="nav-item" >
                        <NavLink
                            
                            to="/Favorites"
                            activeclassname="active"
                                className="nav-links"
                            onClick={handleClick}
                        >
                            Favorites
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            
                            to="/about"
                            activeclassname="active"
                                className="nav-links"

                            onClick={handleClick}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
                <div className="nav-icon"  onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
        </nav>
    </>
);
}
//searchBar: un input de búsqueda para encontrar videojuegos por nombre.