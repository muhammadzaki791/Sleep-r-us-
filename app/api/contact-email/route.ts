import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: ContactEmailData = await request.json();

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'enquiries@sleeprus.co.uk',
      to: process.env.ADMIN_EMAIL || 'enquiries@sleeprus.co.uk',
      subject: `New Contact Message – ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0B3D91; border-bottom: 2px solid #0B3D91; padding-bottom: 10px;">New Contact Message</h1>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Customer Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Subject</h2>
            <p>${subject}</p>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Message</h2>
            <p>${message}</p>
          </div>

          <div style="margin-top: 30px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
            <p style="margin: 0;"><small>This message was received on ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending contact email:', error);
      return Response.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in contact API route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}