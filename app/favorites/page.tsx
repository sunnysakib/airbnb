import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";
import EmptyList from "../components/EmptyList";
import { ListingsCard } from "../components/ListingsCard";

async function getData(userId: string | undefined) {
  noStore();
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favorite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}

export default async function FavoriteRoute() {
  const session = await auth();
  const user = session?.user;
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="2xl:px-20 mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      {data.length === 0 ? (
        <EmptyList
          title="Hey you dont have any favorites"
          description="Please add favorites to see them right here..."
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
              favoriteId={item.Home?.Favorite[0].id as string}
              isInFavorite={
                (item.Home?.Favorite.length as number) > 0 ? true : false
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
