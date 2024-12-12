import LogoBar from "@/components/LogoBar";
import TransactionsList from "@/components/transaction";
import { UploadForm } from "@/components/upload-form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container w-[100%] justify-center items-center mx-auto px-4 flex flex-col gap-5 py-8">
      <LogoBar />

      <div className="w-[70%] mx-auto">
        <TransactionsList />
      </div>
    </main>
  );
}
