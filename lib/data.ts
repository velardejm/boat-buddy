'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { checkSession, createSession } from './session';

interface PrevState {
  message: string;
  success: boolean;
}

type AddUserFunction = (
  prevState: PrevState,
  formData: FormData
) => Promise<{ message: string; success: boolean }>;

interface Trip {
  tripid: string;
  created_by: string;
  trip_name: string;
  trip_location: string;
  trip_date: string;
  passengers_names: string[];
  no_of_passengers: number;
}

export async function getUsers() {
  try {
    const data = await sql`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const addUser: AddUserFunction = async (prevState, formData) => {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await sql`SELECT 1 FROM users WHERE username = ${username} LIMIT 1`;
    if (userExists.rowCount === 1) return { message: 'Username already exists.', success: false };

    const data = await sql`
      INSERT INTO users (username, password)
      VALUES (${username}, ${hashedPassword})
      RETURNING userId
    `;

    return { message: 'Signup Successful', success: true };
  } catch (error) {
    console.log(error);
    return { message: 'Signup failed, please try again later.', success: false };
  }
};

export async function login(prevState: PrevState, formData: FormData) {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const result =
      await sql`SELECT userId, password FROM users WHERE username = ${username} LIMIT 1`;
    if (result.rowCount === 0) return { message: 'Username not found.', success: false };

    const { password: hashedPassword, userid } = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (isPasswordCorrect) {
      await createSession(userid);
      return { message: 'Successfully logged in.', success: true };
    } else {
      return { message: 'Log in failed. Please try again later.', success: false };
    }
  } catch (error) {
    console.log(error);
    return { message: 'Log in failed. Please try again later.', success: false };
  }
}

export async function getTrips() {
  try {
    const data =
      // await sql`SELECT trip_id, created_by, trip_name, trip_location, trip_date, no_of_passengers FROM trip_requests`;
      await sql<Trip>`SELECT * FROM trip_requests`;
    // console.log(data.rows);
    // return [];
    return data.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// 'use server';

// import { sql } from '@vercel/postgres';
// import bcrypt from 'bcrypt';
// import { checkSession, createSession } from './session';

// export async function getUsers() {
//   try {
//     const data = await sql`
//         SELECT * FROM users
//         `;

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// export async function addUser(
//   prevState: { message: string; success: boolean },
//   formData: FormData
// ): Promise<{ message: string; success: boolean }> {
//   const username = formData.get('username') as string;
//   const password = formData.get('password') as string;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const userExists = await sql`
//     SELECT 1 FROM users WHERE username = ${username} LIMIT 1
//     `;

//     if (userExists.rowCount === 1) return { message: 'Username alrerady exists.', success: false };

//     const data = await sql`
//         INSERT INTO users (username, password)
//         VALUES (${username}, ${hashedPassword})
//         RETURNING userId
//       `;

//     console.log(data);

//     // await createSession(data.rows[0].userId);

//     return { message: 'Signup Successful', success: true };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: 'Signup failed, please try again later.',
//       success: false
//     };
//   }
// }

// export async function login(prevState: { message: string; success: boolean }, formData: FormData) {
//   // const username = formData.get('username') as string;
//   // const password = formData.get('password') as string;
//   // const userExists = await sql`
//   // SELECT 1 FROM users WHERE username = ${username} LIMIT 1
//   // `;

//   // if (userExists.rowCount === 0) {
//   //   return { message: 'Username not found.', success: false };
//   // }

//   // const result = await sql`
//   // SELECT userId, password FROM users WHERE username = ${username} LIMIT 1
//   // `;
//   // const { password: hashedPassword, userId } = result.rows[0];

//   // const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
//   // if (isPasswordCorrect) {
//   //   await createSession(userId);
//   //   return { message: 'Successfully logged in.', success: true };
//   // } else {
//   //   return {
//   //     message: 'Log in failed. Please try again later.',
//   //     success: false,
//   //   };
//   // }

//   try {
//     const username = formData.get('username') as string;
//     const password = formData.get('password') as string;
//     const userExists = await sql`
//     SELECT 1 FROM users WHERE username = ${username} LIMIT 1
//     `;

//     if (userExists.rowCount === 0) {
//       return { message: 'Username not found.', success: false };
//     }

//     const result = await sql`
//     SELECT userId, password FROM users WHERE username = ${username} LIMIT 1
//     `;
//     const { password: hashedPassword, userid } = result.rows[0];
//     const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
//     console.log(isPasswordCorrect);

//     await createSession(userid);
//     return { message: 'Successfully logged in.', success: true };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: 'Log in failed. Please try again later.',
//       success: false
//     };
//   }
// }

// export async function createTrip(
//   prevState: { message: string; success: boolean },
//   formData: FormData
// ) {
//   // 1. Check if logged in
//   // add this in route middleware route instead of checking again

//   // 2. Run create trip query
//   try {
//     // 2a. Check if user alreadt created another trip on the same date
//     // (check if user and date selected exists)
//     const { payload } = await checkSession();
//     const userId = payload?.userId as string;
//     const tripDate = formData.get('date') as string;
//     // console.log(tripDate);
//     const validationResult = await sql`
//     WITH existing_trip AS (
//       SELECT 1
//       FROM trip_requests WHERE created_by=${userId} AND
//       trip_date = ${tripDate}::date or trip_date = ${tripDate}::date + INTERVAL '1 day'
//       LIMIT 1
//     )
//     SELECT
//       CASE
//         WHEN EXISTS (SELECT 1 from existing_trip) THEN 'Error: Trip with same date or next day already exists.'
//         WHEN ${tripDate} < CURRENT_DATE + INTERVAL '7 days' THEN 'Error: Trip must be at least 7 days in advance.'
//         ELSE 'valid'
//       END AS validation_status
//     `;
//     const { validation_status } = validationResult.rows[0];
//     // console.log(validation_status);
//     if (validation_status !== 'valid') {
//       console.log(validation_status);
//       return {
//         message: validation_status,
//         success: false
//       };
//     } else {
//       console.log('Validation ok');
//     }

//     // 3. Create trip request
//     const tripName = formData.get('name') as string;
//     const tripLocation = formData.get('location') as string;
//     const maxPassengers = formData.get('passengers') as string;
//     formData.get('location');

//     const createTripResult = await sql`
//       INSERT INTO trip_requests (trip_name, created_by, trip_date, trip_location, max_passengers,
//       passengers_names, no_of_passengers)
//       VALUES (${tripName}, ${userId}, ${tripDate}, ${tripLocation}, ${maxPassengers}, ARRAY[${userId}], 1)
//       RETURNING trip_name
//       `;
//     console.log(createTripResult);

//     // console.log(validationResult);
//   } catch (error) {
//     console.log(error);
//   }

//   // console.log(formData);
//   return { message: 'Trip request was created successfully', success: true };
// }
