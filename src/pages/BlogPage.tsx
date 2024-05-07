import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Blog from "../components/Blog/Blog";

interface ICategory {
  id: number;
  title: string;
  text_color: string;
  background_color: string;
}

interface IBlog {
  id: number;
  title: string;
  author: string;
  publish_date: string;
  description: string;
  image: string;
  email: string;
  categories: ICategory[];
}

export default function BlogPage() {
  const { id: idParam } = useParams<{ id?: string }>();
  const id = idParam || "";
  const [blog, setBlog] = useState<IBlog | null>(null);

  async function getData(id: string) {
    let response = await fetch("https://george.pythonanywhere.com/api/blogs");
    let data = await response.json();
    setBlog(data);
    return data[parseInt(id)];
  }

  useEffect(() => {
    getData(id)
      .then((data) => setBlog(data))
      .catch((error) => console.error(error));
  }, [id]);

  return blog ? <Blog blog={blog} /> : null;
}
