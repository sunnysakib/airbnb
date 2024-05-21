import { Suspense } from "react";
import ListingsCardSkeleton from "./components/ListingsCardSkeleton";
import { MapFilterItems } from "./components/MapFilterItems";
import { ShowItems } from "./components/ShowItems";
import prisma from "./lib/db";
import { unstable_noStore as noStore } from "next/cache";
 export async function getData({
  searchParams,
  userId,
}: {
  userId?: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      category: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        }
      }
    },
  });

  return data;
}
export default async function Home({
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
  const data = await getData({ searchParams: searchParams,  });
  return (
    <section className="2xl:px-20 mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        {/*  @ts-expect-error Async Server Component  */}
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </section>
  );
}



function SkeletonLoading() {
  const skeletonCount = 10;
  return (
    <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
       {Array.from({ length: skeletonCount }).map((_, index) => (
        <ListingsCardSkeleton key={index} />
      ))}
    </div>
  );
}