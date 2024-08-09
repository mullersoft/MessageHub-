import nodemailer, { Transporter } from "nodemailer";
import { SendMailOptions as MailOptions } from "nodemailer";
// import { convert } from "html-to-text";
interface User {
  email: string;
  name: string;
}
class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;
  constructor(user: User, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `MessageHub <${process.env.EMAIL_FROM}>`;
  }
  private newTransport(): Transporter {
    if (process.env.NODE_ENV === "production") {
      // SendGrid configuration
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  private async send(subject: string, message: string): Promise<void> {
    const mailOptions: MailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message,
      html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
    };
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome(): Promise<void> {
    const message = `Hi ${this.firstName},\nWelcome to MessageHub! Click the following link to get started: ${this.url}`;
    await this.send("Welcome to MessageHub", message);
  }
  async sendPasswordReset(): Promise<void> {
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.\nIf you did not forget your password, please ignore this email.`;
    await this.send(
      "Your password reset token (valid for only 10 minutes)",
      message
    );
  }
}
export default Email;
