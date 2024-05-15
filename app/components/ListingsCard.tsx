import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

export function ListingsCard({description, imagePath, location, price}: iAppProps) {
    const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);
  return (
    <div className="flex flex-col">
      <div className="relative 2xl:h-[17rem] h-72">
        <Image
          src={`https://lfqahgwukxxwcgxljgri.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="home image"
          fill
          className="object-cover rounded-lg h-full mb-3"/>
      </div>

      <Link href={`/`} className="mt-2">
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
