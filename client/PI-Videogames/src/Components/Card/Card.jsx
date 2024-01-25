import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

export const Card = ({id,name, genres,released,platforms,image,rating}) => {

  return (
    <div id={id}>
    <Link to={`/detail/${id}`}>
      {name}
    </Link>
    <p> genre : {genres.join(', ')}</p>
    <p> released: {released}</p>
    <p> platforms: {platforms.join(', ')}</p>
    <p> rating: {rating}</p>
    <img src={image} alt="not found" />
    
  
    </div>

  )
}
//rating, released, image, platforms,description,name