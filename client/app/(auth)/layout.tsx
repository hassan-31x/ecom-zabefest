import Logo from "@/components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-2xl px-0 md:px-20 xl:px-0 mx-auto min-h-screen md:flex">
      <div className=" w-1/2 hidden md:block"></div>
      <div className="w-1/2 flex flex-col items-center min-h-full justify-center">
        <div className="flex gap-4 items-center">
          <Logo />
          <h3 className="text-xl md:text-2xl font-bold">E Mart</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
