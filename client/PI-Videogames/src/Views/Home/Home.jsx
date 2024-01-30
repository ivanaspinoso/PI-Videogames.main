import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Loading } from '../Loading/loading';
import { Game } from '../../Components/Game/Game.jsx';
import { Filters } from '../../Components/Filters/Filters';
import s from './Home.module.css';
import { getVideogames } from '../../Redux/Actions/actions';
import Pagination from '../../Components/Pagination/Pagination';

export const Home = () => {
  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videoGames);
  const filteredGames = useSelector(state => state.filteredVideogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getVideogames());
    setLoading(false);

  }, []); 
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastGame = currentPage * gamesPerPage; // 15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 15 - 15
  const currentGames =  filteredGames?.slice(indexOfFirstGame, indexOfLastGame) || videogames?.slice(indexOfFirstGame, indexOfLastGame);


  return (
    <main className={s.background}>
       <Navbar /> 
      <Filters />
      
      <div className={s.games}> 
        {loading ? (
          <Loading />
        ) : currentGames.length > 0 ? (
          currentGames.map((game, idx) => <Game  {...game} key={idx} />)
        ) : (
          <p>No games found</p>
        )}
       <div className={s.pagination}>
        <Pagination gamesPerPage={gamesPerPage} totalGames={videogames?.length} paginate={paginate}/>
      </div>
       
      </div>
      
    </main>
  );
};
