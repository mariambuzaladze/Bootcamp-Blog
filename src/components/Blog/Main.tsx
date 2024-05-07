import Arrow from "/images/Arrow.png";
import { useEffect, useState } from "react";

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

export default function Main() {
  const [blog, setBlog] = useState<IBlog>();

  async function getData() {
    let response = await fetch("https://george.pythonanywhere.com/api/blogs");
    let data = await response.json();
    return data[0];
  }

  useEffect(() => {
    getData()
      .then((data) => setBlog(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen flex relative justify-center pt-[40px] pb-[5px] px-[76px]">
      <img
        src={Arrow}
        alt="arrow"
        className="absolute left-[76px] rounded-full sm:block hidden cursor-pointer"
      />

      <div key={blog?.id} className="flex flex-col gap-4">
        <img
          src={blog?.image}
          alt="blog image"
          className="object-cover rounded-lg"
        />

        <div>
          <p className="text-base font-bold leading-5 text-gray-700">
            {blog?.author}
          </p>
          <div className="flex gap-2">
            <p className="text-xs leading-4 text-gray-600">
              {blog?.publish_date.split("T")[0]}
            </p>
            <p className="text-xs leading-4 text-gray-600">{blog?.email}</p>
          </div>
        </div>

        <p className="text-3xl leading-5 font-bold text-gray-700">
          {blog?.title}
        </p>

        <div className="flex flex-wrap  items-center gap-[16px]">
          {blog?.categories.map((category: ICategory) => (
            <div
              key={category.id}
              className="px-3 py-2 rounded-full"
              style={{
                backgroundColor: category.background_color,
                color: category.text_color,
              }}
            >
              {category.title}
            </div>
          ))}
        </div>

        <p className="text-base leading-7 text-gray-800">{blog?.description}</p>
      </div>
    </main>
  );
}
