'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { checkSession, createSession } from './session';

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
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await sql`
    SELECT 1 FROM users WHERE username = ${username} LIMIT 1
    `;

    if (userExists.rowCount === 1) return { message: 'Username alrerady exists.', success: false };

    const data = await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${hashedPassword})
        RETURNING userId
      `;

    console.log(data);

    // await createSession(data.rows[0].userId);

    return { message: 'Signup Successful', success: true };
  } catch (error) {
    console.log(error);
    return {
      message: 'Signup failed, please try again later.',
      success: false
    };
  }
}

export async function login(prevState: { message: string; success: boolean }, formData: FormData) {
  // const username = formData.get('username') as string;
  // const password = formData.get('password') as string;
  // const userExists = await sql`
  // SELECT 1 FROM users WHERE username = ${username} LIMIT 1
  // `;

  // if (userExists.rowCount === 0) {
  //   return { message: 'Username not found.', success: false };
  // }

  // const result = await sql`
  // SELECT userId, password FROM users WHERE username = ${username} LIMIT 1
  // `;
  // const { password: hashedPassword, userId } = result.rows[0];

  // const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  // if (isPasswordCorrect) {
  //   await createSession(userId);
  //   return { message: 'Successfully logged in.', success: true };
  // } else {
  //   return {
  //     message: 'Log in failed. Please try again later.',
  //     success: false,
  //   };
  // }

  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const userExists = await sql`
    SELECT 1 FROM users WHERE username = ${username} LIMIT 1
    `;

    if (userExists.rowCount === 0) {
      return { message: 'Username not found.', success: false };
    }

    const result = await sql`
    SELECT userId, password FROM users WHERE username = ${username} LIMIT 1
    `;
    const { password: hashedPassword, userid } = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    console.log(isPasswordCorrect);

    await createSession(userid);
    return { message: 'Successfully logged in.', success: true };
  } catch (error) {
    console.log(error);
    return {
      message: 'Log in failed. Please try again later.',
      success: false
    };
  }
}

export async function createTrip(
  prevState: { message: string; success: boolean },
  formData: FormData
) {
  // 1. Check if logged in
  // add this in route middleware route instead of checking again
  // 2. Run create trip query
  try {
    // Check if user alreadt created another trip on the same date
    // check if user and date selected exists
    const { payload } = await checkSession();
    const userId = payload?.userId as string;
    const tripDate = formData.get('date') as string;
    const result = await sql`
    WITH existing_trip AS (
      SELECT 1 
      FROM trip_requests WHERE created_by=${userId} AND
      trip_date = ${tripDate}::date or trip_date = ${tripDate}::date + INTERVAL '1 day'
      LIMIT 1
    )
    SELECT
      CASE
        WHEN EXISTS (SELECT 1 from existing_trip) THEN 'Error: Trip with same date or next day already exists.'
        WHEN ${tripDate} < CURRENT_DATE + INTERVAL '7 days' THEN 'Error: Trip must be at least 7 days in advance.'
        ELSE 'valid'
      END AS validation_status
    `;
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  console.log(formData);
  return { message: 'Test', success: true };
}
