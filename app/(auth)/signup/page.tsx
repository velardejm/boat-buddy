"use server";

import SignupForm from "@/components/custom/SignupForm";

export default async function Page() {
  return (
    <div className="flex justify-center">
      <SignupForm />
    </div>
  );
}
