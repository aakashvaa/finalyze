import { useTransactions } from '@/hooks/store'
import { TableCell, TableRow } from '../ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
import { useState } from 'react'
import DetailedTable from './DetailedTable'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

type TypeTableTransaaction = {
  description: string
  count: number | undefined
  type: string
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
  const [toggleTable, setToggleTable] = useState(false)
  const styleRef = useRef(null)
  const { transactions } = data
  const [selectedTransactions, setSelectedTransactions] = useState<
    TypeTransaction[]
  >([])

  const handleShowFullDetails = () => {
    if (!toggleTable) {
      const temp = transactions.filter((el) =>
        el.description.includes(description)
      )
      // console.log(temp);
      setSelectedTransactions(temp)
    }
    setToggleTable(!toggleTable)
  }

  return (
    <>
      <TableRow
        className={`cursor-pointer bg-black/20  ${
          toggleTable ? 'bg-black/[0.085]' : ''
        }`}
        onClick={handleShowFullDetails}
      >
        <TableCell>{description}</TableCell>
        <TableCell>{count}</TableCell>
        <TableCell className="text-right">
          <span
            className={type !== 'debit' ? 'text-emerald-400' : 'text-rose-400'}
          >
            {currency} {Math.abs(totalAmount).toFixed(2)}
          </span>
        </TableCell>
      </TableRow>

      {selectedTransactions.length !== 0 && toggleTable && (
        <DetailedTable
          transactions={selectedTransactions}
          currency={'INR'}
          toggleTable={true}
        />
      )}
      {toggleTable && selectedTransactions.length > 0 && (
        <tr>
          <td
            style={{
              height: `${selectedTransactions.length * 75 + 60}px`,
            }}
          />
        </tr>
      )}
    </>
  )
}
