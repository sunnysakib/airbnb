import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapFilterItems } from "./components/MapFilterItems";

export default function Home() {
  return (
    <section className="container mx-auto px-5 lg:px-10">
      <MapFilterItems/>
    </section>
  );
}
