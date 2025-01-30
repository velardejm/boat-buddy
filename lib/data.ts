"use server";

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

import { z } from "zod";

export async function getUsers() {
  try {
    const data = await sql`
        SELECT * FROM users
        `;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addUser2(
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  console.log(`Server says hello: ${formData.get("checkBox")}`);
  // Do your stuff here
  return { message: "Form submitted" }; // or some relevant message
}

export async function addUser(
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  
  try {
    const data = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${hashedPassword})
      RETURNING username
    `;
    
    console.log(data);
    return { message: "Ok" };

    // return data; // Returning the username of the newly added user
  } catch (error) {
    console.log(error);
    return { message: "Error" };
  }

}
