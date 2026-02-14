import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  productName: string;
  productSlug: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const { productName, productSlug, customerName, customerEmail, customerPhone, message }: EmailData = await request.json();

    if (!productName || !customerName || !customerEmail || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine the correct product URL based on product type
    // For simplicity, we'll construct it based on the slug pattern
    let productUrl = '';
    if (productSlug.includes('bed')) {
      productUrl = `${request.nextUrl.origin}/products/bed-frames/${productSlug}`;
    } else {
      productUrl = `${request.nextUrl.origin}/products/mattresses/${productSlug}`;
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'enquiries@sleeprus.co.uk',
      to: process.env.ADMIN_EMAIL || 'enquiries@sleeprus.co.uk',
      subject: `New Product Inquiry – ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #0B3D91; border-bottom: 2px solid #0B3D91; padding-bottom: 10px;">New Product Inquiry</h1>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Product Details</h2>
            <p><strong>Product Name:</strong> ${productName}</p>
            <p><strong>Product URL:</strong> <a href="${productUrl}">${productUrl}</a></p>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Customer Information</h2>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            ${customerPhone ? `<p><strong>Phone:</strong> ${customerPhone}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #1A5BB8;">Message</h2>
            <p>${message}</p>
          </div>

          <div style="margin-top: 30px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
            <p style="margin: 0;"><small>This inquiry was received on ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return Response.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error in API route:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}