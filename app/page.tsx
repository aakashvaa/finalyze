import TransactionsList from "@/components/transaction";
import { UploadForm } from "@/components/upload-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container w-[100%] mx-auto px-4 flex flex-col gap-7 py-8">
      <div className="flex justify-center align-middle gap-10  items-center">
        <Image src="XpenseLogo.svg" alt="logo" width={30} height={30} />
        <h1 className="text-4xl font-light flex text-center ">
          Track{" "}
          <Image className="ml-4" src="X .svg" alt="x" width={30} height={30} />
          penses
        </h1>
      </div>
      <div className="w-[70%] mx-auto">
        <UploadForm />
        <TransactionsList />
      </div>
    </main>
  );
}
