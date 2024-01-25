import { useSelector } from 'react-redux'
// import { getVideogames, searchByName } from '../../Redux/Actions/actions'
import { useEffect, useState } from 'react'
import { Navbar } from '../../Components/Navbar/Navbar'
import { Pagination } from '../../Components/Pagination/Pagination'
import { Loading } from '../Loading/loading'
import axios from 'axios'
import { Game } from '../../Components/Game/Game.jsx'
import { Filters } from '../../Components/Filters/Filters'

export const Home = () => {
  const videogames = useSelector(state => state.filteredVideogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15)
  const [genres,setGenres]=useState([])

  const indexOfLastGame = currentPage * gamesPerPage; // 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 15 - 15
  const currentGames = videogames?.slice(indexOfFirstGame, indexOfLastGame);
  useEffect(() => {
    const getGenres = async () => {
        try {
            const response = await axios.get('http://localhost:3001/genres');
            setGenres(response.data); // Almacena los géneros en el estado local
        } catch (error) {
            console.error('Error al obtener los géneros:', error);
        }
    };

    getGenres();
}, []);


  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
      <main>
          <Navbar />
          <Filters genres={genres} />
          <div>
              <div >
              {currentGames.length > 1 ? (
  currentGames.map((game, idx) => <Game {...game} key={idx} />)
) : (
  <Loading />
)}
              </div>
              <Pagination gamesPerPage={gamesPerPage} totalGames={videogames?.length} paginate={paginate} />
          </div>
      </main>
  )
}
