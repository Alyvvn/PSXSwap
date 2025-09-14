import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const assetsData = await request.json()
    
    // Ensure the src/data directory exists
    const dataDir = join(process.cwd(), 'src', 'data')
    await mkdir(dataDir, { recursive: true })
    
    // Write the updated assets.json file
    const filePath = join(dataDir, 'assets.json')
    await writeFile(filePath, JSON.stringify(assetsData, null, 2))
    
    return NextResponse.json({
      success: true,
      message: 'Assets metadata updated successfully'
    })
    
  } catch (error) {
    console.error('Update assets.json error:', error)
    return NextResponse.json(
      { error: 'Failed to update assets metadata' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'PFP Assets JSON Update API',
    description: 'Updates the assets.json metadata file'
  })
}
