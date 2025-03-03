import { useState } from 'react'

export default function FilterBar({
  sortCriteria,
  setSortCriteria,
  sortOrder,
  setSortOrder,
}: {
  sortCriteria: 'count' | 'amount'
  setSortCriteria: (value: 'count' | 'amount') => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (value: 'asc' | 'desc') => void
}) {
  const [sortCriteriaOpen, setSortCriteriaOpen] = useState<boolean>(false)
  const [sortOrderOpen, setSortOrderOpen] = useState<boolean>(false)
  return (
    <div className="flex justify-end items-center mb-4 relative z-10">
      <label className="mr-2 text-white/90 text-[14px]">Sort by:</label>
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
  )
}
