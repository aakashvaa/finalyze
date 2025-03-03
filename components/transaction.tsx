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
import { FullNavbarType, NavbarType } from '@/type'
import FinanceBoxes from './FinanceBoxes'
import Empty from './Empty'
import FilterBar from './FiltereBar'

export default function TransactionsList() {
  const { data } = useTransactions()
  const [select, setSelect] = useState<FullNavbarType>('details')
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState<number>(0)
  const [totalCreditedAmount, setTotalCreditedAmount] = useState<number>(0)
  const [totalDebitedAmount, setTotalDebittedAmount] = useState<number>(0)

  const [sortCriteria, setSortCriteria] = useState<'count' | 'amount'>('amount')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const { dataMap, setDataMap } = useMapTransaction()

  const { transactions, currency, months } = data

  useEffect(() => {
    if (!transactions.length) {
      console.warn('No transactions found')
      return
    }

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
      // finding the total investment amount, total credit amount and total debit amount
      if (!isNaN(+amount)) {
        if (isInvestment && type === 'debit') {
          // console.log(+amount, description)
          totalInvestment += parseFloat(amount)
        } else {
          // console.log(parseFloat(amount), description);
          if (type === 'credit') totalCredit += parseFloat(amount)
          else if (type === 'debit') totalDebit += parseFloat(amount)
        }
      }

      // making mapping table for each type of transaction
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

  // sorting the data

  const sortedData =
    select !== 'details' && dataMap
      ? Object.entries(dataMap[select as NavbarType]).sort(
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

  console.log(dataMap, sortedData)
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

      <FinanceBoxes
        totalCreditedAmount={totalCreditedAmount}
        totalDebitedAmount={totalDebitedAmount}
        totalInvestmentAmount={totalInvestmentAmount}
      />

      {select == 'details' ? (
        <DetailsSection
          totalCreditedAmount={totalCreditedAmount}
          totalDebitedAmount={totalDebitedAmount}
          totalInvestmentAmount={totalInvestmentAmount}
          chartData={chartData}
        />
      ) : dataMap &&
        Object.entries(dataMap[select as NavbarType]).length === 0 ? (
        <Empty select={select} />
      ) : (
        <>
          <FilterBar
            setSortCriteria={setSortCriteria}
            sortCriteria={sortCriteria}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
          />

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
