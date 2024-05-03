import Logo from "/images/LOGO-02 3.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-[76px] border border-gray-300">
      <img src={Logo} alt="redberry logo" />

      <button className="rounded-lg bg-indigo-600 text-white text-base font-medium leading-snug px-[20px] py-[10px]">
        შესვლა
      </button>
    </header>
  );
}
