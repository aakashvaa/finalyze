import LogoBar from "@/components/LogoBar";
import TransactionsList from "@/components/transaction";

export default function Home() {
  return (
    <main className="relative  w-full h-screen overflow-y-auto overflow-x-hidden  items-center mx-auto px-4 flex flex-col  py-8">
      <LogoBar />

      <div className=" w-full lg:w-[65%] mx-auto">
        <TransactionsList />
      </div>

      {/* Bottom Shade */}
      <div className="fixed bottom-0 left-0 w-full  h-20 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none"></div>
    </main>
  );
}
