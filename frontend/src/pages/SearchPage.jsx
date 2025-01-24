import { useState } from "react"
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {

    const [activeTab,setActiveTab]=useState("movie");
    const [searchTerm,setSearchTerm]=useState("");
    const [results,setResults]=useState([]);
    const {setContentType}=useContentStore();
    const [loading,setLoading]=useState(false);
    const handleTabClick=(tab)=>{
        setActiveTab(tab);
        setResults([]);
        setSearchTerm("");
        activeTab==="movie"? setContentType("movie"):setContentType("tv");
    }
    const handleSearch=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const response=await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(response.data.content);
        } catch (error) {
            if(error.response.status===404){
                toast.error("Nothing found, make sure you are searching for right category")
            }
            else{
                (error.message);
                toast.error("An Error occurred, please try again later")
            }
        }
        setLoading(false);
    };

    
  return (
    <div className="bg-black min-h-screen text-white">
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center gap-3 mb-4 ">
                <button className={`py-2 px-4 rounded ${activeTab==="movie"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>{handleTabClick("movie")}}>Movies</button>
                <button className={`py-2 px-4 rounded ${activeTab==="tv"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>{handleTabClick("tv")}}>TV Shows</button>
                <button className={`py-2 px-4 rounded ${activeTab==="person"?"bg-red-600":"bg-gray-800"} hover:bg-red-700`} onClick={()=>{handleTabClick("person")}}>Person</button>
            </div>
            <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
                <input 
                type="text"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder={"Search for a "+ (activeTab==="tv"?"tv show":activeTab)}
                className="w-full p-2 rounded bg-gray-800 text-white"></input>
                <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                    <Search className="size-6"/>
                </button>
            </form>
            {loading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex flex-col bg-gray-800 h-72 md:h-96 shimmer rounded-lg "
                        />
                      ))}
                      </div>
            )}
            {!loading && (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {results.map((result)=>{
                    if(!result.poster_path && !result.profile_path) return null;
                    return (
                        <div className="bg-gray-800 p-4 rounded" key={result.id}>
                            {activeTab==="person"?(
                                <div className="flex flex-col items-center cursor-pointer">
                                    <img src={ORIGINAL_IMG_BASE_URL+result.profile_path} alt={result.name} className="max-h-72 md:max-h-96 rounded mx-auto"></img>
                                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                                </div>
                            ):(
                                <Link to={'/watch/'+result.id} onClick={()=>setContentType(activeTab)}>
                                    <img src={ORIGINAL_IMG_BASE_URL+result.poster_path} alt={result.title || result.name} className="w-full h-auto rounded "></img>
                                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                                </Link>
                            )}
                        </div>
                    )
                })}
            </div>
            )}
            
        </div>
    </div>
  )
}

export default SearchPage
