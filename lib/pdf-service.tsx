import { TableRow } from "@/components/ui/table";
import axios from "axios";
import { Currency } from "lucide-react";
const dateRegex = /\d{2}\/\d{2}\/\d{2}/;

export async function uploadPdf(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response);
    const data = parseBankStatement(response.data.content);
    console.log(data);
    return data; // Axios automatically parses the JSON response
  } catch (error: any) {
    console.error(
      "Error uploading PDF:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.error || "Failed to upload PDF");
  }
}
function splitByDates(line: string) {
  const matches = line.match(new RegExp(dateRegex, "g"));
  if (matches && matches.length === 2) {
    const [firstDate, secondDate] = matches;
    const firstDateIndex = line.indexOf(firstDate);
    const secondDateIndex = line.indexOf(
      secondDate,
      firstDateIndex + firstDate.length,
    );

    return [
      line.slice(0, firstDateIndex + firstDate.length).trim(), // Up to the first date
      line.slice(firstDateIndex + firstDate.length, secondDateIndex).trim(), // Between the two dates
      line.slice(secondDateIndex).trim(), // From the second date onward
    ];
  }
  return [line]; // Return the original line if it doesn't have two dates
}

function parseBankStatement(text: string) {
  const lines = text.split("\n");
  const tableRows = [];
  const regex = /^\d{2}\/\d{2}\/\d{2}/; // Match rows starting with a date (e.g., 01/11/24)
  let currency = "";
  let prev = null;
  for (const line of lines) {
    const isMatch = regex.test(line);
    // console.log(line, isMatch);
    if (line.startsWith("Currency")) {
      console.warn(line.split(" "));
      currency = line.split(" ")[2];
    }
    if (isMatch) {
      // Extract content and format as needed
      const formattedLine = line.trim(); // Space-separated
      // tableRows.push(formattedLine);
      const temp = splitByDates(line);

      const dateRegex = /^\d{2}\/\d{2}\/\d{2}/; // Matches the date at the start
      const amountRegex = /\d+\.\d{2}/g; // Matches numbers with two decimal places

      // Extract the date
      if (temp[2]) {
        const date = temp[2].match(dateRegex)?.[0];
        // Extract the remaining part after the date
        const rest = date ? temp[2].replace(date, "") : line;
        // console.log("hii", date, rest);

        const parts = rest.split(".");
        // console.warn(parts, parts[0] + "." + parts[1].substring(0, 2));

        const temp1 = parts[0] + "." + parts[1].substring(0, 2);
        const temp2 = parts[1].slice(2) + "." + parts[2];

        let firstAmount = parseFloat(temp1.replace(/,/g, "")).toFixed(2);
        let secondAmount = parseFloat(temp2.replace(/,/g, "")).toFixed(2);
        // console.warn(line, firstAmount, secondAmount);

        if (prev == null) prev = +secondAmount;

        const typeKey = prev >= secondAmount ? "credit" : "debit";
        // console.log({
        //   date,
        //   to: temp[1],
        //   [typeKey]: firstAmount,
        //   totalAmount: secondAmount,
        // });
        tableRows.push({
          date,
          to: temp[1],
          [typeKey]: firstAmount,
          totalAmount: secondAmount,
        });
        prev = secondAmount;
      } else {
        // console.warn("match not found", line, temp);

        const date = temp[0].match(dateRegex)?.[0];
        const to = date ? temp[0].replace(date, "") : temp[0];
        tableRows.push({
          date,
          to,
          NA: "parsing error",
          totalAmoun: "parsing error",
        });
      }
    }
  }
  const data = {
    transactions: tableRows,
    currency,
    months: ["Nov"],
  };
  // console.log(data);
  return data;
}
