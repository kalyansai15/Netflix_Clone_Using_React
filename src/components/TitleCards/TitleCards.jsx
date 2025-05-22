import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title,catrgory}) => {

  const [apiData, setApiData]= useState([])

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mjg5NmM1M2MwNGE3NTA4MDY1YTAxZWQyOWRjNjIwYiIsIm5iZiI6MTc0Nzc1MjAxNy40MTYsInN1YiI6IjY4MmM5NDUxMWEzOGVjYWJjYjJmN2E2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Esj9XS_FTDl8sVr91EGw8w_eW6O3SPy5cglOMuyF0zc'
  }
};



  const handleWheel =(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;
  }
  useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${catrgory?catrgory:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return ( 
    <div className='title-cards'>
      <h2> {title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id} `} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p> {card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards