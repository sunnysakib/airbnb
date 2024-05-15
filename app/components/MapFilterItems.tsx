'use client'
import Image from "next/image";
import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export function MapFilterItems() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const search = searchParams.get('filter')

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )
    return (
        <div className="flex xl:gap-x-14 gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar justify-between">
            {
                categoryItems.map(item => (
                    <Link key={item.id} href={pathname + '?' + createQueryString('filter', item.name)} className={cn(
                        search === item.name ? 'border-b-2 border-black pb-2 flex-shrink-0' : 'opacity-70 flex-shrink-0', 'flex flex-col gap-y-3 items-center'
                    )}>
                        <div >
                            <Image src={item.imageUrl} alt="category-image" width={24} height={24}/>
                        </div>
                            <p className="text-xs font-medium">{item.name}</p>
                    </Link>
                ))
            }
        </div>
    );
};
