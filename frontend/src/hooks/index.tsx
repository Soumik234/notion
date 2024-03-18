import { useState , useEffect} from 'react';
import axios from 'axios';
export const useBlogs = () => {
        const [loading,setLoading]=useState(false);
        const [blogs,setBlogs]=useState([]);

        useEffect(()=>{
            setLoading(true);
            axios.get(`{BACKEND_URL}/api/v1/blog/bulk`)
            .then(response=>{
                setBlogs(response.data.blogs);
                setLoading(false);
            })
        },[])
        return {
            loading,
            blogs
        }
    }