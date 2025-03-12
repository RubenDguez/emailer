import { getInput, setFailed } from "@actions/core";
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config();

class Mailer {
  private mailTransporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  > | null = null;

  private mailDetails: {
    from: string;
    to: string;
    subject: string;
    html: string;
  } | null = null;

  async send(
    from: string,
    to: string,
    subject: string,
    html: string,
  ) {
    this.mailTransporter = nodemailer.createTransport({
      service: process.env.SERVICE!,
      host: process.env.HOST!,
      port: parseInt(process.env.PORT!),
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    this.mailDetails = { from, to, subject, html };

    this.mailTransporter.sendMail(this.mailDetails, (err, data) => {
      if (err) {
        setFailed(err);
        return;
      }

      console.log("Mail sent successfully...", data);
    });
  }
}

const mailer = new Mailer();

const from = getInput("from");
const to = getInput("to");
const subject = getInput("subject");
const html = getInput("html");

const att = getInput("attachments").split(",");
const attachments = att.map((att) => ({path: att}));

mailer.send(from, to, subject, html);
