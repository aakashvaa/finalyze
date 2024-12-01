"use client";

import { useEffect, useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
          map.investment[description].totalAmount += amount;
          map.investment[description].count += 1;
        } else {
          map.investment[description] = { totalAmount: amount, count: 1 };
        }
      } else {
        // Add to either credit or debit
        if (map[type][description]) {
          map[type][description].totalAmount += amount;
          map[type][description].count += 1;
        } else {
          map[type][description] = { totalAmount: amount, count: 1 };
        }
      }
    });

    setTransactionMap(map);
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        Extracted Transactions for {months.length} months{" "}
      </h2>
      <div className="border rounded-lg bg-[#fdfdfdcc] h-[700px] overflow-auto shadow-sm drop-shadow-sm">
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
                    {currency} {Math.abs(transaction.amount).toFixed(2)}
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
                    <TableRow key={`${key}-${description}`}>
                      <TableCell>{description}</TableCell>
                      <TableCell>{count}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            key !== "debit" ? "text-green-600" : "text-red-600"
                          }
                        >
                          {currency} {Math.abs(totalAmount).toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
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
