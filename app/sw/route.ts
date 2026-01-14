import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET() {
  try {
    const filePath = join(process.cwd(), "public", "sw.js")
    const fileContents = readFileSync(filePath, "utf8")

    return new NextResponse(fileContents, {
      headers: {
        "Content-Type": "application/javascript",
        "Service-Worker-Allowed": "/",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error reading service worker:", error)
    return new NextResponse("Service worker not found", { status: 404 })
  }
}
