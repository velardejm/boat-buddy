import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { checkSession, deleteSession } from "@/lib/session";
import {
  NavigationMenu,
  // NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const isSession = await checkSession();
  return (
    <NavigationMenu className="min-w-full flex justify-between p-4">
      <NavigationMenuList>
        <p className="text-sm font-bold text-red-700">Test links:</p>
        <NavigationMenuItem>
          {/* <Link href="/test/test-page" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Test Page
            </NavigationMenuLink>
          </Link> */}
          <Link href="/trips/create-trip" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Create Trip
            </NavigationMenuLink>
          </Link>
          <Link href="/trips/trips-summary" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Available Trips
            </NavigationMenuLink>
          </Link>
          <Link href="/trips/details/abc" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Trip Details
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          {isSession ? (
            // <Link href="" legacyBehavior passHref>
            //   <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            //     Log Out
            //   </NavigationMenuLink>
            // </Link>
            <LogoutButton deleteSession={deleteSession} />
          ) : (
            <>
              <Link href="/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Log In
                </NavigationMenuLink>
              </Link>
              <Link href="/signup" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Sign Up
                </NavigationMenuLink>
              </Link>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
