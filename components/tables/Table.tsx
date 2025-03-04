import { useTransactions } from '@/hooks/store'
import { TableCell, TableRow } from '../ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
import { useState } from 'react'
import DetailedTable from './DetailedTable'
import { NavbarType } from '@/type'
import { cn } from '@/lib/utils'

type TypeTableTransaaction = {
  description: string
  count: number | undefined
  type: NavbarType
  currency: string
  totalAmount: number
}

export default function TableTranction({
  description,
  count,
  type,
  currency,
  totalAmount,
}: TypeTableTransaaction) {
  const { data } = useTransactions()
  const { transactions } = data
  const [toggleTable, setToggleTable] = useState(false)
  // const styleRef = useRef(null)
  const [selectedTransactions, setSelectedTransactions] = useState<
    TypeTransaction[]
  >([])

  // console.log(transactions)

  const handleShowFullDetails = () => {
    if (!toggleTable) {
      const temp = transactions.filter(
        (el) => el.description.includes(description) && el.tableName === type
      )
      console.log(temp)
      setSelectedTransactions(temp)
    }
    setToggleTable(!toggleTable)
  }

  return (
    <>
      <TableRow
        className={cn(
          'cursor-pointer w-full  overflow-hidden  bg-black/5 p-4 rounded-md border border-white/10 backdrop-blur-lg transition-all duration-300 ease-in-out',
          toggleTable ? 'text-white scale-95' : ''
        )}
        onClick={handleShowFullDetails}
      >
        <TableCell>{description}</TableCell>
        <TableCell>{count}</TableCell>
        <TableCell className="text-right">
          <span className="text-white">
            {currency} {Math.abs(totalAmount).toFixed(2)}
          </span>
        </TableCell>
      </TableRow>

      {selectedTransactions.length !== 0 && toggleTable && (
        <DetailedTable
          transactions={selectedTransactions}
          type={type}
          setSelectedTransactions={setSelectedTransactions}
          toggleTable={true}
        />
      )}
      {toggleTable && selectedTransactions.length > 0 && (
        <tr
          style={{ height: `${selectedTransactions.length * 75 + 60}px` }}
        ></tr>
      )}
    </>
  )
}
