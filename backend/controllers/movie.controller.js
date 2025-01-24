import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req,resp){
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie=data.results[Math.floor(Math.random()*data.results?.length)];
        resp.json({success:true,content:randomMovie});
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({success:false,message:"Internal Server Error 12"});
    }
}

export async function getMovieTrailers(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`) ;
        resp.json({success:true,trailers:data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return resp.status(404).send(null);
        }
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export async function getMovieDetails(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`) ;
        resp.status(200).json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return resp.status(404).send(null);
        }
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export async function getSimilarMovies(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`) ;
        resp.status(200).json({success:true,similar:data.results});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }   
}

export async function getMoviesByCategory(req,resp){
    const {category}= req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        resp.status(200).json({success:true,content:data.results});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
} 