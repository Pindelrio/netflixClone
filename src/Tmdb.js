const API_KEY = 'f36243b3c2638adb982c95c1bd27c4cb';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- Netflix originals
- recomended
- top rated
- comedy
- terror
- romance
- documentals
*/

const basicFetch = async (endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`);
    return req.json();
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix originals',
                items: await basicFetch(`/discover/tv?with_network=213&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'recomended',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'topRated',
                title: 'Mas valorados',
                items: await basicFetch(`/movie/top_rated?language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFetch(`/discover/movie?with_genres=28&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'terror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=es-ES&api_key=${API_KEY}`)
            },
            {
                slug: 'documentals',
                title: 'Documentales',
                items: await basicFetch(`/discover/movie?with_genres=99&language=es-ES&api_key=${API_KEY}`)
            },

        ];
    },

    getMovieInfo: async (movieId, type) => {

        let info ={};
        if(movieId)
        {
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=es-ES&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=es-ES&api_key=${API_KEY}`);
                    break;
                default :
                    info = null;
                    break;
            }
        }
        return info;
    }
}