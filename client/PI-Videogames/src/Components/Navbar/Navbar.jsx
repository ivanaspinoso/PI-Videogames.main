import {Link, NavLink} from "react-router-dom"
import React, {useState} from "react"
import { searchByName } from "../../Redux/Actions/actions"
import { useDispatch } from "react-redux"

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
        console.log(input)
        dispatch(searchByName(input))
    }

    const [click,setClick]=useState(false)
    const handleClick =()=>setClick(!click)
    return(
        <>
        <nav >
            <div>
                <NavLink exact to="/" >
                    Videogames App
            
                </NavLink>
                <form  >
                    <input onChange={handleInput}  type="text" placeholder='Search games'  />
                    <button onClick={handleSearch}>Search</button>
                </form>
                <ul >
                    <li>
                        <NavLink
                            exact to="/home"           
                            onClick={handleClick}
                        >
                            Home </NavLink>
                    </li>
                    <li >
                        <NavLink
                            exact
                            to="/create"
                            
                            onClick={handleClick}
                        >
                            Create
                        </NavLink>
                    </li>
                    <li >
                        <NavLink
                            exact
                            to="/Favorites"
                        
                            onClick={handleClick}
                        >
                            Favorites
                        </NavLink>
                    </li>
                    <li >
                        <NavLink
                            exact
                            to="/about"
                           
                            onClick={handleClick}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
                <div onClick={handleClick}>
                   
                </div>
            </div>
        </nav>
    </>
);
}
//searchBar: un input de búsqueda para encontrar videojuegos por nombre.