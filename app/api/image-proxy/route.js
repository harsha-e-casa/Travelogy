import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  if (!url) {
    return new NextResponse('Missing url', { status: 400 });
  }

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const contentType = res.headers.get('content-type') || 'image/png';
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (e) {
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
