import { TableCell, TableRow } from "./ui/table";
type TypeTableTransaaction = {
  description: string;
  count: number | undefined;
  type: string;
  currency: string;
  totalAmount: number;
};

export default function TableTranction({
  description,
  count,
  type,
  currency,
  totalAmount,
}: TypeTableTransaaction) {
  return (
    <TableRow>
      <TableCell>{description}</TableCell>
      <TableCell>{count}</TableCell>
      <TableCell className="text-right">
        <span className={type !== "debit" ? "text-green-600" : "text-red-600"}>
          {currency} {Math.abs(totalAmount).toFixed(2)}
        </span>
      </TableCell>
    </TableRow>
  );
}
