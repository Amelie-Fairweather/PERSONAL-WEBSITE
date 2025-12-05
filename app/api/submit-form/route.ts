import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
      console.error('Missing Airtable credentials');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the site administrator.' },
        { status: 500 }
      );
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    );

    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    // Create record in Airtable
    // Try using table name first (Table 1), fallback to table ID if provided
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Table 1';
    console.log('Attempting to create record in table:', tableName);
    console.log('Base ID:', process.env.AIRTABLE_BASE_ID);
    console.log('API Key present:', !!process.env.AIRTABLE_API_KEY);
    
    const records = await base(tableName).create([
      {
        fields: {
          'Name': name,
          Email: email,
          Phone: phone,
          Message: message,
        },
      },
    ]);

    console.log('Successfully created record:', records[0].id);
    return NextResponse.json(
      { success: true, record: records[0].id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting to Airtable:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    
    // Return more detailed error for debugging
    const errorMessage = error.message || 'Unknown error';
    const errorDetails = {
      message: errorMessage,
      type: error.constructor?.name || 'Unknown',
      // Don't expose sensitive info in production, but helpful for debugging
      ...(process.env.NODE_ENV === 'development' && {
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME,
      })
    };
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form. Please try again.',
        details: errorDetails
      },
      { status: 500 }
    );
  }
}

