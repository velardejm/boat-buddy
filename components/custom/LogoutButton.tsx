"use client";

export default function LogoutButton({
  deleteSession,
}: {
  deleteSession: () => Promise<void>;
}) {
  const logOut = async () => {
    await deleteSession();
  };

  return <button onClick={logOut}>Log Out</button>;
}
