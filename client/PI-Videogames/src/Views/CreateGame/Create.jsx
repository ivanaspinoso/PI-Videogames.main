import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVideoGame, getGenres } from '../../Redux/Actions/actions';
import { Navbar } from '../../Components/Navbar/Navbar';
import "./Create.css"

export const Create = () => {
  const dispatch = useDispatch();
  const newVideogame = useSelector((state) => state.newVideogame);
  const genres = useSelector((state) => state.genres || [] );
  const genrestest = useSelector((state) => state );
  const genres1 = genres?.slice(0, 10) || [];
  const genres2 = genres?.slice(10, 20) || [];

  const allGenres= [...genres1, ...genres2];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platforms: [],
    released: '',
    rating: '',
    genres: [],
  });
console.log(newVideogame, 'newvideogame')
useEffect(() => {
  newVideogame &&  alert("¡Felicidades, tu videojuego fue creado con éxito!");

}, [newVideogame])
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

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];

    // Verificar si se seleccionó un archivo
    if (!imageFile) {
        console.error('No se ha seleccionado ningún archivo.');
        return;
    }

    // Crear una promesa para manejar la lógica asíncrona
    const readImageFile = () => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Definir el manejo de errores
            reader.onerror = (error) => {
                reject(error);
            };

            // Definir el manejo al completar la lectura
            reader.onloadend = () => {
                if (reader.result) {
                    resolve(reader.result);
                } else {
                    reject(new Error('El resultado de la lectura es nulo.'));
                }
            };

            // Leemos el contenido del archivo como una URL de datos
            reader.readAsDataURL(imageFile);
        });
    };

    try {
        const imageDataURL = await readImageFile();
        setFormData({
            ...formData,
            image: imageDataURL,
        });
        console.log(imageDataURL, 'imageDataURL');
        console.log(formData);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
    }
};

  



  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name) {
      alert("¡Ups! falta el nombre");
      return;
    }

    if (!formData.description) {
      alert("¡Ups! falta la descripción");
      return;
    }



    if (!formData.released) {
      alert("¡Ups! falta la fecha de lanzamiento");
      return;
    }


    //primero convertimos formData.rating a un número utilizando parseFloat y luego verificamos si es un número válido y si está en el rango correcto. Esto debería solucionar el problema que estás experimentando. Asegúrate de realizar esta corrección y prueba nuevamente.
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      alert("¡Ups! el rating debe ser un número entre 0 y 5");
      return;
    } 

    if(formData.platforms.length===0){
      alert("¡Ups! falta que elijas las plataformas")
      return;
    }

    if(formData.genres.length===0){
      alert("¡Ups! falta que elijas los géneros")
      return;
    }

    dispatch(createVideoGame(formData));

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
        <label htmlFor="name" className="create-label-title">Name:</label>
        <input name="name" type="text" id="name" className="create-input" onChange={handleChange} placeholder="Name" />

        <label htmlFor="description" className="create-label-title">Description:</label>
        <textarea name="description" id="description" className="create-input" onChange={handleChange} placeholder="Description"></textarea>

        <label htmlFor="rating" className="create-label-title">Rating:</label>
        <input type="text" name="rating" className="create-input" onChange={handleChange} placeholder="Rating" />

        <label htmlFor="released" className="create-label-title">Released:</label>
        <input type="date" name="released" className="create-input" onChange={handleChange} placeholder="Released" />

        <label className="create-label-title">Genres:</label>
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

        <label htmlFor="platforms" className="create-label-title">Platforms:</label>
        <div className="create-platforms-container">
          {['PC', 'iOS', 'Android', 'macOS', 'PlayStation 4', 'PlayStation 5', 'Xbox', 'PS Vita'].map((platform) => (
            <div className="create-div-genre" key={platform}>
              <input type="checkbox" name="platforms" value={platform} onChange={handleChange} />
              <label>{platform}</label>
            </div>
          ))}
        </div>

        <label htmlFor="image" className="create-label-title">Imagen:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />

        <button type="submit" className="create-btn">Crear Videojuego</button>
      </form>

      </div>
    </div>
  );
};



//const filteredVideogames= useSelector((state)=>state.filteredVideogames)