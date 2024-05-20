import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";

export function SearchComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>

          <div className="bg-primary p-3 rounded-full">
          <Search className=" text-white size-5 font-bold" />
          </div>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}
