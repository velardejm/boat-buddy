import SignupForm from "@/components/custom/SignupForm";
// import LoginForm from "@/components/custom/LoginForm";
// import Navbar from "@/components/custom/Navbar";

export default function Page() {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center h-[80dvh]">
          <SignupForm />
          {/* <LoginForm /> */}
        </div>
      </div>
    </>
  );
}
