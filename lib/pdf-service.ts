import { TableRow } from "@/components/ui/table";
import axios from "axios";

export async function uploadPdf(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    // console.log(response);
    const data = parseBankStatement(response.data.content);
    console.table(data);
    return response.data; // Axios automatically parses the JSON response
  } catch (error: any) {
    console.error(
      "Error uploading PDF:",
      error.response?.data || error.message,
    );
    throw new Error(error.response?.data?.error || "Failed to upload PDF");
  }
}
function parseBankStatement(text: string) {
  const lines = text.split("\n");
  const tableRows = [];
  const regex = /^\d{2}\/\d{2}\/\d{2}/; // Match rows starting with a date (e.g., 01/11/24)

  for (const line of lines) {
    const isMatch = regex.test(line);
    // console.log(line, isMatch);
    if (isMatch) {
      // Extract content and format as needed
      const formattedLine = line.trim(); // Space-separated
      tableRows.push(formattedLine);
    }
  }
  console.log(tableRows);
}
