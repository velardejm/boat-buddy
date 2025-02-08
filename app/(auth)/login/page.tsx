"use server";

import LoginForm from "@/components/custom/LoginForm";

export default async function Page() {
  return (
    <div className="flex justify-center">
      <LoginForm />
    </div>
  );
}
