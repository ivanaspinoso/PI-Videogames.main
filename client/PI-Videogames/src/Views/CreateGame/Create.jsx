import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideoGame, getGenres } from '../../Redux/Actions/actions';
import { Navbar } from '../../Components/Navbar/Navbar';
import "./Create.css"

export const Create = () => {
  const dispatch = useDispatch();
  const newVideogame = useSelector((state) => state.newVideogame);
  const genres = useSelector((state) => state.genres || [] );
  const genres1 = genres?.slice(0, 10) || [];
  const genres2 = genres?.slice(10, 20) || [];
  const [showAlert, setShowAlert] = useState(false); 
  const allGenres= [...genres1, ...genres2];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });

  useEffect(() => {
    if (newVideogame !== null) {
      showAlert && alert("¡Felicidades, tu videojuego fue creado con éxito!");
      setShowAlert(false);
    }
  }, [newVideogame, showAlert]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === 'genres' || e.target.name === 'platforms') {
      const arr = formData[e.target.name];
      setFormData({
        ...formData,
        [e.target.name]: arr.concat(e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Debes completar el nombre");
      return;
    }

    if (!formData.description) {
      alert("Debes completar la descripción");
      return;
    }



    if (!formData.released) {
      alert("Debes completar la fecha de lanzamiento");
      return;
    }

    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      alert("El rating debe ser un número entre 0 y 5");
      return;
    } 

    if(formData.platforms.length===0){
      alert("Debes seleccionar al menos una plataforma")
      return;
    }

    if(formData.genres.length===0){
      alert("Debe seleccionar al menos un género")
      return;
    }

    dispatch(createVideoGame(formData));
   setShowAlert(true);
    setFormData({
      name: '',
      description: '',
      platforms: [],
      released: '',
      rating: '',
      genres: [],
    });
  };

  return (
    <div className="create-background">
        <Navbar />
        <div className='create-container'>
      <h2 className="create-title">¡Crea un nuevo Videojuego!</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="create-label-title">Nombre:</label>
        <input name="name" type="text" id="name" className="create-input" onChange={handleChange} placeholder="Name" />

        <label htmlFor="description" className="create-label-title">Descripcion:</label>
        <textarea name="description" id="description" className="create-input" onChange={handleChange} placeholder="Description"></textarea>

        <label htmlFor="rating" className="create-label-title">Rating:</label>
        <input type="text" name="rating" className="create-input" onChange={handleChange} placeholder="Rating" />

        <label htmlFor="released" className="create-label-title">Fecha de lanzamiento:</label>
        <input type="date" name="released" className="create-input" onChange={handleChange} placeholder="Released" />

        <label className="create-label-title">Género:</label>
<div className="create-genres-container">
  {allGenres.map((gen) => (
    <div className="create-div-genre" key={gen.name}>
      <input
        type="checkbox"
        name="genres"
        value={gen.name}
        onChange={handleChange}
        checked={formData.genres.includes(gen.name)}
      />
      <label>{gen.name}</label>
    </div>

  ))}
</div>

        <label htmlFor="platforms" className="create-label-title">Platformas:</label>
        <div className="create-platforms-container">
          {['PC', 'iOS', 'Android', 'macOS', 'PlayStation 4', 'PlayStation 5', 'Xbox', 'PS Vita'].map((platform) => (
            <div className="create-div-genre" key={platform}>
              <input type="checkbox" name="platforms" value={platform} onChange={handleChange} />
              <label>{platform}</label>
            </div>
          ))}
        </div>
        <div>
      <input type='file'  style={{
        margin: '20px 0px'
      }}/>
</div>
        <button type="submit" className="create-btn">Crear Videojuego</button>
      </form>

      </div>
      
    </div>
    
  );
};

