"use client";

import { useEffect, useState } from "react";
import { useMapTransaction, useTransactions } from "@/hooks/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableTranction from "./tables/Table";
import { describe } from "node:test";
import Navbar from "./Navbar";
import DetailedTable from "./tables/DetailedTable";
import { TypeMapTransaction } from "@/type/store/typeStore";
import { bill, foodKeywords, investmentKeywords } from "@/utils/constant";

export default function TransactionsList() {
  const { data } = useTransactions();
  const [select, setSelect] = useState<string>("compact");
  const { dataMap, setDataMap } = useMapTransaction();

  const { transactions, currency, months } = data;

  const [transactionMap, setTransactionMap] = useState<TypeMapTransaction>({
    credit: {},
    debit: {},
    investment: {},
    food: {},
    bill: {},
  });

  useEffect(() => {
    if (!transactions.length) return;

    const map: TypeMapTransaction = {
      credit: {},
      debit: {},
      investment: {},
      food: {},
      bill: {},
    };

    transactions.forEach((transaction) => {
      let { description, amount, type } = transaction;

      description = description.startsWith("UPI")
        ? description.split("@")[0].split("-")[1]
        : description.split("@")[0];

      // Check if the transaction matches any investment keyword
      const isInvestment = investmentKeywords.some((keyword) =>
        description.toUpperCase().includes(keyword),
      );

      const isFood = foodKeywords.some((keyword) =>
        description.toUpperCase().includes(keyword),
      );
      const isBill = bill.some((keyword) =>
        description.toUpperCase().includes(keyword),
      );
      if (isInvestment) {
        if (map.investment[description]) {
          map.investment[description].totalAmount += +amount;
          map.investment[description].count += 1;
        } else {
          map.investment[description] = { totalAmount: +amount, count: 1 };
        }
      } else if (isFood) {
        if (map.investment[description]) {
          map.investment[description].totalAmount += +amount;
          map.investment[description].count += 1;
        } else {
          map.investment[description] = { totalAmount: +amount, count: 1 };
        }
      } else if (isBill) {
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
          // Miscellaneous
          map[type][description] = { totalAmount: +amount, count: 1 };
        }
      }
    });

    setTransactionMap(map);
    setDataMap(map);
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mt-8">
      <Navbar select={select} setSelect={setSelect} />

      {/* <h2 className="text-2xl font-semibold mb-4">
        Extracted Transactions for {months.length}   months{" "}
      </h2>
      <div className="border rounded-lg bg-[#fdfdfdcc] max-h-[700px] p-1 overflow-auto shadow-sm drop-shadow-sm">
        <DetailedTable transactions={transactions} currency={currency} />
      </div> */}
      {select == "compact" ? (
        Object.entries(transactionMap).map(([key, transactions]) => (
          <div key={key}>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Total {key.charAt(0).toUpperCase() + key.slice(1)} Transactions
            </h2>
            {Object.entries(
              transactions as Record<
                string,
                { totalAmount: number; count: number }
              >,
            ).length === 0 ? (
              <p className="text-center">No Transactions</p>
            ) : (
              <div className="border rounded-lg bg-[#fdfdfdcc] max-h-[700px] overflow-auto shadow-sm drop-shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Transaction Count</TableHead>
                      <TableHead className="text-right">Total Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(
                      transactions as Record<
                        string,
                        { totalAmount: number; count: number }
                      >,
                    ).map(([description, { totalAmount, count }]) => (
                      <TableTranction
                        key={`${key}-${description}`}
                        type={key}
                        totalAmount={totalAmount}
                        description={description}
                        count={count}
                        currency={currency}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ))
      ) : Object.entries(
          transactionMap[select as "credit" | "debit" | "investment"],
        ).length === 0 ? (
        <p className="text-center">No Transactions</p>
      ) : (
        <div className="border rounded-lg bg-[#fdfdfdcc] h-auto max-h-[700px] overflow-auto shadow-sm drop-shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Transaction Count</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(
                transactionMap[select as "credit" | "debit" | "investment"],
              ).map(([description, { totalAmount, count }]) => (
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
      )}
    </div>
  );
}
