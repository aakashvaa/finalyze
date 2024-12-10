import TransactionsList from "@/components/transaction";
import { UploadForm } from "@/components/upload-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4 flex flex-col gap-7 py-8">
      <div className="flex justify-center align-middle gap-10  items-center">
        <Image src="XpenseLogo.svg" alt="logo" width={30} height={30} />
        <h1 className="text-4xl font-bold text-center ">Track Xpenses</h1>
      </div>
      <div className="max-w-4xl mx-auto">
        <UploadForm />
        <TransactionsList />
      </div>
    </main>
  );
}
