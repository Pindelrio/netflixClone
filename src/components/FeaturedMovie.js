import react from "react";
import './FeaturedMovie.css'

export default({item})=>{
    
    console.log(item);
    
    let description = item.overview;
    if (description.length > 200){
        description = description.substring(0,200) + '...';
    }
    
    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres){
        genres.push(item.genres[i].name);
    }
    return(
 
        <section className="featured" style={
            {
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(http://image.tmdb.org/t/p/original${item.backdrop_path})`
            }
        }>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} Puntos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{description}</div>
                    <div className="featured--buttons">
                        <a href={`/watch/${item.id}`} className="featured--watchbutton">▶ Play</a>
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Mi lista</a>
                    </div>
                    <div className="featured--genres"><strong>Generos: {genres.join(', ')}</strong></div>
                </div>
            </div>
        </section>
        
    );
}