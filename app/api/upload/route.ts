import { NextRequest, NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
// import { PrismaClient } from "@prisma/client";
import { LRUCache } from 'lru-cache'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// const prisma = new PrismaClient();
// Create LRU Cache for rate limiting
const rateLimit = new LRUCache<string, { count: number; expires: number }>({
  max: 500, // Track up to 500 users
  ttl: 60 * 1000,
})
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'unknown'

    if (ip === 'unknown') {
      return NextResponse.json({ error: 'IP not found' }, { status: 400 })
    }

    const now = Date.now()
    const userData = rateLimit.get(ip)

    if (userData) {
      if (userData.count >= 5 && now < userData.expires) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Try again later.' },
          { status: 429 }
        )
      }

      rateLimit.set(ip, {
        count: userData.count + 1,
        expires: userData.expires,
      })
    } else {
      rateLimit.set(ip, { count: 1, expires: now + 60 * 1000 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert File to Buffer directly
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Parse PDF content
    const pdfData = await pdfParse(buffer)

    // // Optionally save to database
    // const document = await prisma.pdfDocument.create({
    //   data: {
    //     filename: file.name,
    //     content: pdfData.text,
    //   },
    // });

    return NextResponse.json({
      message: 'PDF parsed successfully',
      content: pdfData.text,
    })
  } catch (error) {
    console.error('Error processing PDF:', error)
    return NextResponse.json(
      {
        error: 'Failed to process PDF',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
