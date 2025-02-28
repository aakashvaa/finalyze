'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMapTransaction, useTransactions } from '@/hooks/store'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TableTranction from './tables/Table'

import Navbar from './Navbar'

import { TypeMapTransaction } from '@/type/store/typeStore'
import { bill, foodKeywords, investmentKeywords } from '@/utils/constant'

import DetailsSection from './DetailsSection'
import AmountDateChart from './charts/AmountDateChart'

export default function TransactionsList() {
  const { data } = useTransactions()
  const [select, setSelect] = useState<string>('details')
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState<number>(0)
  const [totalCreditedAmount, setTotalCreditedAmount] = useState<number>(0)
  const [totalDebitedAmount, setTotalDebittedAmount] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<string>('')
  const [sortCriteria, setSortCriteria] = useState<'count' | 'amount'>('amount')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [sortCriteriaOpen, setSortCriteriaOpen] = useState(false)
  const [sortOrderOpen, setSortOrderOpen] = useState(false)

  const { dataMap, setDataMap } = useMapTransaction()

  const { transactions, currency, months } = data

  useEffect(() => {
    if (!transactions.length) return

    const map: TypeMapTransaction = {
      credit: {},
      debit: {},
      investment: {},
      food: {},
      bill: {},
    }

    let totalInvestment = 0

    let totalCredit = 0
    let totalDebit = 0

    transactions.forEach((transaction) => {
      let { description, amount, type } = transaction

      description = description.startsWith('UPI')
        ? description.split('@')[0].split('-')[1]
        : description.split('@')[0]

      // Check if the transaction matches any investment keyword
      const isInvestment = investmentKeywords.some((keyword) =>
        description.toUpperCase().includes(keyword)
      )

      const isFood = foodKeywords.some((keyword) => {
        return description.toUpperCase().includes(keyword.toUpperCase())
      })
      const isBill = bill.some((keyword) =>
        description.toUpperCase().includes(keyword.toUpperCase())
      )
      if (!isNaN(+amount)) {
        if (isInvestment && type === 'debit') {
          console.log(+amount, description)
          totalInvestment += parseFloat(amount)
        } else {
          // console.log(parseFloat(amount), description);
          if (type === 'credit') totalCredit += parseFloat(amount)
          else if (type === 'debit') totalDebit += parseFloat(amount)
        }
      }

      if (isBill) {
        if (map.bill[description]) {
          map.bill[description].totalAmount += +amount
          map.bill[description].count += 1
        } else {
          map.bill[description] = { totalAmount: +amount, count: 1 }
        }
      } else if (isFood) {
        if (map.food[description]) {
          map.food[description].totalAmount += +amount
          map.food[description].count += 1
        } else {
          map.food[description] = { totalAmount: +amount, count: 1 }
        }
      } else if (isInvestment) {
        if (map.investment[description]) {
          map.investment[description].totalAmount += +amount
          map.investment[description].count += 1
        } else {
          map.investment[description] = { totalAmount: +amount, count: 1 }
        }
      } else {
        // Add to either credit or debit
        if (map[type][description]) {
          map[type][description].totalAmount += +amount
          map[type][description].count += 1
        } else {
          // Miscellaneous
          map[type][description] = { totalAmount: +amount, count: 1 }
        }
      }
    })

    setTotalCreditedAmount(totalCredit)
    setTotalDebittedAmount(totalDebit)
    setTotalInvestmentAmount(totalInvestment)

    setDataMap(map)
  }, [transactions])

  const sortedData = dataMap[select as 'credit' | 'debit' | 'investment']
    ? Object.entries(dataMap[select as 'credit' | 'debit' | 'investment']).sort(
        ([descA, dataA], [descB, dataB]) => {
          const valueA =
            sortCriteria === 'count' ? dataA.count : dataA.totalAmount
          const valueB =
            sortCriteria === 'count' ? dataB.count : dataB.totalAmount

          if (sortOrder === 'asc') {
            return valueA - valueB
          } else {
            return valueB - valueA
          }
        }
      )
    : []

  const chartData = transactions.reduce((acc, transaction) => {
    const { date, amount, type } = transaction
    const existingEntry = acc.find((entry) => entry.date === date)

    if (existingEntry) {
      if (type === 'credit') {
        existingEntry.creditAmount += parseFloat(amount)
      } else if (type === 'debit') {
        existingEntry.debitAmount += parseFloat(amount)
      }
    } else {
      acc.push({
        date,
        creditAmount: type === 'credit' ? parseFloat(amount) : 0,
        debitAmount: type === 'debit' ? parseFloat(amount) : 0,
      })
    }

    return acc
  }, [] as { date: string; creditAmount: number; debitAmount: number }[])

  if (!transactions.length) return null

  return (
    <div className="my-8  font-sans  border-black/[0.5]">
      <Navbar select={select} setSelect={setSelect} />

      <div className="my-6  grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            name: 'Total Credited Amount',
            value: totalCreditedAmount,
          },
          {
            name: 'Total Non-Investment Amount',
            value: totalDebitedAmount,
          },
          {
            name: 'Total Investment Amount',
            value: totalInvestmentAmount,
          },
        ].map((item) => (
          <motion.div
            key={item.name}
            onHoverStart={() => setIsHovered(item.name)}
            onHoverEnd={() => setIsHovered('')}
            className="relative group"
          >
            <motion.div className="relative w-full py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 border border-white/10">
              <div className="text-center p-4  rounded-lg">
                <motion.div
                  animate={{ scale: isHovered === item.name ? 1.1 : 1 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeInOut',
                  }}
                  className={`text-2xl  font-bold ${
                    item.name === 'Total Non-Investment Amount'
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {item.value}
                </motion.div>
                <div className="text-sm mt-1">{item.name}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {select == 'details' ? (
        <DetailsSection
          totalCreditedAmount={totalCreditedAmount}
          totalDebitedAmount={totalDebitedAmount}
          totalInvestmentAmount={totalInvestmentAmount}
          chartData={chartData}
        />
      ) : dataMap &&
        Object.entries(dataMap[select as 'credit' | 'debit' | 'investment'])
          .length === 0 ? (
        <div className="w-full  h-full py-10 flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl text-white/60">
              ⎓
            </div>
            <h3 className="text-xl font-semibold text-white/90">
              No transactions recorded
            </h3>
            <p className="text-center  text-white/60 max-w-md text-sm leading-6">
              No transactions found in{' '}
              {select.charAt(0).toUpperCase() + select.slice(1)}.
            </p>
          </div>
        </div>
      ) : (
        <>
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

          <div
            id="table"
            className="border rounded-lg  backdrop-blur-xl h-auto border-black/[0.01] max-h-[580px] relative overflow-y-auto overflow-x-hidden shadow-sm drop-shadow-sm"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Transaction Count</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="overflow-hidden">
                {sortedData.map(([description, { totalAmount, count }]) => (
                  <TableTranction
                    key={`${select}-${description}`}
                    type={select}
                    totalAmount={totalAmount}
                    description={description}
                    count={count}
                    currency={currency}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
