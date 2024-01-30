import React from 'react'

function Pagination({ gamesPerPage, totalGames, paginate }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(n => (
                    <li key={n} className='page-item'>
                        <button onClick={() => paginate(n)} className='page-link' >
                            {n}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
