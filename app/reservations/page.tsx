import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EmptyList from "../components/EmptyList";
import { ListingsCard } from "../components/ListingsCard";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string | undefined){
  noStore();
    const data = await prisma.reservation.findMany({
        where:{
            userId: userId
        },
        select: {
            Home: {
                select: {
                    photo: true,
                    id: true,
                    price: true,
                    country: true,
                    description: true,
                    Favorite: {
                        where: {
                            userId: userId,
                        }
                    },
                }
            }
        }
    })
    return data;
}

export default async function reservationsRoute(){
    const session = await auth();
    const user = session?.user;
    if (!user) return redirect("/");
    const data = await getData(user.id);
    return(
        <section className="2xl:px-20 mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Reservations</h2>

      {data.length === 0 ? (
        <EmptyList
          title="Hey you don't have any Reservation"
          description="Please add home to see them right here..."
        />
      ) : (
        <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingsCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favorites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user.id}
              favoriteId={item.Home?.Favorite[0]?.id as string}
              isInFavorite={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
    )
}