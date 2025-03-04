import { useTransactions } from '@/hooks/store'
import { TableCell, TableRow } from '../ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
import { useEffect, useState } from 'react'
import DetailedTable from './DetailedTable'
import { NavbarType } from '@/type'

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
      // console.log(temp, transactions)
      setSelectedTransactions(temp)
    }
    setToggleTable(!toggleTable)
  }

  return (
    <>
      <TableRow
        className={`cursor-pointer bg-black/20 overflow-hidden  ${
          toggleTable ? 'bg-black/[0.085]' : ''
        }`}
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
