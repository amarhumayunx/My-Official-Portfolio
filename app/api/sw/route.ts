import { NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET() {
  try {
    // Read the service worker file from the public directory
    const filePath = join(process.cwd(), "public", "sw.js")
    const fileContents = await readFile(filePath, "utf-8")

    // Return with correct MIME type for service worker
    return new NextResponse(fileContents, {
      headers: {
        "Content-Type": "application/javascript",
        "Service-Worker-Allowed": "/",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error reading service worker file:", error)
    return new NextResponse("Service Worker not found", { status: 404 })
  }
}
