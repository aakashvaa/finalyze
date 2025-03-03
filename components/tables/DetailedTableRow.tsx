import { TableRow, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { TypeMapTransaction, TypeTransaction } from '@/type/store/typeStore'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { navbars } from '@/utils/constant'
import { useMapTransaction, useTransactions } from '@/hooks/store'
import { NavbarType } from '@/type'

export default function DetailedTableRow({
  transaction,
  currency,
  type,
}: {
  transaction: TypeTransaction
  currency: string
  type: NavbarType
}) {
  const { dataMap, setDataMap } = useMapTransaction()
  const { data } = useTransactions()
  const [showPopup, setShowPopup] = useState(false)
  const [showPopupNested, setShowPopupNested] = useState(false)
  const [xPosition, setXPosition] = useState(0)
  const [xPositionNested, setXPositionNested] = useState(0)
  const [yPosition, setYPosition] = useState(0)
  const [yPositionNested, setYPositionNested] = useState(0)

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault()
    setShowPopupNested(false)
    if (!showPopup) {
      const rect = e.currentTarget.getBoundingClientRect() // Use currentTarget instead of target
      const x = e.clientX - rect.left + 10
      const y = e.clientY - rect.top - 60
      // Check if clicking near the right or bottom edge
      const isNearRight = e.clientX > window.innerWidth - 500
      const isNearBottom = e.clientY > window.innerHeight - 150
      console.log(window.innerWidth, e.clientX, isNearRight)

      //   console.log('hit 2')
      setXPosition(isNearRight ? x - 110 : x + 10)
      setYPosition(isNearBottom ? y - 95 : y - 10)
    }

    setShowPopup(!showPopup)
  }
  const handleNested = (e: React.MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect() // Use currentTarget instead of target
    const x = e.clientX - rect.left + 40
    const y = e.clientY - rect.top - 60
    const isNearRight = e.clientX > window.innerWidth - 650
    const isNearBottom = e.clientY > window.innerHeight - 50
    console.log(window.innerWidth, e.clientX, isNearRight)

    setXPositionNested(isNearRight ? 1 : 0)
    setYPositionNested(isNearBottom ? 1 : 0)

    setShowPopupNested(!showPopupNested)
  }
  const handleDelete = () => {
    console.log('delete')
    let { description } = transaction
    const { transactions } = data
    // description = description.startsWith('UPI')
    //   ? description.split('@')[0].split('-')[1]
    //   : description.split('@')[0]

    console.log(transactions.filter((el) => el.description === description))
    // const newDataMap: TypeMapTransaction[] = dataMap[type].filter(
    //   (el) => el.id !== transaction.id
    // )
    // setData({ ...data })
  }
  return (
    <Popover open={showPopup} onOpenChange={setShowPopup}>
      <PopoverTrigger asChild>
        <TableRow
          onClick={handleClick} // Trigger pop-up on click
          className={cn('hover:bg-transparent  cursor-context-menu ')}
          style={{
            borderLeft: showPopup ? '4px solid #444' : '4px solid transparent',
          }}
        >
          <TableCell>{transaction.date}</TableCell>
          <TableCell>{transaction.description.split('@')[0]}</TableCell>
          <TableCell className="capitalize">{transaction.type}</TableCell>
          <TableCell className="text-right">
            <span
              className={
                transaction.type === 'credit'
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }
            >
              {currency} {Math.abs(+transaction.amount).toFixed(2)}
            </span>
          </TableCell>
          <PopoverContent
            align="end"
            side="left"
            className={cn(
              'bg-primary absolute border-none text-center p-1 w-fit text-sm'
            )}
            style={{
              top: yPosition,
              left: xPosition,
            }}
          >
            <ul className=" w-20">
              <Popover open={showPopupNested} onOpenChange={setShowPopup}>
                <PopoverTrigger asChild>
                  <div
                    onClick={handleNested}
                    className="cursor-pointer w-full py-1 hover:bg-black/[0.3] rounded-sm"
                  >
                    Move
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  side="right"
                  className={cn(
                    'bg-primary absolute translate-x-1 translate-y-1 left-0  border-none text-center p-1 w-fit text-sm',
                    xPositionNested ? ' -left-48' : '-right-18',
                    yPositionNested ? '-top-10' : '-bottom-[90px]'
                  )}
                >
                  <ul className="whitespace-nowrap">
                    {navbars.slice(1).map((name, i) => (
                      <li
                        key={`move-${name}`}
                        className={cn(
                          'cursor-pointer py-1 px-6 hover:bg-black/[0.3] rounded-sm',
                          type === name && 'hidden'
                        )}
                      >
                        {name.slice(0, 1).toUpperCase() +
                          name.slice(1).toLowerCase()}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
              <li
                onClick={handleDelete}
                className="cursor-pointer py-1 w-full hover:bg-black/[0.3] rounded-sm"
              >
                Delete
              </li>
            </ul>
          </PopoverContent>
        </TableRow>
      </PopoverTrigger>
    </Popover>
  )
}
