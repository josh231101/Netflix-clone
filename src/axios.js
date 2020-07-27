import axios from "axios";

//THIS IS THE BASE OF THE URL
const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3"
});

export default instance;