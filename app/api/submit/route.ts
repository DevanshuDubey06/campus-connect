import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiUrl = process.env.GOOGLE_SHEETS_API_URL;

    if (!apiUrl || apiUrl.includes('YOUR_SCRIPT_ID')) {
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          {
            success: false,
            error: 'GOOGLE_SHEETS_API_URL is not configured in Vercel Environment Variables.',
          },
          { status: 500 }
        );
      }
      // Return mock success in local development when API is not configured yet
      console.warn('[Campus Connect] Google Sheets API URL not configured. Using mock response.');
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json({ success: true, mock: true });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Campus Connect] Sheets API error:', text);
      return NextResponse.json(
        { success: false, error: 'Google Sheets submission failed.' },
        { status: 502 }
      );
    }

    const text = await response.text();
    let data: { success?: boolean; error?: string; row?: number };
    try {
      data = JSON.parse(text);
    } catch {
      console.error('[Campus Connect] Invalid JSON from Sheets API:', text.slice(0, 300));
      return NextResponse.json(
        { success: false, error: 'Invalid response from Google Sheets. Ensure the Apps Script is deployed for "Anyone".' },
        { status: 502 }
      );
    }

    if (!data.success) {
      console.error('[Campus Connect] Sheets script returned failure:', data.error);
      return NextResponse.json(
        { success: false, error: data.error || 'Google Sheets failed to record the submission.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[Campus Connect] Submit error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
