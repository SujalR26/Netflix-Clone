import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req,resp){
    try {
        const data=await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv=data.results[Math.floor(Math.random()*data.results?.length)];
        resp.json({success:true,content:randomTv});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error "});
    }
}

export async function getTvTrailers(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`) ;
        resp.json({success:true,trailers:data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return resp.status(404).send(null);
        } 
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export async function getTvDetails(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`) ;
        resp.status(200).json({success:true,content:data});
    } catch (error) {
        if(error.message.includes("404")){
            return resp.status(404).send(null);
        }
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export async function getSimilartvs(req,resp){
    const {id}=req.params;
    try {
        const data= await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`) ;
        resp.status(200).json({success:true,similar:data.results});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }   
}

export async function getTvsByCategory(req,resp){
    const {category}= req.params;
    try {
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        resp.status(200).json({success:true,content:data.results});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}