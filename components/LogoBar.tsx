'use client'
import { useTransactions } from '@/hooks/store'
import Image from 'next/image'
import { UploadForm } from './upload-form'

export default function LogoBar() {
  const { data } = useTransactions()
  const { transactions } = data

  return (
    <div
      className={`flex w-full md:w-[80%] gap-5 ${
        transactions.length === 0
          ? ' flex-col h-[90%] items-center justify-center gap-y-28'
          : 'flex-row md:px-32 justify-evenly '
      }`}
    >
      <div
        className={`flex flex-col justify-center align-middle gap-10  items-center ${
          transactions.length === 0 ? 'flex' : 'hidden '
        }`}
      >
        <Image src="XpenseLogo.svg" alt="logo" width={55} height={55} />
        {transactions.length === 0 && (
          <h1 className="tracking-[1.5rem] font-light flex  text-center ">
            Analyze Your Xpenses
          </h1>
        )}
      </div>
      <UploadForm />
    </div>
  )
}
