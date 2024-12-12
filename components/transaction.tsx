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
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState<number>(0);
  const [totalCreditedAmount, setTotalCreditedAmount] = useState<number>(0);
  const [totalDebitedAmount, setTotalDebittedAmount] = useState<number>(0);

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

    let totalInvestment = 0;

    let totalCredit = 0;
    let totalDebit = 0;

    transactions.forEach((transaction) => {
      let { description, amount, type } = transaction;

      description = description.startsWith("UPI")
        ? description.split("@")[0].split("-")[1]
        : description.split("@")[0];

      // Check if the transaction matches any investment keyword
      const isInvestment = investmentKeywords.some((keyword) =>
        description.toUpperCase().includes(keyword),
      );

      const isFood = foodKeywords.some((keyword) => {
        return description.toUpperCase().includes(keyword.toUpperCase());
      });
      const isBill = bill.some((keyword) =>
        description.toUpperCase().includes(keyword.toUpperCase()),
      );
      if (!isNaN(+amount)) {
        if (isInvestment && type === "debit") {
          console.log(+amount, description);
          totalInvestment += parseFloat(amount);
        } else {
          // console.log(parseFloat(amount), description);
          if (type === "credit") totalCredit += parseFloat(amount);
          else if (type === "debit") totalDebit += parseFloat(amount);
        }
      }

      if (isBill) {
        if (map.bill[description]) {
          map.bill[description].totalAmount += +amount;
          map.bill[description].count += 1;
        } else {
          map.bill[description] = { totalAmount: +amount, count: 1 };
        }
      } else if (isFood) {
        if (map.food[description]) {
          map.food[description].totalAmount += +amount;
          map.food[description].count += 1;
        } else {
          map.food[description] = { totalAmount: +amount, count: 1 };
        }
      } else if (isInvestment) {
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

    setTotalCreditedAmount(totalCredit);
    setTotalDebittedAmount(totalDebit);
    setTotalInvestmentAmount(totalInvestment);

    setTransactionMap(map);
    setDataMap(map);
  }, [transactions]);

  if (!transactions.length) return null;

  return (
    <div className="mt-8 font-sans">
      <Navbar select={select} setSelect={setSelect} />

      {/* <h2 className="text-2xl font-semibold mb-4">
        Extracted Transactions for {months.length}   months{" "}
      </h2>
      <div className="border rounded-lg bg-[#fdfdfdcc] max-h-[700px] p-1 overflow-auto shadow-sm drop-shadow-sm">
        <DetailedTable transactions={transactions} currency={currency} />
      </div> */}
      {select == "compact" ? (
        <div className="flex flex-col text-sm font-medium divide-y border rounded-sm">
          <div className="flex w-full py-5 font-semibold justify-center text-center items-center divide-x rounded-sm ">
            <p className="text-green-500 basis-1/3  ">
              Total Credited Amount : <span> {totalCreditedAmount} </span>{" "}
            </p>

            <p className="text-red-500 basis-1/3   ">
              Total Debited Amount : <span> {totalDebitedAmount} </span>{" "}
            </p>
            <p className="text-blue-500  basis-1/3  ">
              Total Invested Amount : <span> {totalInvestmentAmount} </span>{" "}
            </p>
          </div>
          <p className="text-center py-5 ">
            Total Savings Amount :{" "}
            <span
              className={` text-center px-10 py-1 text-white rounded-md ${totalCreditedAmount - totalDebitedAmount > 0 ? "bg-green-800" : "bg-red-800"} `}
            >
              {" "}
              {(totalCreditedAmount - totalDebitedAmount).toFixed(2)}{" "}
            </span>{" "}
          </p>
          <div className="flex  flex-col  divide-y">
            <p className="px-3 py-5">
              To meet the 80/20 rule: Reduce non-investment debits to less than{" "}
              {(0.8 * totalCreditedAmount).toFixed(2)} ( Reduce by{" "}
              {+((totalDebitedAmount / totalCreditedAmount) * 100).toFixed(2) -
                80}
              %)
            </p>
            <p className="px-3 py-5">
              <span className="">
                The debit amount (excluding investment) is{" "}
                {((totalDebitedAmount / totalCreditedAmount) * 100).toFixed(2)}%
                of the total credited amount, which is higher than the 80%
                threshold.
              </span>
            </p>
          </div>
        </div>
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
