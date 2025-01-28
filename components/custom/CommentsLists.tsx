/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GlIgT4wHfb5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function CommentsList() {
  return (
    <div className="mx-auto px-4 md:px-6 max-w-2xl grid gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>12 comments</span>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="icon">
            <ListOrderedIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Cody Nolan</div>
              <div className="text-xs text-muted-foreground">2 days ago</div>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              Wow, this is an amazing product! I've been using it for a week now and it's been a game-changer. The setup
              was super easy and the features are incredibly useful. Highly recommend!
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Jill Doe</div>
              <div className="text-xs text-muted-foreground">1 week ago</div>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              I've been using this product for a few months now and it's been fantastic. The customer support has also
              been incredibly responsive and helpful. Highly recommend!
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Alex Smith</div>
              <div className="text-xs text-muted-foreground">3 weeks ago</div>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              I was a bit hesitant to try this product at first, but I'm so glad I did. It's been a game-changer for my
              business. The features are incredibly useful and the user interface is intuitive. Highly recommend!
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Emily Parker</div>
              <div className="text-xs text-muted-foreground">1 month ago</div>
            </div>
            <div className="text-sm leading-relaxed text-muted-foreground">
              I've been using this product for a while now and it's been a game-changer for my workflow. The automation
              features are incredibly useful and have saved me so much time. Highly recommend!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListOrderedIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}