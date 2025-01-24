import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req,resp){
    const {query}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return resp.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            //$push is used to push something in the array 
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchType:"Person",
                    createdAt:new Date()
                }
            }
        })

        resp.status(200).json({success:true,content:response.results});

    } catch (error) {
        console.log("SearchPerson controller error ",error.message);
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}


export async function searchMovie(req,resp){
    const { query }=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return resp.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchType:"Movie",
                    createdAt:new Date()
                }
            }
        })

        resp.status(200).json({success:true,content:response.results});

    } catch (error) {
        console.log("SearchMovie controller error ",error.message);
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}


export async function searchTv(req,resp){
    const {query}=req.params;
    try {
        const response=await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return resp.status(404).send(null);
        };
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"Tv",
                    createdAt:new Date()
                }
            }
        })

        resp.status(200).json({success:true,content:response.results}); 
    } catch (error) {
        console.log("SearchTv controller error ",error.message);
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}


export async function getSearchHistory(req,resp){
    try {
        resp.status(200).json({success:true,content:req.user.searchHistory});
    } catch (error) {
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}


export async function removeItemFromSearchHistory(req,resp){
    let {id}=req.params;
    //from params we get id as string but in real id is type of int so we need to change it to int
    id=parseInt(id);
    try {
        await User.findByIdAndUpdate(req.user._id,{
            //$pull is used to pull somethig from the array
            $pull:{
                searchHistory:{id:id}
            }
        });

        resp.status(200).json({success:true,message:"Item removed from search history"});

    } catch (error) {
        console.log("Error in removeItemFromSearchHistory ",error.message);
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}