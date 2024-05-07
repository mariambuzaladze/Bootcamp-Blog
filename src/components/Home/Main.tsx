import { useState, useEffect } from "react";
import BlogIllustration from "/images/Blog-1024x355 1.png";

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
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  async function getData(item: string) {
    let response = await fetch(`https://george.pythonanywhere.com/api/${item}`);
    let data = await response.json();
    return data;
  }

  useEffect(() => {
    getData("categories")
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    getData("blogs")
      .then((data) => setBlogs(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) =>
        blog.categories.some((category) => category.id === selectedCategory)
      )
    : blogs;

  return (
    <main className="flex flex-col bg-gray-100 min-h-screen p-[76px] gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800">
          ბლოგი
        </h1>
        <img src={BlogIllustration} alt="blog illustration" />
      </div>

      <div className="flex gap-2 self-center">
        {categories.map((category: ICategory) => (
          <div
            key={category.id}
            className={`px-3 py-2 rounded-full cursor-pointer ${
              selectedCategory === category.id
                ? "bg-gray-500 border border-gray-700"
                : ""
            }`}
            style={{
              backgroundColor: category.background_color,
              color: category.text_color,
            }}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.title}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {filteredBlogs.map((blog: IBlog) => (
          <div key={blog.id} className="flex flex-col gap-4">
            <div className="h-[328px] flex justify-center items-center overflow-hidden rounded-lg">
              <img
                src={blog.image}
                alt="blog image"
                className="object-cover rounded-lg"
              />
            </div>

            <div>
              <p className="text-base font-bold leading-5 text-gray-700">
                {blog.author}
              </p>
              <p className="text-xs leading-4 text-gray-600">
                {blog.publish_date}
              </p>
            </div>

            <p className="text-lg leading-5 font-bold text-gray-700">
              {blog.title}
            </p>
            <p className="text-base leading-7 text-gray-800">
              {blog.description}
            </p>

            <div className="flex flex-wrap  items-center gap-[16px]">
              {blog.categories.map((category: ICategory) => (
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

            <a className="text-sm font-bold leading-6 text-indigo-600">
              სრულად ნახვა
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
