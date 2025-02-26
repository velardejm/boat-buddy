'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect, useState } from 'react';
import { createTrip } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePicker from '@/components/custom/DatePicker';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Trip name must be at least 2 characters'
  }),

  location: z.string().min(2, {
    message: 'Trip location must be at least 2 characters'
  }),
  // date: z.date().transform((val) => val.toISOString()),
  date: z.string().date(),
  // .transform((val) => {
  //   // console.log(val);
  //   return new Date(val);
  // })
  // .transform((val) => val.toISOString()),
  // passengers: z.string().transform((val) => Number(val))
  passengers: z.string().min(1)
});
// .refine((val) => val.date < new Date().toISOString(), {
//   message: 'Invalid date'
// });

export default function CreateTrip() {
  const [date, setDate] = useState<Date>();
  const [state, formAction, pending] = useActionState<
    { message: string; success: boolean },
    FormData
  >(createTrip, { message: '', success: false });

  // const [state, formAction, pending] = useActionState<
  //   { message: string; success: boolean },
  //   FormData
  // >(addUser, { message: '', success: false });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
      date: new Date().toISOString(),
      passengers: ''
    }
  });

  const parse = formSchema.safeParse({
    name: form.getValues('name'),
    location: form.getValues('location'),
    date: form.getValues('date'),
    passengers: form.getValues('passengers')
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  useEffect(() => {
    if (state.success) {
      form.reset();
    }
  }, [state]);

  return (
    <div className='flex justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Organize a Fishing Trip</CardTitle>
          <CardDescription>Set up your fishing trip and invite others to join!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              action={formAction}
              // onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 flex flex-col  items-center h-1/2'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Trip Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Fishing trip name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='location'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder='Where do you want to go fishing?' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Original Date Form Field */}
              {/* <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Trip Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        min={
                          new Date(new Date().setDate(new Date().getDate() + 7))
                            .toISOString()
                            .split('T')[0]
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Trip Date</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        min={
                          new Date(new Date().setDate(new Date().getDate() + 7))
                            .toISOString()
                            .split('T')[0]
                        }
                        {...field}
                      />
                      {/* <Input
                        placeholder='This works?'
                        className='hidden'
                        {...field}
                        value={date?.toDateString()}
                      /> */}
                      {/* <Input placeholder='This works?' {...field} value={date?.toDateString()} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <DatePicker
                  date={date}
                  setDate={setDate}
                  onChange={() => {
                    form.setValue('date', date ? date?.toISOString() : '');
                  }}
                />
              </div>

              <FormField
                control={form.control}
                name='passengers'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Max Passengers</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min='2'
                        max='6'
                        {...field}
                        placeholder='Min = 2 | Max = 6'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' disabled={!parse.success}>
                Submit
              </Button>
            </form>
            <p>{state.message}</p>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          {/* <Button variant="outline">Cancel</Button>
        <Button>Send Request</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
