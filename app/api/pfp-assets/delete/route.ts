import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import { join } from 'path'

export async function DELETE(request: NextRequest) {
  try {
    const { category, filename } = await request.json()
    
    if (!category || !filename) {
      return NextResponse.json(
        { error: 'Missing category or filename' },
        { status: 400 }
      )
    }

    // Delete the file from the public/assets directory
    const filePath = join(process.cwd(), 'public', 'assets', category, filename)
    await unlink(filePath)
    
    return NextResponse.json({
      success: true,
      message: 'Asset deleted successfully',
      category,
      filename
    })
    
  } catch (error) {
    console.error('Delete asset error:', error)
    return NextResponse.json(
      { error: 'Failed to delete asset' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'PFP Asset Delete API',
    description: 'Deletes asset files from the filesystem'
  })
}
