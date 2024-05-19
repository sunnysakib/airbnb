import { CategoryShowcase } from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { SelectSeparator } from "@/components/ui/select";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectCalender } from "@/app/components/SelectCalender";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginModal } from "@/app/components/LoginModal";
import { createReservation } from "@/app/actions";

async function getData(homeid: string) {
  const data = await prisma.home.findUnique({
    where: {
      id: homeid,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      category: true,
      price: true,
      country: true,
      Reservation: {
        where: {
          homeId: homeid,
        },
      },
      User: {
        select: {
          profileImage: true,
          name: true,
        },
      },
    },
  });

  return data;
}
export default async function HomeRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  const session = await auth()
  const user = session?.user;
  return (
    <div className="w-[75%] mx-auto mt-10 mb-12">
      <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
      <div className="relative h-[550px]">
        <Image
          alt="Image of Home"
          src={`https://lfqahgwukxxwcgxljgri.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>

      <div className="flex justify-between gap-x-24 mt-8">
        <div className="w-2/3">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label} , {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{data?.guests} Guests</p> / <p>{data?.bedrooms} Bedrooms</p> /{" "}
            {data?.bathrooms} Bathrooms
          </div>

          <div className="flex items-center mt-6">
            <img
              src={
                data?.User?.profileImage ??
                "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              }
              alt="User Profile"
              className="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">Hosted by {data?.User?.name}</h3>
              <p className="text-sm text-muted-foreground">Host since 2015</p>
            </div>
          </div>

          <SelectSeparator className="my-7" />

          <CategoryShowcase categoryName={data?.category as string} />

          <SelectSeparator className="my-7" />

          <p className="text-muted-foreground line-clamp-5">
            {data?.description}
          </p>

          <Dialog >
            <DialogTrigger className="font-semibold">
              <span className="underline font-bold">Show more</span> {"..."}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader >
                <DialogTitle className="text-3xl">About this space</DialogTitle>
                <DialogDescription className="text-md">
                  <ScrollArea className="h-[350px] ">{data?.description} {data?.description}</ScrollArea>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <SelectSeparator className="my-7" />
          <HomeMap locationValue={data?.country as string} />
        </div>

        <form action={createReservation}>
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="userId" value={user?.id} />
        <SelectCalender reservation={data?.Reservation}/>
        {user?.id ? (
            <Button  className="w-full">
                Make a Reservation
            </Button>
          ) : (
            <div >
                <Button disabled className="w-full cursor-not-allowed">
                Make a Reservation
            </Button>
            <p className="text-center text-sm mt-2 text-muted-foreground">You need to be logged in to make a reservation</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
