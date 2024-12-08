"use client";

import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableTranction from "./Table";
import { describe } from "node:test";
import Navbar from "./Navbar";

export default function TransactionsList() {
  const { data } = useTransactions();
  console.log(data);
  const { transactions, currency, months } = data;

  const [transactionMap, setTransactionMap] = useState<{
    credit: Record<string, { totalAmount: number; count: number }>;
    debit: Record<string, { totalAmount: number; count: number }>;
    investment: Record<string, { totalAmount: number; count: number }>;
  }>({
    credit: {},
    debit: {},
    investment: {},
  });

  useEffect(() => {
    if (!transactions.length) return;

    const map: {
      credit: Record<string, { totalAmount: number; count: number }>;
      debit: Record<string, { totalAmount: number; count: number }>;
      investment: Record<string, { totalAmount: number; count: number }>;
    } = { credit: {}, debit: {}, investment: {} };

    const investmentKeywords = [
      "ZERODHA",
      "UPSTOX",
      "MUTUAL FUND",
      "STOCK",
      "EQUITY",
      "SHARE",
      "BROKING",
      "INVESTMENT",
      "SIP",
      "TRADING",
    ];

    transactions.forEach((transaction) => {
      let { description, amount, type } = transaction;

      description = description.startsWith("UPI")
        ? description.split("@")[0].split("-")[1]
        : description.split("@")[0];

      // Check if the transaction matches any investment keyword
      const isInvestment = investmentKeywords.some((keyword) =>
        description.toUpperCase().includes(keyword),
      );

      if (isInvestment) {
        if (map.investment[description]) {
          map.investment[description].totalAmount += +amount;
          map.investment[description].count += 1;
        } else {
          map.investment[description] = { totalAmount: +amount, count: 1 };
        }
      } else {
        // Add to either credit or debit
        if (map[type][description]) {
          map[type][description].totalAmount += +amount;
          map[type][description].count += 1;
        } else {
          map[type][description] = { totalAmount: +amount, count: 1 };
        }
      }
    });

    setTransactionMap(map);
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mt-8">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4">
        Extracted Transactions for {months.length} months{" "}
      </h2>
      <div className="border rounded-lg bg-[#fdfdfdcc] h-[700px] p-1 overflow-auto shadow-sm drop-shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description.split("@")[0]}</TableCell>
                <TableCell className="capitalize">{transaction.type}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {currency} {Math.abs(+transaction.amount).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {Object.entries(transactionMap).map(([key, transactions]) => (
        <div key={key}>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Total {key.charAt(0).toUpperCase() + key.slice(1)} Transactions
          </h2>
          <div className="border rounded-lg bg-[#fdfdfdcc] overflow-auto shadow-sm drop-shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Transaction Count</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(transactions).map(
                  ([description, { totalAmount, count }]) => (
                    <TableTranction
                      key={`${key}-${description}`}
                      type={key}
                      totalAmount={totalAmount}
                      description={description}
                      count={count}
                      currency={currency}
                    />
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
