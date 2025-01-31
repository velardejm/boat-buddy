'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

import { z } from 'zod';

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

// export async function addUser2(
//   prevState: { message: string },
//   formData: FormData
// ): Promise<{ message: string }> {
//   console.log(`Server says hello: ${formData.get('checkBox')}`);
//   // Do your stuff here
//   return { message: 'Form submitted' }; // or some relevant message
// }

export async function addUser(
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: 'Username must be at least 2 characters.',
      })
      .nonempty(),
    password: z
      .string()
      .min(2, {
        message: 'zzzzzzz',
      })
      .nonempty(),
    confirm: z.string().nonempty(),
  });
  // .refine((data) => data.password === data.confirm, {
  //   message: "Passwords don't match",
  //   path: ['confirm'], // path of error
  // });

  try {
    formSchema.parse({
      username: username,
      password: password,
      confirm: confirm,
    });
  } catch (error) {
    console.log('=======================');
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      return { message: error.issues[0].message };
    }
    console.log('=======================');
  }

  // const parse = formSchema.safeParse({
  //   username: formData.get('username'),
  //   password: formData.get('password'),
  //   confirm: formData.get('confirm'),
  // });

  // console.log(parse);

  // if (parse.success) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const data = await sql`
        INSERT INTO users (username, password)
        VALUES (${username}, ${hashedPassword})
        RETURNING username
      `;

    console.log(data);
    return { message: 'Ok' };

    // return data; // Returning the username of the newly added user
  } catch (error) {
    // console.log(error);
    console.log(error);
    return { message: 'Error' };
  }
  // } else {
  //   // console.log(parse.error);
  //   return { message: 'Validation Error' };
  // }
}
