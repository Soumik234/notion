import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  
  "title": string;
  "content": string;
  "id": number
  "author": {
    "name": string;
  };
  "PostPhoto":{
    "imageUrl":string;
  }
  tags: {
    name: string[];
  };

}


export const useBlog= ({id}:{id:string})=>{
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs", error);
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    blog,
  };
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs", error);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    blogs,
  };
};
