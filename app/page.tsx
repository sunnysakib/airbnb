import { Suspense } from "react";
import ListingsCardSkeleton from "./components/ListingsCardSkeleton";
import { MapFilterItems } from "./components/MapFilterItems";
import { ShowItems } from "./components/ShowItems";
export default function Home({
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