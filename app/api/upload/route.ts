import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse the uploaded file from the request
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert the File object to a Buffer for sending to the Gemini API
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Define Gemini API endpoint and API key
    const geminiEndpoint = "https://api.gemini.com/v1/extract"; // Replace with the actual Gemini API endpoint
    const apiKey = process.env.GEMINI_API_KEY; // Ensure the API key is stored securely in environment variables

    // Send the PDF to Gemini API for table extraction
    const response = await axios.post(geminiEndpoint, buffer, {
      headers: {
        "Content-Type": "application/pdf", // Indicate the file type
        Authorization: `Bearer ${apiKey}`, // Include the API key for authentication
        Task: "extract_table", // Specify the task for the Gemini API
      },
      params: {
        format: "json", // Ensure the API returns data in JSON format
      },
    });

    // Process the response from Gemini API
    const tableData = response.data; // Adjust this based on the Gemini API response structure

    // Return the extracted table data to the client
    return NextResponse.json({
      message: "Table extracted successfully",
      tableData,
    });
  } catch (error: any) {
    console.error("Error processing Gemini API request:", error.message);

    // Handle errors and provide feedback to the client
    return NextResponse.json(
      {
        error: "Failed to process PDF with Gemini API",
        details: error.response?.data || error.message,
      },
      { status: 500 },
    );
  }
}
