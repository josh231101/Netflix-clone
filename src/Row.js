import React, {useState,useEffect} from 'react'
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {
    const [movies, setMovies] = useState([])
    const [trailerUrl ,setTrailerUrl] = useState("") 

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
    const opts = {
        height : "390",
        width : "100%",
        playerVars : {
            autoplay : 1,
        },
    }
    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl('')
        }else{
            movieTrailer(movie?.name || "")
            .then(url =>{
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))
        }
    }
    return (
        <div className="row">
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
                        alt={movie.name}/>
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/> }
            
        </div>
    )
}

export default Row
