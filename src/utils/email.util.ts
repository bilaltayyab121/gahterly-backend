import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM) {
  console.warn("SMTP environment variables are not completely set. Emails may fail.");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: Number(SMTP_PORT || 587) === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  return transporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    text,
    html,
  });
}

// export async function sendOtpEmail(to: string, otp: string, purpose = "verification", ttlMinutes = 10) {
//   const subject = purpose === "password_reset" ? "Password reset code" : "Your OTP code";
//   const text = `Your ${purpose} OTP: ${otp}. It will expire in ${ttlMinutes} minutes.`;
//   const html = `<p>Your <strong>${purpose}</strong> OTP: <strong>${otp}</strong></p><p>It will expire in ${ttlMinutes} minutes.</p>`;
//   return sendEmail(to, subject, text, html);
// }


export async function sendOtpEmail(
  to: string, 
  otp: string, 
  purpose = "verification", 
  ttlMinutes = 10
) {
  // Determine email content based on purpose
  let subject: string;
  let text: string;
  let html: string;

  switch (purpose) {
    case "password_reset":
      subject = "Password Reset Request - Secure Your Account";
      text = `Password Reset Request\n\nYou requested to reset your password. Use the following code to proceed:\n\nVerification Code: ${otp}\n\nThis code will expire in ${ttlMinutes} minutes.\n\nIf you didn't request this change, please ignore this email or contact our support team immediately.\n\nStay secure,\nThe Account Security Team`;
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #667eea; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Password Reset Request</h2>
          </div>
          <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px;">
            <p>Hello,</p>
            <p>You've requested to reset your password. Use the verification code below to proceed with securing your account.</p>
            
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 25px 0; color: #667eea;">
              ${otp}
            </div>
            
            <p>This code will expire in <strong>${ttlMinutes} minutes</strong> for your security.</p>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; border-radius: 4px;">
              <strong>Important:</strong> If you didn't request this password reset, please ignore this email or contact our support team immediately to secure your account.
            </div>
            
            <p>For security reasons, we recommend:</p>
            <ul>
              <li>Never sharing this code with anyone</li>
              <li>Choosing a strong, unique password</li>
              <li>Enabling two-factor authentication for added security</li>
            </ul>
            
            <p>Stay secure,<br>The Account Security Team</p>
          </div>
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #6c757d;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      `;
      break;
      
    case "account_verification":
      subject = "Verify Your Account - Complete Your Registration";
      text = `Account Verification\n\nThank you for registering! Use the following code to verify your account:\n\nVerification Code: ${otp}\n\nThis code will expire in ${ttlMinutes} minutes.\n\nIf you didn't create an account with us, please ignore this email.\n\nWelcome aboard!\nThe Registration Team`;
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #4facfe; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Welcome to Our Service!</h2>
          </div>
          <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px;">
            <p>Hello,</p>
            <p>Thank you for registering with us! To complete your account verification, please use the code below:</p>
            
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 25px 0; color: #4facfe;">
              ${otp}
            </div>
            
            <p>This verification code will expire in <strong>${ttlMinutes} minutes</strong>.</p>
            
            <p>If you didn't create an account with us, please disregard this email.</p>
            
            <p>We're excited to have you on board!</p>
            
            <p>Best regards,<br>The Registration Team</p>
          </div>
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #6c757d;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      `;
      break;
      
    default:
      subject = "Your Verification Code";
      text = `Verification Code\n\nYour verification code is: ${otp}\n\nThis code will expire in ${ttlMinutes} minutes.\n\nIf you didn't request this code, please ignore this email.\n\nThank you,\nThe Verification Team`;
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #5ee7df; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Your Verification Code</h2>
          </div>
          <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 8px 8px;">
            <p>Hello,</p>
            <p>You've requested a verification code. Here it is:</p>
            
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 25px 0; color: #5ee7df;">
              ${otp}
            </div>
            
            <p>This code will expire in <strong>${ttlMinutes} minutes</strong>.</p>
            
            <p>If you didn't request this code, please ignore this email.</p>
            
            <p>Thank you,<br>The Verification Team</p>
          </div>
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #6c757d;">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      `;
  }

  return sendEmail(to, subject, text, html);
}