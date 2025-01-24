import { useEffect, useState } from "react"
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
    const [trendingContent,setTrendinContent]=useState(null);
    const {contentType}=useContentStore();

    useEffect(()=>{
        const getTrendingContent=async()=>{
            setTrendinContent(null);
            const response=await axios.get(`/api/v1/${contentType}/trending`);
            setTrendinContent(response.data.content);
        }
        getTrendingContent();
    },[contentType]);

    return {trendingContent};
}

export default useGetTrendingContent