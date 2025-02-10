'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRouter } from 'next/navigation';
import { login } from '@/lib/data';
import { useActionState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  }),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.'
  })
});

export default function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [state, formAction, pending] = useActionState(login, {
    message: '',
    success: false
  });

  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      router.push('/');
    }
  }, [state, router]);

  const parse = formSchema.safeParse({
    username: form.getValues('username'),
    password: form.getValues('password')
  });

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
        className='space-y-8 max-w-1/2 min-w-1/4 md:w-1/4 flex flex-col  items-center h-1/2'
      >
        <h1 className='w-full text-3xl font-bold relative -left-4'>Log In</h1>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='w-full' onChange={() => form.trigger('username')}>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full' onChange={() => form.trigger('password')}>
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>{state.message}</p>
        <Button type='submit' disabled={!parse.success || pending}>
          {pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
