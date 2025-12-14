import { NextRequest, NextResponse } from 'next/server';

const KESTRA_WEBHOOK_URL = 'http://localhost:8080/api/v1/executions/webhook/hackathon/scope-analysis/secret-123';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt } = body;

    // Validate the prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: prompt is required and must be a string' },
        { status: 400 }
      );
    }

    // Forward the request to Kestra
    const kestraResponse = await fetch(KESTRA_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    // Check if Kestra responded successfully
    if (!kestraResponse.ok) {
      const errorText = await kestraResponse.text();
      console.error('Kestra error:', errorText);
      return NextResponse.json(
        { error: `Kestra service error: ${kestraResponse.status}` },
        { status: kestraResponse.status }
      );
    }

    // Parse and return the Kestra response
    const data = await kestraResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('API Error:', error);

    // Handle specific error types
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Unable to connect to Kestra service. Please ensure the service is running.' },
        { status: 503 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
