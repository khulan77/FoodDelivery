import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendVerificationEmail = async (email: string, name: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Verify Your Email – Food Delivery",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#e74c3c;">Welcome to Food Delivery, ${name}!</h2>
        <p>Please verify your email address with the OTP below.</p>
        <p style="color:#666;">This OTP expires in <strong>10 minutes</strong>. If you did not create an account, ignore this email.</p>
        <div style="background:#f9f9f9;border:1px solid #ddd;border-radius:8px;padding:24px;text-align:center;margin:24px 0;">
          <span style="font-size:36px;font-weight:bold;letter-spacing:12px;color:#e74c3c;">${otp}</span>
        </div>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, name: string, otp: string): Promise<void> => {
  await transporter.sendMail({
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "Password Reset OTP – Food Delivery",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#e74c3c;">Password Reset Request</h2>
        <p>Hello ${name}, use the OTP below to reset your password.</p>
        <p style="color:#666;">This OTP expires in <strong>10 minutes</strong>. If you did not request this, ignore this email.</p>
        <div style="background:#f9f9f9;border:1px solid #ddd;border-radius:8px;padding:24px;text-align:center;margin:24px 0;">
          <span style="font-size:36px;font-weight:bold;letter-spacing:12px;color:#e74c3c;">${otp}</span>
        </div>
      </div>
    `,
  });
};
