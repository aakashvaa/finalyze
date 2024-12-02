import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to Buffer directly
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF content
    const pdfData = await pdfParse(buffer);

    // // Optionally save to database
    // const document = await prisma.pdfDocument.create({
    //   data: {
    //     filename: file.name,
    //     content: pdfData.text,
    //   },
    // });

    return NextResponse.json({
      message: "PDF parsed successfully",
      content: pdfData.text,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      {
        error: "Failed to process PDF",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ hii: "working" });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch documents",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
