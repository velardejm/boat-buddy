"use server";

// import { useEffect } from "react";

import { checkSession, deleteSession } from "@/lib/session";
import LogoutButton from "@/components/custom/LogoutButton";

export default async function Page() {
  //   const checkFunction = async (): Promise<boolean> => {
  //     return await checkSession();
  //   };

  const isSession = await checkSession();
  // const logOut = async () => {
  //   await deleteSession();
  // };

  return (
    <div>
      <h1>Test Page</h1>
      <p>{isSession ? "Session exists" : ""}</p>
      {/* <button onClick={logOut}>Log Out</button> */}
      <LogoutButton deleteSession={deleteSession} />
    </div>
  );
}
