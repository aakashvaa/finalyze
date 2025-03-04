import LogoBar from '@/components/LogoBar'
import { Three } from '@/components/Three/Index'
import TransactionsList from '@/components/transaction'

export default function Home() {
  return (
    <main className="relative   w-full h-screen  overflow-hidden  items-center mx-auto px-4 flex flex-col ">
      <Three />

      <div className="absolute bg-white/[0.09] flex pt-8 overflow-y-auto items-center backdrop-blur-xl   flex-col top-0 left-0 w-full h-screen z-50">
        <LogoBar />
        <div className="  z-50 left-0 w-full lg:w-[65%] p-2 mx-auto">
          <TransactionsList />
        </div>
      </div>
    </main>
  )
}
