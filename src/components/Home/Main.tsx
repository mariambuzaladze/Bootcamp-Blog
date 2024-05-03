import BlogIllustration from "/images/Blog-1024x355 1.png";

export default function Main() {
  return (
    <main className="bg-gray-100 h-screen p-[76px]">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-bold leading-tight text-gray-800">
          ბლოგი
        </h1>
        <img src={BlogIllustration} alt="blog illustration" />
      </div>
    </main>
  );
}
