"use client"
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { categoryItems } from "../lib/categoryItems";

export function SelectCategory() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    return (
        <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto">
            {
                categoryItems.map((item: any)=> (
                    <div key={item.id} className="cursor-pointer">
                        <Card className={selectedCategory === item.name ? " border-primary border-2" : ""}
                        onClick={() => setSelectedCategory(item.name)}>
                            <CardHeader>
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={32}
                                    height={32}
                                />
                                <h3 className="font-medium">{item.name}</h3>
                            </CardHeader>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
}