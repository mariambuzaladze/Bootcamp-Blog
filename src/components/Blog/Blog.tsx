import Header from "../AddBlog/Header";
import Main from "./Main";

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

export default function Blog({ blog }: { blog: IBlog }) {
  return (
    <div>
      <Header />
      <Main blog={blog} />
    </div>
  );
}
