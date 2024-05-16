import { getData } from "../page";
import { ListingsCard } from "./ListingsCard";
import EmptyList from "./EmptyList";
import { auth } from "@/auth";

export async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const session = await auth();
  const user = session?.user;
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      <div>
        {data.length !== 0 ? (
          <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {data.map((home) => (
              <ListingsCard
                key={home.id}
                description={home.description as string}
                imagePath={home.photo as string}
                location={home.country as string}
                price={home.price as number}
                userId={user?.id}
                favoriteId={home.Favorite[0]?.id}
                isInFavorite={home.Favorite.length > 0 ? true : false} 
                homeId={home.id}
                pathName="/"
              />
            ))}
          </div>
        ) : (
          <EmptyList />
        )}
      </div>
    </>
  );
}
