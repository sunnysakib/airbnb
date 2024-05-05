import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "../../public/assets/images/google.png";

export function RegisterModal() {
  return (
    <Dialog>
      <DialogTrigger className="w-full text-sm text-left cursor-pointer px-2 py-1.5 transition-colors rounded-sm hover:bg-accent">Register</DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome To Airbnb</DialogTitle>
          <DialogDescription>
          Register Your Account
          </DialogDescription>
        </DialogHeader>
        <div>
        <form action="">
        <div className="flex flex-col gap-y-4">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="email" placeholder="Email" />
        <Input type="password" name="password" placeholder="Password" />
        <Button>Register</Button>
        <p className="text-center text-sm py-2 mx-auto"> - OR - </p>
        <Button variant="outline"><Image src={logo}
                alt="google logo"
                className="size-4 mr-3"
                /> Register with Google</Button>
        </div>
        </form>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
