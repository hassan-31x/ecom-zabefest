import Logo from "@/components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen-2xl px-0 md:px-20 lg:px-0 mx-auto min-h-screen flex ">
      <div className=" w-1/2 hidden lg:block border rounded-[8rem] my-10 2xl:my-16 mx-8 2xl:px-0"></div>
      <div className="w-full lg:w-1/2 flex flex-col items-center h-auto py-12 my-auto">
        <div className="flex gap-3 items-center mb-6">
          <Logo />
          <h3 className="text-xl md:text-2xl font-bold">E Mart</h3>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
