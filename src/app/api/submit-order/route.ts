import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'divyanshusah9675@gmail.com', // Your Gmail address
    pass: process.env.EMAIL_PASSWORD // Create an app password in your Gmail account
  }
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create email content
    const mailOptions = {
      from: 'divyanshusah9675@gmail.com',
      to: 'divyanshusah9675@gmail.com',
      subject: 'New Order from Sah Prashad Bhandar Website',
      html: `
        <h2>New Order Details</h2>
        <h3>Customer Information:</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        
        <h3>Shipping Address:</h3>
        <p>${data.address}</p>
        <p>${data.city}, ${data.state}</p>
        <p>PIN Code: ${data.pincode}</p>
        
        <h3>Order Details:</h3>
        <p><strong>Items Required:</strong></p>
        <pre>${data.items}</pre>
        
        ${data.notes ? `
        <h3>Special Instructions:</h3>
        <p>${data.notes}</p>
        ` : ''}
        
        <p>Please contact the customer to confirm the order and provide payment details.</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Order submitted successfully! We will contact you soon.' 
    });
  } catch (error) {
    console.error('Error submitting order:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit order. Please try again or contact us directly.' 
    }, { status: 500 });
  }
} 