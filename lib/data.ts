"use server";

import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { createSession } from "./session";

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

export async function addUser(
  prevState: { message: string; success: boolean },
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await sql`
    SELECT 1 FROM users WHERE username = ${username} LIMIT 1
    `;

    if (userExists.rowCount === 1)
      return { message: "Username alrerady exists.", success: false };

    const data = await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${hashedPassword})
        RETURNING userId
      `;

    await createSession(data.rows[0].userId);

    return { message: "Signup Successful", success: true };
  } catch (error) {
    return {
      message: "Signup failed, please try again later.",
      success: false,
    };
  }
}
