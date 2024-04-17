import getFilteredTransactions from "@/app/_helpers/getFilteredTransactions";
import { useAppSelector } from "@/app/_redux/hooks";
import { RootState } from "@/app/_redux/store";
import React from "react";
import Transaction from "../Transaction";
import { Card } from "@/app/types/interfaces";

export default function TransactionSection() {
  const card: Card = useAppSelector((state: RootState) => state.card.value);

  const transactionEl = (
    card?.transactions?.length > 5
      ? getFilteredTransactions(card, null, "descending").slice(-5)
      : getFilteredTransactions(card, null, "descending")
  )?.map((transaction) => (
    <Transaction key={transaction.id} transaction={transaction} />
  ));

  return (
    <div className="my-10">
      <h4 className="font-bold text-xl mb-2">Recent Transactions</h4>
      {card?.transactions?.length > 0 ? (
        <div className="flex flex-col gap-3 ">{transactionEl}</div>
      ) : (
        <div className="flex flex-col gap-3 ">
          {new Array(5).fill(0).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className=" flex justify-between gap-5 h-20 bg-opacity-40 items-center p-2 rounded-xl w-full bg-gray-200  dark:bg-gray-700 animate-pulse"></div>
  );
}
