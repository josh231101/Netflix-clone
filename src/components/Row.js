import React, {useState,useEffect} from 'react'
import axios from "../API/axios";
import "./Row.css";
import MovieModal from './MovieModal';


const Row= ({title,fetchUrl,isLargeRow})=> {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([])
    const [modalVisibility,setModalVisibility] = useState(false);
    const [movieSelected, setMovieSelection] = useState({});

    //A snippet of code which runs based on a specific condition/variable
    useEffect(()=>{

        //if [], run once when the row loads, and dont run again 

        async function fetchData(){
            //Dont move until we get the API answer
            const request = await axios.get(fetchUrl);
            // GET REQUEST  = "https://api.themoviedb.org/3/fetchUrl"
            setMovies(request.data.results)
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    const handleClick = (movie) =>{
        setModalVisibility(true);
        setMovieSelection(movie);

    }
    return (
        <section className="row">
            {/** TITLE */}
            <h2>{title}</h2>
            
            <div className="row__posters">
                {/**SEVERAL ROW__POSTER */}
                {movies.map(movie=>(
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        loading="lazy"
                        alt={movie.name}/>
                ))}

            </div>
            {modalVisibility && <MovieModal {...movieSelected} setModalVisibility={setModalVisibility}/>}
        </section>
    )
}

export default Row
