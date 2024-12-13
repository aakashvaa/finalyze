"use client";
import { useTransactions } from "@/hooks/store";
import Image from "next/image";
import { UploadForm } from "./upload-form";

export default function LogoBar() {
  const { data } = useTransactions();
  const { transactions } = data;

  return (
    <div
      className={`flex w-full md:w-[80%] gap-5 ${transactions.length === 0 ? " flex-col" : "flex-row md:px-32 justify-evenly "}`}
    >
      <div
        className={`flex justify-center align-middle gap-10  items-center ${transactions.length === 0 ? "flex" : "hidden "}`}
      >
        <Image src="XpenseLogo.svg" alt="logo" width={35} height={35} />
        {transactions.length === 0 && (
          <h1 className="text-4xl font-light flex text-center ">
            Know{" "}
            <Image
              className="ml-4"
              src="X .svg"
              alt="x"
              width={30}
              height={30}
            />
            penses
          </h1>
        )}
      </div>
      <UploadForm />
    </div>
  );
}
