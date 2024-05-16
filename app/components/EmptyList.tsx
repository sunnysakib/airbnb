"use client";
import Lottie from "lottie-react";
import LottieFile from "../../public/assets/lotties/empty-list.json";
interface IappProps {
  title: string;
  description: string;
}

export default function EmptyList({ title, description }: IappProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 my-10 pb-16">
      <div className="size-72 ">
        <Lottie animationData={LottieFile} loop={true} />
      </div>
      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}


