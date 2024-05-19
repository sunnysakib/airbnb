import Image from "next/image";
import Link from "next/link";
import { createFavorite, DeleteFavorite } from "../actions";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavorite: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingsCard({description, imagePath, location, price, userId, favoriteId, isInFavorite, homeId, pathName}: iAppProps) {
    const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative 2xl:h-[17rem] h-72">
        <Link href={`/home/${homeId}`}>
        <Image
          src={`https://lfqahgwukxxwcgxljgri.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="home image"
          fill
          className="object-cover rounded-lg h-full mb-3"/>
        </Link>

          {userId && (
            <div className="z-10 absolute top-2 right-2">
             {
              isInFavorite ? (
                <form action={DeleteFavorite}>
                  <input type="hidden" name="favoriteId" value={favoriteId} />
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <DeleteFromFavoriteButton/>
                </form>
              ): (
                <form action={createFavorite}>
                  <input type="hidden" name="userId" value={userId} />
                  <input type="hidden" name="homeId" value={homeId} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <AddToFavoriteButton/>
                </form>
              )
             }
            </div>
          )}
      </div>

      <Link href={`/home/${homeId}`}  className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label} / {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${price}</span> / Night
        </p>
      </Link>
    </div>
  );
}
