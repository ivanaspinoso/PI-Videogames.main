import React from 'react'
import { Link } from 'react-router-dom'
import s from "./Landing.module.css"

export const Landing = () => {
  return (
    <div className={s.landing}>
      <h1 className={s.title}>Videogames</h1>
      <Link to="/">
        <button className={s.eightbitBtn}>
          Play!
        </button>
      </Link>



    </div>
  )
}
