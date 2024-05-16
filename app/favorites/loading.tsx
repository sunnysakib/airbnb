import ListingsCardSkeleton from "../components/ListingsCardSkeleton";

export default function Favoritesloading() {
    const skeletonCount = 10;
  return (
    <section className="2xl:px-20 mx-auto px-5 lg:px-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favorites</h2>

      <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <ListingsCardSkeleton key={index} />
      ))}
      </div>
    </section>
  );
}