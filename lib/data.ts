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
  console.log(...formData);
  try {
    // const hashedPassowrd = await bcrypt.hash(formData.password, 10);
    // const data = await client.sql`
    // const data = await sql`
    //   INSERT INTO users (username, email, password)
    //   VALUES (${username}, ${password})
    //   RETURNING username
    // `;
    console.log("========================");
    // console.log(data);
    // return data; // Returning the username of the newly added user
  } catch (error) {
    console.log(error);
  }
}
