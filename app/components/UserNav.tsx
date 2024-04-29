import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "../actions";


export default async function UserNav() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const createHomeWithId = createAirbnbHome.bind(null, 
    {userId: user?.id as string})
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
            <MenuIcon className="w-6 h-6 lg:size-5" />
            <img
              src={
                user?.picture ||
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="user icon"
             
              className="rounded-full w-8 h-8 hidden lg:block"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {user ? (
            <>
              <DropdownMenuItem>
                <form action={createHomeWithId}>
                  <button type="submit" className="text-start">Airbnb your Home</button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-homes">My Listing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites">My Favorites</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/reservations">My Reservations</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <LogoutLink>Log out</LogoutLink>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <RegisterLink>Register</RegisterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginLink>Login</LoginLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
