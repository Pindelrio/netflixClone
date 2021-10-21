import React, { useEffect, useState } from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header'
import Tmdb from './Tmdb';
import './App.css';

export default()=>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setfeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      //Paste all list
      let list = await Tmdb.getHomeList();
      
      setMovieList(list);

      //Paste featured Movie
      let originals = list.filter(i=>i.slug ==='originals');
      let randomChosen = Math.floor(Math.random()*(originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setfeaturedData(chosenInfo);
    }
    loadAll();
  },[]);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }
      else
      {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      
      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }
      
      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
      
      <footer>
        Fet amb amor <span role="img" aria-label="cor">Love </span> pel Pindelrio <br></br> 
        Derechos imagen Netflix <br></br>
        Dades obtingudes de Themoviedb.org
      </footer>
      {movieList.length <= 0 && 
            <div className="loading">
              <img src="https://www.metageek.com/img/buffering-800px.gif" alt="loading" />
            </div>
      }
    </div>
    );
    
}