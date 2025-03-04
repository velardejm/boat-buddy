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
    console.log(password);
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    console.log('=======================================');
    console.log(isPasswordCorrect);
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

// lib/data.ts

export async function getTripDetails(tripid: string) {
  try {
    // Replace this with the actual SQL query to fetch trip details by tripid
    const result = await sql`
      SELECT * FROM trip_requests WHERE tripid = ${tripid}
    `;

    if (result.rows.length === 0) {
      return null; // Trip not found
    }

    // Return the trip details
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null; // In case of an error, return null
  }
}

export async function joinTrip() {
  try {
    const session = await checkSession();
    if (!session.payload) {
      return { message: 'User or trip information missing.', success: false };
    }
    const userId = session.payload.userId as string;
    const usernameResult = await sql`
    SELECT username FROM users WHERE userid=${userId}
    `;
    console.log(usernameResult.rows[0]);

    // const { tripid } = session.payload;
    // const tripId = tripid as string;
    const trip = await getTripDetails(tripId);
    console.log(trip);

    // if (!trip) {
    //   return { message: 'Trip not found.', success: false };
    // }

    // if (trip.passengers_names.includes(username)) {
    //   return { message: 'You have already joined this trip.', success: false };
    // }

    // if (trip.no_of_passengers >= trip.max_passengers) {
    //   return { message: 'This trip is already full.', success: false };
    // }

    // await sql`;
    //   UPDATE trip_requests
    //   SET no_of_passengers = no_of_passengers + 1,
    //       passengers_names = array_append(passengers_names, ${username})
    //   WHERE tripid = ${tripId}
    // `;
    return { message: 'Successfully joined the trip.', success: true };
  } catch (error) {
    console.error(error);
    return { message: 'Failed to join the trip.', success: false };
  }
}
