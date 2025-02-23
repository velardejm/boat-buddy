"use client";


import { useRouter } from "next/navigation";

export default function LogoutButton({
  deleteSession,
}: {
  deleteSession: () => Promise<void>;
}) {

  
  const router = useRouter();

  const logOut = async () => {
    router.push("/login");
    await deleteSession();
  };

  return <button onClick={logOut}>Log Out</button>;
}
