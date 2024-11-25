import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

        const headers = token ? { Authorization: token } : {};
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/blogs`, {
          headers,
        });
        setBlogs(res.data.posts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [BACKEND_URL]);

  return {
    loading,
    blogs,
  };
};
