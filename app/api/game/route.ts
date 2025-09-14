import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { stat } from 'fs/promises';

// Security: List of allowed file extensions
const ALLOWED_EXTENSIONS = new Set([
  'html', 'js', 'css', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'wav', 'mp3', 'mp4'
]);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || 'index.html';
    
    // Security: Prevent directory traversal and only allow specific file types
    if (path.includes('..') || path.startsWith('/') || path.includes('\\')) {
      return new NextResponse('Not Found', { status: 404 });
    }
    
    // Check file extension
    const ext = extname(path).slice(1).toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.has(ext)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const filePath = join(process.cwd(), 'public', 'game', path);
    
    // Check if file exists
    try {
      await stat(filePath);
    } catch (error) {
      return new NextResponse('File not found', { status: 404 });
    }

    const file = await readFile(filePath);
    const contentType = getContentType(filePath);
    
    return new NextResponse(file, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error serving game file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

function getContentType(filePath: string): string {
  const extension = filePath.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'html':
      return 'text/html';
    case 'js':
      return 'application/javascript';
    case 'css':
      return 'text/css';
    case 'json':
      return 'application/json';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'wav':
      return 'audio/wav';
    case 'mp3':
      return 'audio/mpeg';
    case 'mp4':
      return 'video/mp4';
    default:
      return 'application/octet-stream';
  }
}
