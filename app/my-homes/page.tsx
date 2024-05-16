import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";
import EmptyList from "../components/EmptyList";
import { ListingsCard } from "../components/ListingsCard";

async function getData(userId: string | undefined) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      userId: userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      country: true,
      photo: true,
      description: true,
      price: true,
      Favorite: {
        where: {
          userId: userId,
        },
      }, 
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function MyHomeRoute() {
  const session = await auth();
  const user = session?.user;
  if (!user) return redirect("/");
  const data = await getData(user.id);

  return (
    <section className="2xl:px-20 mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

      {data.length === 0 ? (
        <EmptyList
          title="Hey you dont have any home"
          description="Please add home to see them right here..."
        />
      ) : (
        <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingsCard
            key={item.id}
            imagePath={item.photo as string}
            homeId={item.id}
            price={item.price as number}
            description={item.description as string}
            location={item.country as string}
            userId={user.id}
            pathName="/my-homes"
            favoriteId={item.Favorite[0]?.id}
            isInFavorite={item.Favorite.length > 0 ? true : false}
          />
          ))}
        </div>
      )}
    </section>
  );
}
