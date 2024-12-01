import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure Node.js runtime for Buffer
export const dynamic = "force-static";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET(request: NextRequest) {
  console.log("hi backemnd");
  return Response.json({ hi: "from backend" });
}
function extractAndParseJSON(text: string) {
  // Regular expression to match content between ```json and ```
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonMatch && jsonMatch[1]) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    console.error("No valid JSON found in the response");
    return null;
  }
}
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;

    if (!pdfFile) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 },
      );
    }

    // Convert PDF file to Base64
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const base64String = buffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

    const prompt = `Extract all tables from this bank statement PDF. Note: Return the currency type in UTF-8 format (e.g., INDIAN RUPEE = &#20B9;). Return the transactions in the following JSON format:

    {
      "transactions": [
        {
          "date": "YYYY-MM-DD",
          "description": "string",
          "amount": number,
          "type": "credit|debit"
        }
      ],
      "months": ["Month1", "Month2", ...],
      "currency": "string"
    }
`;
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    };

    // Send the Base64-encoded PDF
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64String,
        },
      },
    ]);

    const response = await result.response;

    // Ensure response is properly formatted
    const responseText = await response.text();
    console.log(responseText);
    const data = extractAndParseJSON(responseText);

    console.log("Raw AI Response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 },
    );
  }
}
