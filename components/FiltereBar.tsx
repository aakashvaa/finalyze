import { useState } from 'react'

export default function FilterBar({
  sortCriteria,
  setSortCriteria,
  sortOrder,
  setSortOrder,
  perTableAmount,
}: {
  sortCriteria: 'count' | 'amount'
  setSortCriteria: (value: 'count' | 'amount') => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (value: 'asc' | 'desc') => void
  perTableAmount: number
}) {
  const [sortCriteriaOpen, setSortCriteriaOpen] = useState<boolean>(false)
  const [sortOrderOpen, setSortOrderOpen] = useState<boolean>(false)
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="relative  font-medium bg-black/5 px-4 py-1 rounded-sm border border-white/10 backdrop-blur-lg flex items-center text-[14px]">
        <h3 className=" text-white/90  mr-4">Total Transaction Amount :</h3>
        <p> {perTableAmount} </p>
      </div>

      <div className="flex items-center relative">
        <label className="mr-2 text-white/90 text-[14px]">Sort by :</label>
        <div className="relative mr-4 w-20 text-[16px]">
          <button
            className="px-3 py-1 w-full bg-primary text-white/90 rounded focus:outline-none"
            onClick={() => setSortCriteriaOpen(!sortCriteriaOpen)}
          >
            {sortCriteria === 'amount' ? 'Amount' : 'Count'}
          </button>
          {sortCriteriaOpen && (
            <div className="absolute w-full mt-1 p-1 text-white bg-primary backdrop-blur-xl rounded-sm shadow-lg z-20">
              <div
                className="w-full px-3 py-1 hover:rounded-sm hover:bg-black/[0.3] cursor-pointer transition-colors"
                onClick={() => {
                  setSortCriteria('amount')
                  setSortCriteriaOpen(false)
                }}
              >
                Amount
              </div>
              <div
                className="w-full px-3 py-1 hover:rounded-md hover:bg-black/[0.3] cursor-pointer transition-colors"
                onClick={() => {
                  setSortCriteria('count')
                  setSortCriteriaOpen(false)
                }}
              >
                Count
              </div>
            </div>
          )}
        </div>

        <div className="relative w-24 text-[16px] text-center">
          <button
            className=" py-1 w-full bg-primary text-white/90 rounded focus:outline-none"
            onClick={() => setSortOrderOpen(!sortOrderOpen)}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
          {sortOrderOpen && (
            <div className="absolute w-full mt-1 p-1 text-white bg-primary backdrop-blur-xl rounded-sm shadow-lg z-20">
              <div
                className="w-full  py-1 hover:rounded-sm hover:bg-black/[0.3] cursor-pointer transition-colors"
                onClick={() => {
                  setSortOrder('asc')
                  setSortOrderOpen(false)
                }}
              >
                Ascending
              </div>
              <div
                className="w-full  py-1 hover:rounded-md hover:bg-black/[0.3] cursor-pointer transition-colors"
                onClick={() => {
                  setSortOrder('desc')
                  setSortOrderOpen(false)
                }}
              >
                Descending
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
