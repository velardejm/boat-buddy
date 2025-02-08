import LoginForm from "@/components/custom/LoginForm";
import { checkSession } from "@/lib/session";

export default async function Page() {
  const isSession = await checkSession();

  return (
    <>
      <div>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center h-[80dvh]">
          {isSession ? <p className="text-3xl">Welcome!</p> : <LoginForm />}
          {/* <LoginForm /> */}
        </div>
      </div>
    </>
  );
}
