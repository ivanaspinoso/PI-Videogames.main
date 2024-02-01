import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from "./Views/Home/Home.jsx";
import { Create } from "./Views/CreateGame/Create";
import { Landing } from "./Views/Landing/Landing.jsx";
import { Detail } from "./Views/Detail/Detail.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getVideogames } from "./Redux/Actions/actions";

function App() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.videoGames);

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <Router>
      <div>
  
        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home videogames={videogames} />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detail/:id" element={<Detail videogames={videogames} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

