import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function DateInfo() {
  const value = new Date();
  return (
    <Button
      disabled={true}
      variant={"outline"}
      className={cn(
        "justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4" />
      {value ? format(value, "PPP") : <span>Pick a date</span>}
    </Button>
  );
}
