"use server";

// import { db, sql } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

// const client = await db.connect();

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

export async function addUser(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  console.log(typeof password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("username: " + username);
  console.log("password: " + hashedPassword);
  try {
    // const data = await client.sql`
    const data = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${hashedPassword})
      RETURNING username
    `;
    // console.log("========================");
    console.log(data);
    // return data; // Returning the username of the newly added user
  } catch (error) {
    console.log(error);
  }
}
