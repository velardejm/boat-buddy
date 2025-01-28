"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DatePicker from "@/components/custom/DatePicker";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Trip name must be at least 2 characters",
    }),

    location: z.string().min(2, {
      message: "Trip location must be at least 2 characters",
    }),
    date: z.date(),
    passengers: z.string(),
  })
  .refine((val) => val.date < new Date(), {
    message: "Invalid date",
  });

export default function CreateTrip({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      date: new Date(),
      passengers: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={className}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Organize a Fishing Trip</CardTitle>
          <CardDescription>
            Set up your fishing trip and invite others to join!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 flex flex-col  items-center h-1/2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Trip Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fishing trip name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Where do you want to go fishing?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value || null}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passengers"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Passengers</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
        <Button>Send Request</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
