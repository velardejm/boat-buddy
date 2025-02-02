"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useActionState } from "react";
import { addUser } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export default function SignupForm() {
  const [state, formAction] = useActionState(addUser, { message: "" });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm: "",
    },
  });

  const parse = formSchema.safeParse({
    username: form.getValues("username"),
    password: form.getValues("password"),
    confirm: form.getValues("confirm"),
  });

  // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  // console.log(values);
  // }

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        action={formAction}
        className="space-y-8 w-1/2 md:w-1/4 flex flex-col  items-center h-1/2"
      >
        <h1 className="w-full text-3xl font-bold relative -left-4">Sign Up</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem
              className="w-full"
              onChange={() => {
                form.trigger("username");
              }}
            >
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
              className="w-full"
              onChange={() => {
                form.trigger("password");
              }}
            >
              {/* <FormLabel>Password</FormLabel> */}
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem
              className="w-full"
              onChange={() => {
                form.trigger("confirm");
              }}
            >
              {/* <FormLabel>Confirm Password</FormLabel> */}
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center">
          <p className="text-[0.8rem] font-medium text-destructive mb-4">{state?.message}</p>
          <Button type="submit" disabled={!parse.success} className="w-24">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
