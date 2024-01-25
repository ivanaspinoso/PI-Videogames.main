import React from 'react'

export const Pagination = ({videogamesPerPage, totalVideogames, paginate}) => {
   // Calcula el número total de páginas necesarias, obtengo el num entero mas cercano hacia arriba
    const numOfPages= Math.ceil(totalVideogames/videogamesPerPage)

    // inicializo un array para almacenar los numeros de pagina
    const pageNumbers=[];

    //lleno el array con los numeros de pagina del 1 al numero total de paginas
    for (let i = 1; i <= numOfPages; i++) {
        pageNumbers.push(i)
    }
  return (
    <nav>
     {pageNumbers.map((num)=>(
        //para cada numero de pagina, renderizo un boton
        //Cada botón tiene un evento onClick que llama a la función paginate con el número de página como argumento.
        <div key={num}>
            <button key={num} onClick={()=> paginate(num)}>
             {num}
            </button>

        </div>
     ))}

    </nav>
  )
}
