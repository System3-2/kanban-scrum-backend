import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private mailService: MailerService) {}

  getDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  @Cron(CronExpression.EVERY_9_HOURS, {
    name: 'Send log report',
    timeZone: 'Africa/Lagos',
  })
  async handleLog() {
    const date = this.getDate();
    console.log({ date})
    await this.mailService.sendMail({
      to: 'olojam4969@gmail.com',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './logs.hbs', 
      context: {
        name: 'Kanban support',
      },
      attachments: [
        {
          filename: 'all-log-report',
          path: join(process.cwd(), `logs/${date}-combined.log`),
        },
        {
          filename: 'error-log-report',
          path: join(process.cwd(), `logs/${date}-error.log`),
        },
      ],
    });
  }
}
