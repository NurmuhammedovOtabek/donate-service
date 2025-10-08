import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../user/models/user.model";
import { Recipient } from "../recipient/models/recipient.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailUser(user: User) {
    const url = `${process.env.API_HOST}/api/user/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welecom",
      template: "./confirmation",
      context: {
        name: user.full_name,
        url,
      },
    });
  }

  async sendMailRecipient(user: Recipient) {
    const url = `${process.env.API_HOST}/api/recipient/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welecom",
      template: "./confirmation",
      context: {
        name: user.full_name,
        url,
      },
    });
  }
}
