import Logo from "/images/LOGO-02 3.png";

export default function Header() {
  return (
    <header className="flex justify-center items-center py-5 px-[76px] border border-gray-300">
      <img src={Logo} alt="redberry logo" />
    </header>
  );
}
