import Logo from "@/components/logo";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5 px-6 bg-orange-500 text-white">
      <div className="flex items-center justify-center">
        <Logo />
        <h1 className="text-lg font-bold ms-1">E Mart</h1>
      </div>
    </nav>
  );
}
