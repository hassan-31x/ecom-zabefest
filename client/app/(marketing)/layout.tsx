import Navbar from "./_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-[#F0ECE5]">
      <Navbar />
      <main className="pt-36 pb-20 bg-[#F0ECE5]">{children}</main>
    </div>
  );
};

export default MainLayout;
