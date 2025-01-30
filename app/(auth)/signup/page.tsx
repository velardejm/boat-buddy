"use server"

import SignupForm from "@/components/custom/SignupForm";
import { addUser } from "@/lib/data";

export default async function Page() {
  return (
    <div className="flex justify-center">
      <SignupForm addUserAction={addUser} />
    </div>
  );
}
