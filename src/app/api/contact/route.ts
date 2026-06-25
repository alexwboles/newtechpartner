import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

const CONTACT_EMAIL = "alexwboles@gmail.com";

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, business, email, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Store in database
    await db.contactSubmission.create({
      data: { name, business: business || null, email, message: message || "" },
    });

    // Attempt to send email
    const transporter = getTransporter();
    let emailSent = false;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: CONTACT_EMAIL,
          replyTo: email,
          subject: `New TechPartner Inquiry from ${name}${business ? ` (${business})` : ""}`,
          text: [
            `Name: ${name}`,
            business ? `Business: ${business}` : null,
            `Email: ${email}`,
            "",
            `Message:`,
            message || "(no message)",
          ]
            .filter(Boolean)
            .join("\n"),
          html: `
            <div style="font-family: system-ui, sans-serif; color: #1a1a1a; max-width: 600px;">
              <h2 style="margin: 0 0 20px; font-size: 20px;">New TechPartner Inquiry</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 100px;">Name</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                ${business ? `<tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Business</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${business}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                    <a href="mailto:${email}" style="color: #10b981;">${email}</a>
                  </td>
                </tr>
              </table>
              ${message ? `<div style="padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #10b981;">
                <p style="margin: 0; color: #334155; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </div>` : ""}
            </div>
          `,
        });
        emailSent = true;

        await db.contactSubmission.updateMany({
          where: { email, name },
          data: { sent: true },
        });
      } catch (err) {
        console.error("Email send failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: "Message received. We'll be in touch within 48 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}